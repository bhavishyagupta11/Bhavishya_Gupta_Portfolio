import React from 'react';
import { profileData } from '@/data/profile';
import { projectsData } from '@/data/projects';
import { experienceData } from '@/data/experience';
import { skillsData } from '@/data/skills';
import { educationData } from '@/data/education';
import { codingProfiles } from '@/data/coding';
import { getAllFiles } from '@/data/fileSystem';
import { ThemeName, WorkspaceMode } from '@/types';

export interface CommandContext {
  openFile: (fileIdOrPath: string) => void;
  setTheme: (theme: ThemeName) => void;
  setMode: (mode: WorkspaceMode) => void;
  clearHistory: () => void;
}

export function executeCommand(
  rawInput: string,
  context: CommandContext
): React.ReactNode {
  const trimmed = rawInput.trim();
  if (!trimmed) return null;

  const parts = trimmed.split(' ');
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (cmd) {
    case 'help':
      return (
        <div className="space-y-1 text-xs font-mono">
          <div className="text-[var(--ide-accent)] font-bold">BG Studio Workspace Terminal — Available Commands:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[var(--ide-text-muted)] mt-1">
            <div><span className="text-white font-semibold">about</span> — Overview of Bhavishya Gupta</div>
            <div><span className="text-white font-semibold">projects</span> — List all engineering projects</div>
            <div><span className="text-white font-semibold">project &lt;id&gt;</span> — Open specific project in editor</div>
            <div><span className="text-white font-semibold">skills</span> — Display technical skill arsenal</div>
            <div><span className="text-white font-semibold">experience</span> — View SDE internship experience</div>
            <div><span className="text-white font-semibold">education</span> — View B.Tech (CGPA: 9.30) details</div>
            <div><span className="text-white font-semibold">coding</span> — View 810+ cross-platform DSA summary</div>
            <div><span className="text-white font-semibold">leetcode</span> — Open live LeetCode analytics</div>
            <div><span className="text-white font-semibold">gfg</span> / <span className="text-white font-semibold">code360</span> — Open GFG & Code360 workspace</div>
            <div><span className="text-white font-semibold">github</span> — Open GitHub live analytics workspace</div>
            <div><span className="text-white font-semibold">codolio</span> — Open Codolio multi-platform aggregator</div>
            <div><span className="text-white font-semibold">resume</span> — Open official resume preview</div>
            <div><span className="text-white font-semibold">contact</span> — Get contact info & email</div>
            <div><span className="text-white font-semibold">whoami</span> — Display candidate summary</div>
            <div><span className="text-white font-semibold">theme &lt;name&gt;</span> — Switch theme (dark-plus | midnight | light-plus)</div>
            <div><span className="text-white font-semibold">mode &lt;dev|recruiter&gt;</span> — Switch workspace layout</div>
            <div><span className="text-white font-semibold">ls</span> — List virtual workspace files</div>
            <div><span className="text-white font-semibold">clear</span> — Clear terminal output (Ctrl+L)</div>
            <div><span className="text-amber-400 font-semibold">sudo hire bhavishya</span> — Run candidate interview check</div>
          </div>
        </div>
      );

    case 'whoami':
      return (
        <div className="space-y-1 text-xs font-mono text-[var(--ide-text)]">
          <div className="text-emerald-400 font-bold">{profileData.name}</div>
          <div className="text-[var(--ide-accent)]">Software Engineer • Full Stack Developer • AI/ML Enthusiast</div>
          <div className="text-[var(--ide-text-muted)]">B.Tech CSE (AI & ML) @ JECRC University (CGPA: 9.30, 2023–2027)</div>
          <div className="text-amber-400">810+ DSA Solved (LeetCode Contest Rating: 1779) • SDE Intern @ Ghai Tech</div>
          <div><span className="text-[var(--ide-accent)] font-semibold">Status:</span> {profileData.availability}</div>
        </div>
      );

    case 'about':
      return (
        <div className="space-y-1.5 text-xs font-mono text-[var(--ide-text)]">
          <div className="text-[var(--ide-accent)] font-bold">// About Bhavishya Gupta</div>
          <p className="leading-relaxed text-[var(--ide-text-muted)]">
            {profileData.summary}
          </p>
          <div className="text-2xs text-[var(--ide-accent)] cursor-pointer hover:underline" onClick={() => context.openFile('about-md')}>
            → Type &quot;open about.md&quot; or click here to open the full about document.
          </div>
        </div>
      );

    case 'projects':
      return (
        <div className="space-y-2 text-xs font-mono">
          <div className="text-[var(--ide-accent)] font-bold">// Shipped Projects (Click any project to open in editor):</div>
          <div className="space-y-1">
            {projectsData.map((p, idx) => (
              <div key={p.id} className="flex items-center gap-2">
                <span className="text-[var(--ide-text-muted)] font-mono">0{idx + 1}.</span>
                <button
                  onClick={() => context.openFile(`${p.id}-tsx`)}
                  className="text-white hover:text-[var(--ide-accent)] underline font-semibold"
                >
                  {p.name}
                </button>
                <span className="text-[var(--ide-text-muted)] text-2xs">[{p.category}]</span>
                <span className="text-2xs text-[var(--ide-text-muted)] hidden sm:inline">— {p.tagline}</span>
              </div>
            ))}
          </div>
          <div className="text-2xs text-[var(--ide-text-muted)]">
            Tip: Run <span className="text-white">project futuremedia</span> or <span className="text-white">project scholrboard</span> to open directly.
          </div>
        </div>
      );

    case 'project':
      if (!args[0]) {
        return <div className="text-rose-400 text-xs font-mono">Usage: project &lt;project-id&gt; (e.g. project futuremedia, project scholrboard, project cogniflow, project intellex-ai)</div>;
      }
      const targetProj = projectsData.find(p => p.id.toLowerCase() === args[0].toLowerCase());
      if (targetProj) {
        context.openFile(`${targetProj.id}-tsx`);
        return <div className="text-emerald-400 text-xs font-mono">✓ Opened projects/{targetProj.id}.tsx in editor.</div>;
      }
      return <div className="text-rose-400 text-xs font-mono">Project &quot;{args[0]}&quot; not found. Run &quot;projects&quot; to see available projects.</div>;

    case 'skills':
      return (
        <div className="space-y-2 text-xs font-mono">
          <div className="text-[var(--ide-accent)] font-bold">// Verified Tech Arsenal:</div>
          {skillsData.map(cat => (
            <div key={cat.name} className="text-2xs">
              <span className="text-amber-400 font-semibold">{cat.name}: </span>
              <span className="text-[var(--ide-text)]">
                {cat.skills.map(s => s.name).join(', ')}
              </span>
            </div>
          ))}
          <div className="text-2xs text-[var(--ide-accent)] cursor-pointer hover:underline" onClick={() => context.openFile('skills-json')}>
            → Click to open skills.json in editor.
          </div>
        </div>
      );

    case 'experience':
      return (
        <div className="space-y-1 text-xs font-mono">
          <div className="text-[var(--ide-accent)] font-bold">// Professional Work Experience:</div>
          {experienceData.map((exp, i) => (
            <div key={i} className="text-2xs text-[var(--ide-text)] space-y-0.5">
              <div className="font-semibold text-white">{exp.role} @ {exp.company}</div>
              <div className="text-emerald-400">{exp.period} • {exp.location}</div>
              <div className="text-[var(--ide-text-muted)]">{exp.summary}</div>
            </div>
          ))}
          <div className="text-2xs text-[var(--ide-accent)] cursor-pointer hover:underline" onClick={() => context.openFile('experience-json')}>
            → Click to open experience.json in editor.
          </div>
        </div>
      );

    case 'education':
      return (
        <div className="space-y-1 text-xs font-mono">
          <div className="text-[var(--ide-accent)] font-bold">// Academic Background:</div>
          {educationData.map((edu, i) => (
            <div key={i} className="text-2xs text-[var(--ide-text)]">
              <div className="font-semibold text-white">{edu.degree}</div>
              <div>{edu.institution} ({edu.period})</div>
              <div className="text-emerald-400 font-bold">{edu.grade}</div>
            </div>
          ))}
        </div>
      );

    case 'coding':
      return (
        <div className="space-y-1.5 text-xs font-mono">
          <div className="text-amber-400 font-bold">// 810+ Verified DSA Problems Solved:</div>
          {codingProfiles.map(p => (
            <div key={p.platform} className="text-2xs">
              <span className="text-white font-semibold">{p.platform} ({p.handle}): </span>
              <span className="text-[var(--ide-accent)]">{p.stats.map(s => `${s.label}: ${s.value}`).join(' | ')}</span>
            </div>
          ))}
          <div className="text-2xs text-[var(--ide-accent)] cursor-pointer hover:underline" onClick={() => context.openFile('leetcode-md')}>
            → Type &quot;leetcode&quot;, &quot;gfg&quot;, &quot;code360&quot;, or &quot;codolio&quot; to open live analytics.
          </div>
        </div>
      );

    case 'leetcode':
      context.openFile('leetcode-md');
      return <div className="text-emerald-400 text-xs font-mono">✓ Opened coding/leetcode.md live analytics in editor.</div>;

    case 'gfg':
    case 'code360':
      context.openFile('gfg-code360-md');
      return <div className="text-emerald-400 text-xs font-mono">✓ Opened coding/gfg-code360.md in editor.</div>;

    case 'github':
      context.openFile('github-md');
      return <div className="text-emerald-400 text-xs font-mono">✓ Opened coding/github.md live analytics in editor.</div>;

    case 'codolio':
      context.openFile('codolio-md');
      return <div className="text-emerald-400 text-xs font-mono">✓ Opened coding/codolio.md in editor.</div>;

    case 'resume':
      context.openFile('resume-pdf');
      return <div className="text-emerald-400 text-xs font-mono">✓ Opened resume.pdf in editor.</div>;

    case 'contact':
      return (
        <div className="space-y-1 text-xs font-mono">
          <div className="text-[var(--ide-accent)] font-bold">// Contact Channels:</div>
          <div>Email: <a href={`mailto:${profileData.email}`} className="text-emerald-400 underline">{profileData.email}</a></div>
          <div>Phone: <a href={`tel:${profileData.phone}`} className="text-amber-400 underline">{profileData.phone}</a></div>
          <div>LinkedIn: <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-sky-400 underline">{profileData.linkedin}</a></div>
          <div>GitHub: <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="text-white underline">{profileData.github}</a></div>
          <div>Location: {profileData.location}</div>
        </div>
      );

    case 'theme':
      if (!args[0]) {
        return <div className="text-rose-400 text-xs font-mono">Usage: theme &lt;dark-plus | midnight | light-plus&gt;</div>;
      }
      const t = args[0].toLowerCase();
      if (['dark-plus', 'midnight', 'light-plus'].includes(t)) {
        context.setTheme(t as ThemeName);
        return <div className="text-emerald-400 text-xs font-mono">✓ Workspace theme switched to {t}.</div>;
      }
      return <div className="text-rose-400 text-xs font-mono">Unknown theme &quot;{args[0]}&quot;. Available: dark-plus, midnight, light-plus.</div>;

    case 'mode':
      if (!args[0]) {
        return <div className="text-rose-400 text-xs font-mono">Usage: mode &lt;developer | recruiter&gt;</div>;
      }
      const m = args[0].toLowerCase();
      if (m === 'developer' || m === 'dev') {
        context.setMode('developer');
        return <div className="text-emerald-400 text-xs font-mono">✓ Switched to Developer IDE mode.</div>;
      }
      if (m === 'recruiter') {
        context.setMode('recruiter');
        return <div className="text-emerald-400 text-xs font-mono">✓ Switched to Recruiter 30s view.</div>;
      }
      return <div className="text-rose-400 text-xs font-mono">Unknown mode &quot;{args[0]}&quot;. Choose developer or recruiter.</div>;

    case 'ls':
      const files = getAllFiles();
      return (
        <div className="space-y-1 text-xs font-mono text-[var(--ide-text-muted)]">
          <div className="text-[var(--ide-accent)] font-semibold">Workspace Files:</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
            {files.map(f => (
              <button
                key={f.id}
                onClick={() => context.openFile(f.id)}
                className="text-left text-white hover:text-[var(--ide-accent)] hover:underline truncate"
              >
                {f.path || f.name}
              </button>
            ))}
          </div>
        </div>
      );

    case 'clear':
      context.clearHistory();
      return null;

    case 'sudo':
      if (args.join(' ').toLowerCase() === 'hire bhavishya') {
        return (
          <div className="space-y-1 text-xs font-mono p-2.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
            <div className="font-bold text-white">Running Candidate Diagnostic Assessment...</div>
            <div>[✓] Problem Solving & Algorithms (810+ solved, 1779 contest rating) : PASS</div>
            <div>[✓] Full-Stack Systems Development (MERN, Next.js, APIs) : PASS</div>
            <div>[✓] AI/ML & RAG Architecture (CogniFlow, Intellex AI) : PASS</div>
            <div>[✓] Production Internship Experience (Ghai Technologies) : PASS</div>
            <div>[✓] Academic Foundation (B.Tech AI & ML, CGPA: 9.30, 2023–2027) : PASS</div>
            <div className="text-white font-bold mt-2">
              Recommendation: Schedule Technical Interview with Bhavishya Gupta
            </div>
            <div className="text-2xs text-[var(--ide-text-muted)] mt-1">
              Email: bhavishyagupta001@gmail.com
            </div>
          </div>
        );
      }
      return <div className="text-rose-400 text-xs font-mono">sudo: permission denied for command &quot;{args.join(' ')}&quot;. Try: sudo hire bhavishya</div>;

    default:
      return (
        <div className="text-rose-400 text-xs font-mono">
          Command not recognized: &quot;{trimmed}&quot;. Type <span className="text-white font-bold">&quot;help&quot;</span> to see all available commands.
        </div>
      );
  }
}
