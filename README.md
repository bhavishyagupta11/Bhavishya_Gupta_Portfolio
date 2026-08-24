# Bhavishya Gupta — Developer Portfolio

An interactive software engineer portfolio inspired by the interaction model and developer experience of Visual Studio Code. Built with Next.js 14, TypeScript, and Tailwind CSS, this portfolio provides both a comprehensive developer workspace and a dedicated recruiter view for fast candidate evaluation.

---

## Overview

The portfolio offers two primary modes of exploration:

- **Developer Workspace**: A full interactive IDE environment featuring a virtual file explorer, multiple editor tabs, code syntax viewers, live coding platform integrations, and an interactive terminal.
- **Recruiter View**: A focused, high-density summary designed for recruiters and hiring managers to quickly review work experience, featured projects, technical competencies, problem-solving metrics, and resume access within 30 seconds.

Visitors entering the root URL can choose their preferred mode via a lightweight entry gateway or toggle between modes at any time using top menu controls or keyboard shortcuts.

---

## Features

- **VS Code Interaction Model**: Left activity bar, collapsible file tree, breadcrumbs, tab management (open, close, switch, reorder), and status bar.
- **Project Exploration**: Multi-view project inspector supporting source code review, live preview / deployed demo framing, and interactive architecture node diagrams.
- **Recruiter Mode**: Streamlined executive summary with smooth horizontal slide transition, responsive layout, and direct action triggers.
- **Interactive Terminal**: Custom terminal drawer with command execution, shell history, file system navigation (`cat`, `ls`, `help`, `clear`), and contact utilities.
- **Command Palette & Quick Open**: Keyboard-driven navigation via `Ctrl+P` / `Cmd+P` (Quick Open) and `Ctrl+Shift+P` / `Cmd+Shift+P` (Command Palette).
- **Theme Support**: Integrated theme switcher supporting Dark+ (VS Code Default), Midnight (High Contrast), and Light+ themes.
- **Responsive Engineering**: Fully adaptive layout across mobile (390px+), tablet, and widescreen desktop monitors.

---

## Coding Profiles

The portfolio integrates with external competitive programming and developer platforms:

- **LeetCode**: Live data integration querying the official LeetCode GraphQL endpoint (`bhavishyagupta001`). Displays real-time solved counts (Easy, Medium, Hard), contest rating (1779), global ranking, and active problem-solving streak.
- **GitHub**: Profile metadata and repository statistics powered by the official GitHub REST v3 API (`bhavishyagupta11`), accompanied by a 52-week contribution heatmap via public contribution graph endpoints.
- **GeeksforGeeks**: Verified candidate profile snapshot and roadmap breakdown (`bhavishyarqb`) with direct profile links.
- **Code360 by Coding Ninjas**: Verified candidate profile snapshot and domain skill badges (`bhavigupta`) with direct profile links.
- **Codolio**: Unified cross-platform aggregator profile snapshot (`bhavigupta`) linking all competitive programming tracks.

---

## Featured Projects

