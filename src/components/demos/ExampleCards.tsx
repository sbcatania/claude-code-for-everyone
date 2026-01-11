"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const examples = [
  {
    id: "config",
    title: "Config File Scanner",
    emoji: "🔍",
    prompt: "Scan my system for important config files, make a website that explains each one with checkboxes, then zip up the ones I select",
    steps: [
      { action: "Scanning", detail: "Finding config files across your system..." },
      { action: "Found", detail: "~/.zshrc, ~/.gitconfig, ~/.ssh/config, and 12 more" },
      { action: "Creating", detail: "Building interactive website at config-viewer/index.html" },
      { action: "Ready", detail: "Open config-viewer/index.html to review and select files" },
      { action: "Zipped", detail: "Created selected-configs.zip with your choices" }
    ]
  },
  {
    id: "tool",
    title: "Build a CLI Tool",
    emoji: "🛠️",
    prompt: "I need a tool that converts CSV files to JSON",
    steps: [
      { action: "Planning", detail: "Creating a Node.js CLI tool with csv-parser" },
      { action: "Writing", detail: "csv-to-json/index.js with argument parsing" },
      { action: "Adding", detail: "Support for custom delimiters and output formatting" },
      { action: "Testing", detail: "Running with sample.csv → sample.json" },
      { action: "Done", detail: "Run with: node csv-to-json/index.js input.csv" }
    ]
  },
  {
    id: "docs",
    title: "Auto-Generate Docs",
    emoji: "📚",
    prompt: "Find all the API endpoints in this codebase and document them",
    steps: [
      { action: "Searching", detail: "Scanning for route definitions..." },
      { action: "Found", detail: "23 endpoints across 8 route files" },
      { action: "Analyzing", detail: "Extracting parameters, types, and responses" },
      { action: "Writing", detail: "Creating API-DOCS.md with full documentation" },
      { action: "Complete", detail: "Documentation ready with examples for each endpoint" }
    ]
  }
];

export function ExampleCards() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [playingStep, setPlayingStep] = useState(0);

  const handleExpand = (id: string) => {
    if (expanded === id) {
      setExpanded(null);
      setPlayingStep(0);
    } else {
      setExpanded(id);
      setPlayingStep(0);
      // Auto-play through steps
      const example = examples.find(e => e.id === id);
      if (example) {
        let step = 0;
        const interval = setInterval(() => {
          step++;
          if (step >= example.steps.length) {
            clearInterval(interval);
          } else {
            setPlayingStep(step);
          }
        }, 800);
      }
    }
  };

  return (
    <div className="space-y-3">
      {examples.map((example) => (
        <motion.div
          key={example.id}
          layout
          className="bg-card border border-border rounded-xl overflow-hidden interactive-card cursor-pointer"
          onClick={() => handleExpand(example.id)}
        >
          {/* Header */}
          <div className="flex items-center gap-4 p-4">
            <span className="text-2xl">{example.emoji}</span>
            <div className="flex-1">
              <h3 className="font-medium text-foreground">{example.title}</h3>
              <p className="text-sm text-muted line-clamp-1">&quot;{example.prompt}&quot;</p>
            </div>
            <motion.div
              animate={{ rotate: expanded === example.id ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>

          {/* Expanded content */}
          <AnimatePresence>
            {expanded === example.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-border"
              >
                <div className="p-4 bg-background/50">
                  {/* Prompt */}
                  <div className="mb-4 p-3 bg-card rounded-lg border border-border">
                    <span className="text-xs text-muted block mb-1">Your request:</span>
                    <p className="text-sm text-foreground">&quot;{example.prompt}&quot;</p>
                  </div>

                  {/* Steps */}
                  <div className="space-y-2">
                    {example.steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: index <= playingStep ? 1 : 0.3,
                          x: 0
                        }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                          index <= playingStep ? "bg-accent-green text-background" : "bg-border text-muted"
                        }`}>
                          {index <= playingStep ? "✓" : index + 1}
                        </div>
                        <div>
                          <span className={`text-sm font-medium ${
                            index <= playingStep ? "text-accent-green" : "text-muted"
                          }`}>
                            {step.action}
                          </span>
                          <p className="text-sm text-muted">{step.detail}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Build your own prompt */}
      <div className="mt-6 p-4 bg-accent/10 border border-accent/30 rounded-xl">
        <h4 className="font-medium text-accent mb-2">Try it yourself</h4>
        <p className="text-sm text-muted mb-3">Think of something tedious you do on your computer. Claude can probably automate it.</p>
        <div className="flex gap-2 flex-wrap">
          <span className="text-xs px-2 py-1 bg-card rounded-full text-muted">&quot;Organize my downloads folder&quot;</span>
          <span className="text-xs px-2 py-1 bg-card rounded-full text-muted">&quot;Rename all these files&quot;</span>
          <span className="text-xs px-2 py-1 bg-card rounded-full text-muted">&quot;Find all TODOs in my code&quot;</span>
        </div>
      </div>
    </div>
  );
}
