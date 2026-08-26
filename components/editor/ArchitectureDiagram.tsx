'use client';

import React, { useState } from 'react';
import { ProjectArchitectureNode } from '@/types';
import { Layers, ArrowRight, Info, Cpu, Server, Database, Brain, Cloud } from 'lucide-react';

interface ArchitectureDiagramProps {
  projectName: string;
  nodes: ProjectArchitectureNode[];
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ 
  projectName, 
  nodes 
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(nodes[0]?.id || '');

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  const getNodeIcon = (category: ProjectArchitectureNode['category']) => {
    switch (category) {
      case 'client': return <Layers className="w-4 h-4 text-sky-400" />;
      case 'api': return <Server className="w-4 h-4 text-emerald-400" />;
      case 'data': return <Database className="w-4 h-4 text-amber-400" />;
      case 'ai': return <Brain className="w-4 h-4 text-purple-400" />;
      case 'infra': return <Cloud className="w-4 h-4 text-cyan-400" />;
      default: return <Cpu className="w-4 h-4 text-indigo-400" />;
    }
  };

  const getCategoryColor = (category: ProjectArchitectureNode['category']) => {
    switch (category) {
      case 'client': return 'border-sky-500/40 bg-sky-500/10 text-sky-300';
      case 'api': return 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300';
      case 'data': return 'border-amber-500/40 bg-amber-500/10 text-amber-300';
      case 'ai': return 'border-purple-500/40 bg-purple-500/10 text-purple-300';
      case 'infra': return 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300';
      default: return 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[var(--ide-editor)] text-[var(--ide-text)] p-4 md:p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-4 pb-3 border-b border-[var(--ide-border)] flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold flex items-center gap-2">
            <Layers className="w-5 h-5 text-[var(--ide-accent)]" />
            <span>{projectName} — System Architecture</span>
          </h3>
          <p className="text-xs text-[var(--ide-text-muted)] mt-0.5">
            Interactive topology. Click any system component below to inspect engineering implementation details.
          </p>
        </div>
        <span className="text-2xs font-mono px-2 py-0.5 bg-[var(--ide-sidebar)] border border-[var(--ide-border)] rounded text-[var(--ide-accent)]">
          {nodes.length} Components Connected
        </span>
      </div>

      {/* Main Diagram Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 items-start">
        {/* Visual Node Flow (Left 2 columns) */}
        <div className="lg:col-span-2 bg-[var(--ide-bg)] p-4 rounded-lg border border-[var(--ide-border)] flex flex-col gap-4">
          <div className="text-2xs uppercase tracking-wider text-[var(--ide-text-muted)] font-mono font-semibold flex items-center justify-between">
            <span>DATA & REQUEST FLOW TOPOLOGY</span>
            <span className="text-emerald-400">● Live Pipeline</span>
          </div>

          <div className="flex flex-col gap-3">
            {nodes.map((node, index) => {
              const isSelected = selectedNodeId === node.id;
              const hasConnections = node.connections.length > 0;

              return (
                <div key={node.id} className="flex flex-col items-center">
                  <div
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`w-full p-3.5 rounded-md border transition-colors cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[var(--ide-accent)] bg-[var(--ide-selection)]/20'
                        : 'border-[var(--ide-border)] bg-[var(--ide-sidebar)] hover:border-[var(--ide-border-active)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded border ${getCategoryColor(node.category)}`}>
                        {getNodeIcon(node.category)}
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-[var(--ide-text)] flex items-center gap-2">
                          <span>{node.label}</span>
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-black/30 border border-white/10 text-[var(--ide-text-muted)]">
                            {node.role}
                          </span>
                        </div>
                        <div className="text-2xs text-[var(--ide-text-muted)] font-mono mt-0.5">
                          Tech: <span className="text-[var(--ide-accent)]">{node.tech}</span>
                        </div>
                      </div>
                    </div>

                    <button className="text-2xs text-[var(--ide-text-muted)] hover:text-white px-2 py-1 rounded bg-[var(--ide-bg)] border border-[var(--ide-border)]">
                      {isSelected ? 'Inspecting' : 'Inspect'}
                    </button>
                  </div>

                  {/* Flow Arrow to next or connected nodes */}
                  {index < nodes.length - 1 && (
                    <div className="py-1 flex flex-col items-center text-[var(--ide-text-muted)] opacity-60">
                      <div className="w-0.5 h-3 bg-[var(--ide-border)]" />
                      <div className="text-[10px] font-mono">↓</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Node Detail Inspector Panel (Right 1 column) */}
        {selectedNode && (
          <div className="bg-[var(--ide-sidebar)] p-4 rounded-lg border border-[var(--ide-border)] flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[var(--ide-border)] pb-2">
              <span className="text-2xs uppercase tracking-wider text-[var(--ide-text-muted)] font-mono font-bold">
                COMPONENT INSPECTOR
              </span>
              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${getCategoryColor(selectedNode.category)}`}>
                {selectedNode.category}
              </span>
            </div>

            <div>
              <h4 className="font-bold text-sm text-[var(--ide-text)]">
                {selectedNode.label}
              </h4>
              <div className="text-xs text-[var(--ide-accent)] font-mono mt-0.5">
                Role: {selectedNode.role}
              </div>
            </div>

            <div className="p-2.5 rounded bg-[var(--ide-bg)] border border-[var(--ide-border)] text-xs text-[var(--ide-text)] leading-relaxed">
              <div className="text-2xs font-mono text-[var(--ide-text-muted)] mb-1 uppercase font-semibold">
                Architecture Implementation
              </div>
              {selectedNode.description}
            </div>

            <div>
              <span className="text-2xs font-mono text-[var(--ide-text-muted)] uppercase font-semibold block mb-1">
                Technology Stack Used
              </span>
              <div className="font-mono text-xs text-emerald-400 bg-[var(--ide-bg)] px-2.5 py-1.5 rounded border border-[var(--ide-border)]">
                {selectedNode.tech}
              </div>
            </div>

            {selectedNode.connections.length > 0 && (
              <div>
                <span className="text-2xs font-mono text-[var(--ide-text-muted)] uppercase font-semibold block mb-1">
                  Downstream Dependencies
                </span>
                <div className="flex flex-wrap gap-1">
                  {selectedNode.connections.map(targetId => {
                    const targetNode = nodes.find(n => n.id === targetId);
                    return (
                      <button
                        key={targetId}
                        onClick={() => setSelectedNodeId(targetId)}
                        className="text-2xs px-2 py-1 rounded bg-[var(--ide-bg)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] text-[var(--ide-accent)] font-mono flex items-center gap-1"
                      >
                        <span>→ {targetNode ? targetNode.label : targetId}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
