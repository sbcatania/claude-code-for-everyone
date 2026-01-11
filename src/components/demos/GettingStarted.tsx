"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CodeBlock } from "../ui/CodeBlock";

const installSteps = [
  {
    label: "Install Claude Code",
    command: "npm install -g @anthropic-ai/claude-code",
    note: "Requires Node.js 18+"
  },
  {
    label: "Authenticate",
    command: "claude login",
    note: "Opens browser to sign in"
  },
  {
    label: "Start using it",
    command: "claude",
    note: "Or: claude \"your request here\""
  }
];

const firstPrompts = [
  {
    prompt: "What files are in this directory?",
    description: "Get oriented in any codebase",
    type: "explore"
  },
  {
    prompt: "Explain what this project does",
    description: "Understand unfamiliar code",
    type: "explore"
  },
  {
    prompt: "Help me build a simple todo list",
    description: "Create something from scratch",
    type: "build"
  },
  {
    prompt: "Find all the TODOs in this codebase",
    description: "Automate tedious searches",
    type: "automate"
  },
  {
    prompt: "What would you improve about this code?",
    description: "Get code review feedback",
    type: "review"
  }
];

export function GettingStarted() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyCommand = async (command: string, index: number) => {
    await navigator.clipboard.writeText(command);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Installation steps */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Quick Setup</h3>
        {installSteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4"
          >
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
              <span className="text-accent font-bold text-sm">{index + 1}</span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium mb-2">{step.label}</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 font-mono text-sm bg-card border border-border rounded-lg px-4 py-2">
                  {step.command}
                </div>
                <button
                  onClick={() => copyCommand(step.command, index)}
                  className="px-3 py-2 bg-card border border-border rounded-lg hover:bg-card-hover transition-colors"
                >
                  {copiedIndex === index ? (
                    <span className="text-accent-green text-xs">Copied!</span>
                  ) : (
                    <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="text-xs text-muted mt-1">{step.note}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* First prompts to try */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">First Prompts to Try</h3>
        <div className="grid gap-3">
          {firstPrompts.map((item, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigator.clipboard.writeText(item.prompt)}
              className="p-4 bg-card border border-border rounded-lg text-left hover:border-accent transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-sm text-accent group-hover:text-foreground transition-colors">
                    &quot;{item.prompt}&quot;
                  </div>
                  <div className="text-xs text-muted mt-1">{item.description}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  item.type === "explore" ? "bg-blue-500/20 text-blue-400" :
                  item.type === "build" ? "bg-green-500/20 text-green-400" :
                  item.type === "automate" ? "bg-purple-500/20 text-purple-400" :
                  "bg-yellow-500/20 text-yellow-400"
                }`}>
                  {item.type}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
        <p className="text-xs text-muted text-center">Click any prompt to copy</p>
      </div>

      {/* Tips */}
      <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
        <h4 className="font-medium text-accent mb-3">Pro Tips</h4>
        <ul className="space-y-2 text-sm text-muted">
          <li className="flex items-start gap-2">
            <span className="text-accent">•</span>
            <span>Start vague - Claude will ask clarifying questions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent">•</span>
            <span>Say &quot;ask me questions about what I want&quot; to get Claude to interview you</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent">•</span>
            <span>Claude can read and modify files, run commands, and test in browsers</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent">•</span>
            <span>Think of it as a capable coworker, not just a chatbot</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
