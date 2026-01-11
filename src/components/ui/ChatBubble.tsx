"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ChatBubbleProps {
  role: "user" | "assistant";
  children: ReactNode;
  animate?: boolean;
  delay?: number;
}

export function ChatBubble({ role, children, animate = true, delay = 0 }: ChatBubbleProps) {
  const isUser = role === "user";

  const bubble = (
    <div
      className={`max-w-[85%] p-4  ${
        isUser
          ? "bg-accent/20 text-foreground ml-auto "
          : "bg-card border border-border text-foreground mr-auto "
      }`}
    >
      {!isUser && (
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6  bg-accent flex items-center justify-center">
            <span className="text-xs font-bold text-background">C</span>
          </div>
          <span className="text-sm font-medium text-accent">Claude Code</span>
        </div>
      )}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );

  if (!animate) return bubble;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className={isUser ? "flex justify-end" : "flex justify-start"}
    >
      {bubble}
    </motion.div>
  );
}

interface ChatContainerProps {
  children: ReactNode;
}

export function ChatContainer({ children }: ChatContainerProps) {
  return (
    <div className="bg-card border border-border  p-4 space-y-4 max-h-96 overflow-y-auto">
      {children}
    </div>
  );
}
