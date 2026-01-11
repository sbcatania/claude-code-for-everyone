"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatBubble, ChatContainer } from "../ui/ChatBubble";

type Mode = "chatgpt" | "claude";

export function ChatComparison() {
  const [mode, setMode] = useState<Mode>("chatgpt");

  return (
    <div className="space-y-4">
      {/* Toggle buttons */}
      <div className="flex gap-2 p-1 bg-card border border-border rounded-lg">
        <button
          onClick={() => setMode("chatgpt")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            mode === "chatgpt"
              ? "bg-muted/20 text-foreground"
              : "text-muted hover:text-foreground"
          }`}
        >
          Traditional AI Chat
        </button>
        <button
          onClick={() => setMode("claude")}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            mode === "claude"
              ? "bg-accent/20 text-accent"
              : "text-muted hover:text-foreground"
          }`}
        >
          Claude Code
        </button>
      </div>

      {/* Chat display */}
      <AnimatePresence mode="wait">
        {mode === "chatgpt" ? (
          <motion.div
            key="chatgpt"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <ChatContainer>
              <ChatBubble role="user" animate={false}>
                Create a simple todo list app for me
              </ChatBubble>
              <ChatBubble role="assistant" animate={false}>
                <p>Here&apos;s how you can create a simple todo list app:</p>
                <div className="mt-3 p-3 bg-background/50 rounded-lg font-mono text-xs overflow-x-auto">
                  <pre>{`// First, create index.html
<!DOCTYPE html>
<html>
<head>
  <title>Todo List</title>
</head>
...

// Then create app.js
const todos = [];
function addTodo(text) {
  todos.push({ text, done: false });
  render();
}
...`}</pre>
                </div>
                <p className="mt-3 text-muted text-xs">
                  You&apos;ll need to copy this code into files and run it yourself...
                </p>
              </ChatBubble>
            </ChatContainer>

            <div className="mt-4 p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2 text-muted">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">Just gives you code to copy. You figure out the rest.</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="claude"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ChatContainer>
              <ChatBubble role="user" animate={false}>
                Create a simple todo list app for me
              </ChatBubble>
              <ChatBubble role="assistant" animate={false}>
                <p>I&apos;ll create a todo list app for you. Let me set that up.</p>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-accent-green text-xs">
                    <span className="w-2 h-2 rounded-full bg-accent-green" />
                    Created todo-app/index.html
                  </div>
                  <div className="flex items-center gap-2 text-accent-green text-xs">
                    <span className="w-2 h-2 rounded-full bg-accent-green" />
                    Created todo-app/styles.css
                  </div>
                  <div className="flex items-center gap-2 text-accent-green text-xs">
                    <span className="w-2 h-2 rounded-full bg-accent-green" />
                    Created todo-app/app.js
                  </div>
                </div>
                <p className="mt-3">Done! I&apos;ve created a todo app in the <code className="bg-background/50 px-1 rounded">todo-app</code> folder. Open <code className="bg-background/50 px-1 rounded">index.html</code> in your browser to try it.</p>
              </ChatBubble>
            </ChatContainer>

            <div className="mt-4 p-4 bg-accent/10 border border-accent/30 rounded-lg">
              <div className="flex items-center gap-2 text-accent">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium">Actually creates the files. Ready to use.</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
