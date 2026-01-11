"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClaudeCodeDemo, UserMessage, ClaudeMessage, ActionMessage } from "../ui/ClaudeCodeDemo";

const examples = [
  {
    id: "vague",
    label: "Vague",
    userMessage: "This checkout flow feels confusing",
    claudeResponse: (
      <>
        <p>I&apos;d love to help improve the checkout flow! Let me ask a few questions:</p>
        <ul className="mt-2 space-y-1 text-sm">
          <li>- What part feels most confusing? (forms, payment, review?)</li>
          <li>- Are users dropping off at a specific step?</li>
          <li>- Any competitor checkouts you like the feel of?</li>
        </ul>
        <p className="mt-2 text-muted text-xs">Or I can scan through the checkout code and suggest improvements based on common UX patterns - want me to start there?</p>
      </>
    ),
    note: "Claude asks clarifying questions - or can just start exploring"
  },
  {
    id: "specific",
    label: "Specific",
    userMessage: "Change the submit button to blue with rounded corners and a hover effect",
    claudeResponse: (
      <>
        <p>I&apos;ll update the submit button now.</p>
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2 text-accent-green text-xs">
            <span className="w-2 h-2 rounded-full bg-accent-green" />
            Updated Button.tsx with blue background and rounded-lg
          </div>
          <div className="flex items-center gap-2 text-accent-green text-xs">
            <span className="w-2 h-2 rounded-full bg-accent-green" />
            Added hover:bg-blue-600 transition effect
          </div>
        </div>
        <p className="mt-3">Done! The button now has:</p>
        <ul className="mt-1 text-sm">
          <li>- Blue background (#3B82F6)</li>
          <li>- Rounded corners (8px)</li>
          <li>- Darker blue on hover with smooth transition</li>
        </ul>
      </>
    ),
    note: "Clear instructions = Claude executes immediately"
  },
  {
    id: "context",
    label: "With screenshot",
    userMessage: (
      <div>
        <p>Make this button match this design</p>
        <div className="mt-2 p-2 bg-muted/20 border border-dashed border-muted/50 text-xs text-muted flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          screenshot.png (dragged into terminal)
        </div>
      </div>
    ),
    claudeResponse: (
      <>
        <p>I can see the design - it&apos;s a gradient button with a subtle glow effect. Let me match that.</p>
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2 text-accent-green text-xs">
            <span className="w-2 h-2 rounded-full bg-accent-green" />
            Added gradient: from-purple-500 to-pink-500
          </div>
          <div className="flex items-center gap-2 text-accent-green text-xs">
            <span className="w-2 h-2 rounded-full bg-accent-green" />
            Added glow shadow on hover
          </div>
          <div className="flex items-center gap-2 text-accent-green text-xs">
            <span className="w-2 h-2 rounded-full bg-accent-green" />
            Matched the exact border-radius (12px)
          </div>
        </div>
        <p className="mt-3 text-muted text-xs">The button now matches your screenshot. Want me to apply this style to other buttons too?</p>
      </>
    ),
    note: "Drag screenshots right into the terminal - Claude can see images!"
  }
];

export function VagueVsSpecific() {
  const [selected, setSelected] = useState(examples[0].id);
  const current = examples.find(e => e.id === selected)!;

  return (
    <div className="space-y-4">
      {/* Toggle buttons */}
      <div className="flex gap-1 p-1 bg-card border border-border">
        {examples.map((example) => (
          <button
            key={example.id}
            onClick={() => setSelected(example.id)}
            className={`flex-1 py-1.5 px-3 text-xs transition-all ${
              selected === example.id
                ? "bg-accent/20 text-accent"
                : "text-muted hover:text-foreground"
            }`}
          >
            {example.label}
          </button>
        ))}
      </div>

      {/* Chat display with terminal chrome */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <ClaudeCodeDemo showInput>
            <UserMessage>{current.userMessage}</UserMessage>
            <ClaudeMessage>{current.claudeResponse}</ClaudeMessage>
          </ClaudeCodeDemo>
        </motion.div>
      </AnimatePresence>

      {/* Note */}
      <div className="flex items-center gap-2 p-3 bg-accent/10 border border-accent/30">
        <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-xs text-foreground">{current.note}</span>
      </div>
    </div>
  );
}
