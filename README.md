# Claude Code for Everyone

An interactive, single-page website that teaches people how to use [Claude Code](https://code.claude.com/docs/en/overview) and terminal-based AI coding agents. No coding experience required.

**Live site:** [claude-code-for-everyone.vercel.app](https://claude-code-for-everyone.vercel.app)

## What is this?

This is an educational website designed to help people who aren't developers understand and use Claude Code effectively. It's built for product managers, designers, and anyone curious about AI coding agents but intimidated by terminals.

The site uses interactive demos to teach concepts hands-on, inspired by the excellent [How Terminals Work](https://how-terminals-work.vercel.app/) guide.

## Key Concepts Covered

The site teaches these core ideas:

1. **Claude Code actually DOES things** - Unlike ChatGPT, it creates files, runs commands, and builds projects on your computer
2. **You don't need to know what you're doing** - Be vague, Claude asks clarifying questions
3. **The "Interview Technique"** - Ask Claude to interview YOU about what you want to build
4. **It's not just for coding** - File organization, system tasks, research, prototyping
5. **Self-testing loops** - Claude can test its own work with Playwright browser automation

## Interactive Sections

| # | Section | What You Learn |
|---|---------|----------------|
| 01 | What is Claude Code? Codex? | Side-by-side comparison with traditional AI chat |
| 02 | The terminal - is it scary? | Interactive fake terminal to demystify the command line |
| 03 | Talking to Claude Code | How vague vs specific prompts both work |
| 04 | The interview technique | Have Claude ask YOU clarifying questions |
| 05 | Claude can use your whole computer | Real examples: config scanners, CLI tools, auto-docs |
| 06 | Build something real | Step-through building a Notion-like app |
| 07 | Self-testing with Playwright | Self-testing loops with browser automation |
| 08 | Putting it all together | Complete workflow walkthroughs |
| 09 | Getting started | Installation and first prompts to try |
| 10 | Advanced usage tips | Tips to get more out of Claude Code once you know the basics |

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Deployment:** Vercel

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view locally.

## Disclaimer

**This project was vibe coded for fun.** It was built entirely using Claude Code in a single session as both a learning tool for others and a meta-demonstration of what Claude Code can do. The code works, but it prioritizes teaching effectiveness over production polish.

If you find bugs or want to improve it, PRs welcome!

## Credits

- Inspired by [How Terminals Work](https://how-terminals-work.vercel.app/) by [@brianlovin](https://github.com/brianlovin)
- Built with [Claude Code](https://code.claude.com/docs/en/overview) by Anthropic

## License

MIT
