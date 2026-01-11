"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClaudeCodeDemo, UserMessage, ClaudeMessage, ActionMessage } from "../ui/ClaudeCodeDemo";

const tips = [
  {
    id: "modes",
    title: "Modes & shortcuts",
    emoji: "⌨️",
    description: "Navigate Claude Code like a pro with keyboard shortcuts",
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 bg-card border border-border ">
            <div className="flex items-center gap-2 mb-2">
              <kbd className="px-2 py-1 bg-background text-xs font-mono">shift+tab</kbd>
            </div>
            <h5 className="font-medium text-sm mb-1">Cycle modes</h5>
            <p className="text-xs text-muted">Switch between Normal, Plan, and Accept Edits modes</p>
          </div>
          <div className="p-4 bg-card border border-border ">
            <div className="flex items-center gap-2 mb-2">
              <kbd className="px-2 py-1 bg-background text-xs font-mono">?</kbd>
            </div>
            <h5 className="font-medium text-sm mb-1">Get help</h5>
            <p className="text-xs text-muted">Open the help menu anytime</p>
          </div>
          <div className="p-4 bg-card border border-border ">
            <div className="flex items-center gap-2 mb-2">
              <kbd className="px-2 py-1 bg-background text-xs font-mono">/</kbd>
            </div>
            <h5 className="font-medium text-sm mb-1">Commands</h5>
            <p className="text-xs text-muted">Access slash commands like /commit, /clear</p>
          </div>
        </div>

        <div className="p-4 bg-accent/10 border border-accent/30 ">
          <h5 className="font-medium text-accent mb-3">The three modes</h5>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium">Normal</span>
              <p className="text-sm text-muted">Default mode. Claude reads, writes, and executes freely.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs font-medium">Plan</span>
              <p className="text-sm text-muted">Claude proposes changes without making them. Great for reviewing before committing.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium">Accept Edits</span>
              <p className="text-sm text-muted">You approve each file change one by one. Maximum control.</p>
            </div>
          </div>
        </div>

        <div className="p-3 bg-card border border-border ">
          <p className="text-sm text-muted">
            <span className="text-foreground font-medium">Pro tip:</span> Start in Normal mode for exploration and small tasks. Switch to Plan mode when you want to review changes before Claude makes them.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "skills",
    title: "Create custom skills",
    emoji: "🎯",
    description: "Ask Claude to create reusable behaviors you can trigger anytime",
    content: (
      <div className="space-y-4">
        <ClaudeCodeDemo>
          <UserMessage>Create a skill that interviews me about requirements whenever I paste a new spec</UserMessage>
          <ClaudeMessage>
            <p>I&apos;ll create a skill called &quot;spec-interview&quot; that automatically triggers when you share a specification.</p>
            <div className="mt-2 p-2 bg-background/30 text-xs font-mono">
              <div className="text-accent-green">✓ Created skill: spec-interview</div>
              <div className="text-muted mt-1">Triggers on: document paste</div>
              <div className="text-muted">Behavior: Ask clarifying questions about scope, users, edge cases</div>
            </div>
          </ClaudeMessage>
        </ClaudeCodeDemo>
        <div className="text-sm text-muted">
          <p className="font-medium text-foreground mb-2">Example skills you can create:</p>
          <ul className="space-y-1">
            <li>• &quot;Always check for edge cases before implementing&quot;</li>
            <li>• &quot;Summarize what you changed at the end of each session&quot;</li>
            <li>• &quot;Remind me to test before committing&quot;</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: "debug",
    title: "Debugging with screenshots",
    emoji: "📸",
    description: "When errors happen, show Claude what you see",
    content: (
      <div className="space-y-4">
        <ClaudeCodeDemo>
          <UserMessage>
            <div>
              <p>This error keeps appearing, what&apos;s wrong?</p>
              <div className="mt-2 p-2 bg-red-500/10 border border-red-500/30 text-xs">
                <div className="flex items-center gap-2 text-red-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  error-screenshot.png (dragged into terminal)
                </div>
              </div>
            </div>
          </UserMessage>
          <ClaudeMessage>
            <p>I can see the error in your screenshot. The issue is a missing dependency - you&apos;re importing <code className="bg-background/30 px-1 rounded">useRouter</code> from the wrong package.</p>
            <div className="mt-2 p-2 bg-background/30 text-xs">
              <div className="text-muted">Change:</div>
              <div className="text-red-400 line-through">import &#123; useRouter &#125; from &apos;react-router&apos;</div>
              <div className="text-accent-green">import &#123; useRouter &#125; from &apos;next/navigation&apos;</div>
            </div>
          </ClaudeMessage>
        </ClaudeCodeDemo>
        <div className="p-3 bg-accent/10 border border-accent/30 ">
          <p className="text-sm text-muted">
            <span className="text-accent font-medium">Pro tip:</span> Claude can read images! When an error is confusing, just take a screenshot and drag it into the terminal. Claude will analyze what it sees.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "architecture",
    title: "Architecture decisions",
    emoji: "🏗️",
    description: "Let Claude help you make informed technical choices",
    content: (
      <div className="space-y-4">
        <ClaudeCodeDemo>
          <UserMessage>I need to add real-time updates to my prototype. What are my options and what would you recommend?</UserMessage>
          <ClaudeMessage>
            <p>Here are your main options for real-time updates:</p>
            <div className="mt-3 space-y-3">
              <div className="p-2 bg-background/30 rounded">
                <div className="font-medium text-sm">WebSockets</div>
                <div className="text-xs text-muted">Best for: Chat, gaming, collaborative editing</div>
                <div className="text-xs text-muted">Tradeoff: More complex to scale, persistent connections</div>
              </div>
              <div className="p-2 bg-background/30 rounded">
                <div className="font-medium text-sm">Server-Sent Events (SSE)</div>
                <div className="text-xs text-muted">Best for: Notifications, dashboards, one-way updates</div>
                <div className="text-xs text-muted">Tradeoff: Simpler, but one-direction only</div>
              </div>
              <div className="p-2 bg-background/30 rounded">
                <div className="font-medium text-sm">Polling</div>
                <div className="text-xs text-muted">Best for: Simple use cases, low-frequency updates</div>
                <div className="text-xs text-muted">Tradeoff: Easy to implement, but less efficient</div>
              </div>
            </div>
            <p className="mt-3 text-sm">For a dashboard with real-time stats, I&apos;d recommend SSE - it&apos;s simpler than WebSockets and perfect for server-to-client updates. Want me to set it up?</p>
          </ClaudeMessage>
        </ClaudeCodeDemo>
        <div className="text-sm text-muted">
          <p>Don&apos;t know what technology to use? Ask Claude to explain the tradeoffs. You don&apos;t need to know the answer—Claude becomes your technical advisor.</p>
        </div>
      </div>
    )
  },
  {
    id: "chat",
    title: "It's just a chat interface",
    emoji: "💬",
    description: "Claude Code is a chat app that happens to live in the terminal",
    content: (
      <div className="space-y-4">
        <div className="p-4 bg-card border border-border ">
          <p className="text-sm mb-4">
            Think of Claude Code as <span className="text-accent font-medium">iMessage for your computer</span>.
            Yes, it runs in the terminal, but you&apos;re not typing commands—you&apos;re having a conversation.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-red-500/10 border border-red-500/20 ">
              <div className="font-medium text-red-400 mb-2">Not this:</div>
              <div className="font-mono text-xs text-muted">
                $ rm -rf node_modules<br />
                $ npm install<br />
                $ npm run build
              </div>
            </div>
            <div className="p-3 bg-green-500/10 border border-green-500/20 ">
              <div className="font-medium text-green-400 mb-2">But this:</div>
              <div className="text-xs text-muted">
                &quot;The build is broken, can you fix it?&quot;
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 bg-accent/10 border border-accent/30 ">
          <p className="text-sm text-muted">
            The terminal is just where Claude Code lives. You never need to learn terminal commands—Claude handles all of that for you.
          </p>
        </div>
      </div>
    )
  }
];

export function AdvancedTips() {
  const [selected, setSelected] = useState(tips[0].id);
  const current = tips.find(t => t.id === selected)!;

  return (
    <div className="space-y-4">
      {/* Tip selector */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {tips.map((tip) => (
          <button
            key={tip.id}
            onClick={() => setSelected(tip.id)}
            className={`p-3  border text-left transition-all ${
              selected === tip.id
                ? "bg-accent/10 border-accent"
                : "bg-card border-border hover:border-muted"
            }`}
          >
            <span className="text-xl">{tip.emoji}</span>
            <div className="text-sm font-medium mt-1">{tip.title}</div>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="mb-3">
            <h4 className="text-lg font-medium text-foreground">{current.title}</h4>
            <p className="text-sm text-muted">{current.description}</p>
          </div>
          {current.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
