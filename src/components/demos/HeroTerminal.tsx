"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const demoConversation = [
  {
    type: "user" as const,
    content: "I have meeting notes and a screenshot. Make me a website that teaches people about Claude Code."
  },
  {
    type: "claude" as const,
    content: "I'll create an interactive tutorial site for you. Let me set that up..."
  },
  {
    type: "action" as const,
    content: "Creating Next.js project with Tailwind..."
  },
  {
    type: "action" as const,
    content: "Building 9 interactive sections..."
  },
  {
    type: "crafting" as const,
    content: "Crafting response..."
  }
];

export function HeroTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  useEffect(() => {
    if (hasFinished) return; // Don't replay

    const timer = setTimeout(() => {
      if (visibleLines < demoConversation.length) {
        setIsTyping(true);
        setTimeout(() => {
          setVisibleLines(v => v + 1);
          setIsTyping(false);
        }, 300);
      } else {
        setHasFinished(true);
      }
    }, visibleLines === 0 ? 1000 : 1200);

    return () => clearTimeout(timer);
  }, [visibleLines, hasFinished]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="terminal">
        {/* Terminal header with traffic lights */}
        <div className="terminal-header">
          <div className="terminal-dot terminal-dot-red" />
          <div className="terminal-dot terminal-dot-yellow" />
          <div className="terminal-dot terminal-dot-green" />
          <span className="ml-2 text-xs text-muted">claude</span>
        </div>

        {/* Terminal content */}
        <div className="p-4 min-h-[220px] overflow-hidden text-sm">
          <AnimatePresence>
            {demoConversation.slice(0, visibleLines).map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mb-2"
              >
                {line.type === "user" && (
                  <div>
                    <div className="text-accent-green">you:</div>
                    <div className="text-foreground">{line.content}</div>
                  </div>
                )}
                {line.type === "claude" && (
                  <div>
                    <div className="text-accent">claude:</div>
                    <div className="text-muted">{line.content}</div>
                  </div>
                )}
                {line.type === "action" && (
                  <div className="flex items-center gap-2 text-accent-green text-xs ml-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-green flex-shrink-0" />
                    <span>{line.content}</span>
                  </div>
                )}
                {line.type === "crafting" && (
                  <div className="flex items-center gap-2 text-muted text-xs ml-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted animate-pulse flex-shrink-0" />
                    <span>{line.content}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1 text-muted ml-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-muted animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-muted animate-pulse" style={{ animationDelay: "0.2s" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-muted animate-pulse" style={{ animationDelay: "0.4s" }} />
            </motion.div>
          )}

          {/* Status line - inside terminal content, not window chrome */}
          <div className="mt-6 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between text-xs text-muted/60">
              <span>shift+tab to cycle modes</span>
              <div className="flex items-center gap-4">
                <span>? help</span>
                <span>/ commands</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
