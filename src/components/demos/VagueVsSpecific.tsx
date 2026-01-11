"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatBubble, ChatContainer } from "../ui/ChatBubble";

const examples = [
  {
    id: "vague",
    label: "Vague",
    userMessage: "Make the button look better",
    claudeResponse: (
      <>
        <p>I&apos;d be happy to improve the button! A few quick questions:</p>
        <ul className="mt-2 space-y-1 text-sm">
          <li>- What style are you going for? (modern, minimal, playful?)</li>
          <li>- Any specific colors in mind, or should I match your existing theme?</li>
          <li>- Should it have any hover/click animations?</li>
        </ul>
        <p className="mt-2 text-muted text-xs">Or I can just make it look more polished with better spacing, colors, and a subtle shadow - want me to try that?</p>
      </>
    ),
    note: "Claude asks clarifying questions - but can also just try something"
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
    label: "With Context",
    userMessage: "I'm building a finance app and the button feels too playful",
    claudeResponse: (
      <>
        <p>Got it - for a finance app you probably want something more professional and trustworthy. Let me update the button.</p>
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2 text-accent-green text-xs">
            <span className="w-2 h-2 rounded-full bg-accent-green" />
            Changed to slate-800 background (more professional)
          </div>
          <div className="flex items-center gap-2 text-accent-green text-xs">
            <span className="w-2 h-2 rounded-full bg-accent-green" />
            Reduced border-radius to 4px (less playful)
          </div>
          <div className="flex items-center gap-2 text-accent-green text-xs">
            <span className="w-2 h-2 rounded-full bg-accent-green" />
            Added subtle shadow for depth
          </div>
        </div>
        <p className="mt-3 text-muted text-xs">This matches the professional aesthetic of apps like Stripe or Mercury.</p>
      </>
    ),
    note: "Give context about your goals - Claude makes smart decisions"
  }
];

export function VagueVsSpecific() {
  const [selected, setSelected] = useState(examples[0].id);
  const current = examples.find(e => e.id === selected)!;

  return (
    <div className="space-y-4">
      {/* Toggle buttons */}
      <div className="flex gap-2 p-1 bg-card border border-border rounded-lg">
        {examples.map((example) => (
          <button
            key={example.id}
            onClick={() => setSelected(example.id)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              selected === example.id
                ? "bg-accent/20 text-accent"
                : "text-muted hover:text-foreground"
            }`}
          >
            {example.label}
          </button>
        ))}
      </div>

      {/* Chat display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <ChatContainer>
            <ChatBubble role="user" animate={false}>
              {current.userMessage}
            </ChatBubble>
            <ChatBubble role="assistant" animate={false}>
              {current.claudeResponse}
            </ChatBubble>
          </ChatContainer>
        </motion.div>
      </AnimatePresence>

      {/* Note */}
      <div className="flex items-center gap-2 p-3 bg-accent/10 border border-accent/30 rounded-lg">
        <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm text-foreground">{current.note}</span>
      </div>
    </div>
  );
}