### 1. FutureMedia — Social Media & Content Platform
- **Description**: Full-stack social platform with real-time feeds, user authentication, media uploads, interactive engagement, and responsive UI.
- **Tech Stack**: React.js, Node.js, Express.js, MongoDB, Tailwind CSS, Cloudinary.
- **Live Deployed App**: [https://futuremedia-one.vercel.app/](https://futuremedia-one.vercel.app/)
- **Repository**: [https://github.com/bhavishyagupta11/FutureMedia-A-Social-Media-Platform](https://github.com/bhavishyagupta11/FutureMedia-A-Social-Media-Platform)

### 2. ScholrBoard — Academic Management System
- **Description**: Centralized platform for managing student analytics, course materials, assignments, and grade tracking.
- **Tech Stack**: React.js, Node.js, Express.js, MongoDB, JWT Authentication.
- **Live Deployed App**: [https://scholr-board-360.vercel.app/](https://scholr-board-360.vercel.app/)
- **Repository**: [https://github.com/bhavishyagupta11/ScholrBoard](https://github.com/bhavishyagupta11/ScholrBoard)

### 3. CogniFlow — Workflow Automation Engine
- **Description**: Visual workflow automation tool enabling users to define sequential triggers, actions, and conditional pipelines.
- **Tech Stack**: TypeScript, React Flow, Node.js, Express.js, REST APIs.
- **Repository**: [https://github.com/bhavishyagupta11/CogniFlow](https://github.com/bhavishyagupta11/CogniFlow)

### 4. TatkalNyaya — Legal AI Assistance Platform
- **Description**: AI-assisted legal research system utilizing retrieval-augmented generation (RAG) to query legal databases and case precedents.
- **Tech Stack**: Next.js, Python, FastAPI, LangChain, Vector Embeddings.
- **Repository**: [https://github.com/bhavishyagupta11/TatkalNyaya](https://github.com/bhavishyagupta11/TatkalNyaya)

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3, PostCSS, Lucide React Icons
- **State & Logic**: React Context API, Custom Hooks, SessionStorage
- **Data Fetching**: Next.js Route Handlers, LeetCode GraphQL, GitHub REST v3
- **Design System**: VS Code IDE Tokenized Themes

---

## Project Structure

```text
├── app/
│   ├── api/
│   │   ├── coding/
│   │   │   ├── code360/route.ts
│   │   │   ├── codolio/route.ts
│   │   │   ├── gfg/route.ts
│   │   │   └── leetcode/route.ts
│   │   └── github/
│   │       └── profile/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── coding/
│   │   ├── CodolioWorkspace.tsx
│   │   ├── GfgCode360Workspace.tsx
│   │   ├── GitHubWorkspace.tsx
│   │   └── LeetCodeWorkspace.tsx
│   ├── command-palette/
│   ├── common/
│   │   └── PortfolioEntryModal.tsx
│   ├── editor/
│   ├── github/
│   ├── projects/
│   ├── recruiter/
│   │   └── RecruiterView.tsx
│   ├── resume/
│   ├── skills/
│   ├── terminal/
│   └── workspace/
│       ├── ActivityBar.tsx
│       ├── Explorer.tsx
│       ├── SearchPanel.tsx
│       ├── StatusBar.tsx
│       ├── TopMenu.tsx
│       └── WorkspaceShell.tsx
├── context/
│   └── WorkspaceContext.tsx
├── data/
│   ├── education.ts
│   ├── experience.ts
│   ├── profile.ts
│   ├── projects.ts
│   └── skills.ts
├── hooks/
│   └── useKeyboardShortcuts.ts
├── lib/
│   └── coding/
│       ├── cache.ts
│       ├── code360.ts
│       ├── codolio.ts
│       ├── gfg.ts
│       ├── github.ts
│       └── leetcode.ts
├── public/
│   └── assets/
│       └── Bhavishya_Gupta_Resume.pdf
├── types/
│   └── index.ts
├── next.config.mjs
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

---

## Running Locally

### Prerequisites
- Node.js 18.17.0 or higher
- npm 9.0.0 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bhavishyagupta11/Bhavishya_Gupta_Portfolio.git
   cd Bhavishya_Gupta_Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

To create an optimized production build:

```bash
npm run build
npm run start
```

---

## Environment Variables

Copy `.env.example` to `.env.local` if you wish to configure optional upstream credentials:

```bash
cp .env.example .env.local
```

| Variable | Description | Required |
|---|---|:---:|
| `GITHUB_TOKEN` | GitHub Personal Access Token for increased API rate limits on server routes. | No |

---

## Resume

The candidate resume is available statically at `/assets/Bhavishya_Gupta_Resume.pdf` and can be downloaded or viewed directly through the in-editor Resume tab or the Recruiter View.

---

## License

This project is open source and available under the [MIT License](LICENSE).
