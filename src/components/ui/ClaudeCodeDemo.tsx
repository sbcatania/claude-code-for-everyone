"use client";

import { ReactNode } from "react";

interface ClaudeCodeDemoProps {
  children: ReactNode;
  title?: string;
  showInput?: boolean;
  inputPlaceholder?: string;
  showStatusLine?: boolean;
}

export function ClaudeCodeDemo({
  children,
  title = "claude",
  showInput = false,
  inputPlaceholder = "Type a message...",
  showStatusLine = true
}: ClaudeCodeDemoProps) {
  return (
    <div className="terminal">
      {/* Terminal header with traffic lights */}
      <div className="terminal-header">
        <div className="terminal-dot terminal-dot-red" />
        <div className="terminal-dot terminal-dot-yellow" />
        <div className="terminal-dot terminal-dot-green" />
        <span className="ml-2 text-xs text-muted">{title}</span>
      </div>

      {/* Content area */}
      <div className="p-4">
        {children}

        {/* Optional input area - mimics Claude Code's input */}
        {showInput && (
          <div className="mt-4 pt-3 border-t border-border/50">
            <div className="flex items-center font-mono text-sm">
              <span className="text-accent-green mr-1">you:</span>
              <span className="terminal-cursor" />
              <span className="text-muted/50 ml-1">{inputPlaceholder}</span>
            </div>
          </div>
        )}

        {/* Status line - inside terminal content, not window chrome */}
        {showStatusLine && (
          <div className="mt-6 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between text-xs text-muted/60">
              <span>shift+tab to cycle modes</span>
              <div className="flex items-center gap-4">
                <span>? help</span>
                <span>/ commands</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Sub-components for consistent message styling within ClaudeCodeDemo
interface MessageProps {
  children: ReactNode;
}

export function UserMessage({ children }: MessageProps) {
  return (
    <div className="mb-3">
      <div className="text-accent-green text-sm">you:</div>
      <div className="text-foreground text-sm">{children}</div>
    </div>
  );
}

export function ClaudeMessage({ children }: MessageProps) {
  return (
    <div className="mb-3">
      <div className="text-accent text-sm">claude:</div>
      <div className="text-muted text-sm">{children}</div>
    </div>
  );
}

export function ActionMessage({ children }: MessageProps) {
  return (
    <div className="mb-2 flex items-center gap-2 text-accent-green text-xs ml-4">
      <span className="w-1.5 h-1.5 rounded-full bg-accent-green flex-shrink-0" />
      <span>{children}</span>
    </div>
  );
}
