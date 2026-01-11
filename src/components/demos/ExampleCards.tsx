"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClaudeCodeDemo, UserMessage, ClaudeMessage, ActionMessage } from "../ui/ClaudeCodeDemo";
import { StreamingText } from "../ui/StreamingText";

const examples = [
  {
    id: "convert",
    title: "One-off file tool",
    emoji: "📄",
    prompt: "Convert this CSV to JSON",
    attachment: "sales-data.csv",
    steps: [
      { action: "Reading", detail: "Parsing sales-data.csv (2,340 rows)" },
      { action: "Converting", detail: "Transforming to JSON format" },
      { action: "Writing", detail: "Created sales-data.json" },
      { action: "Done", detail: "File ready! You can also run: node convert.js anytime" }
    ]
  },
  {
    id: "explain",
    title: "Explain & visualize",
    emoji: "🗺️",
    prompt: "Explain how our auth system works and make me a simple HTML diagram",
    steps: [
      { action: "Scanning", detail: "Found auth logic in src/auth/, middleware/, and api/..." },
      { action: "Analyzing", detail: "Mapping OAuth flow, session handling, and permissions" },
      { action: "Creating", detail: "Building interactive diagram at auth-explainer.html" },
      { action: "Done", detail: "Open auth-explainer.html in your browser to explore" }
    ]
  },
  {
    id: "config",
    title: "System scanner",
    emoji: "🔍",
    prompt: "Find all my config files and show me what each one does",
    steps: [
      { action: "Scanning", detail: "Finding config files across your system..." },
      { action: "Found", detail: "~/.zshrc, ~/.gitconfig, ~/.ssh/config, and 12 more" },
      { action: "Creating", detail: "Building config-viewer.html with explanations" },
      { action: "Ready", detail: "Open config-viewer.html to explore your configs" }
    ]
  }
];

export function ExampleCards() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [playingStep, setPlayingStep] = useState(0);
  const [streamingStep, setStreamingStep] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleStreamComplete = (exampleId: string, stepIndex: number) => {
    const example = examples.find(e => e.id === exampleId);
    if (!example) return;

    // Move to next step after streaming completes
    setTimeout(() => {
      if (stepIndex + 1 < example.steps.length) {
        setPlayingStep(stepIndex + 1);
        setStreamingStep(stepIndex + 1);
      }
    }, 200);
  };

  const handleExpand = (id: string) => {
    if (expanded === id) {
      setExpanded(null);
      setPlayingStep(0);
      setStreamingStep(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    } else {
      setExpanded(id);
      setPlayingStep(0);
      setStreamingStep(0);
    }
  };

  return (
    <div className="space-y-3">
      {examples.map((example) => (
        <motion.div
          key={example.id}
          layout
          className="bg-card border border-border overflow-hidden interactive-card cursor-pointer"
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
                  <ClaudeCodeDemo showInput>
                    {/* User message with optional attachment */}
                    <UserMessage>
                      <div>
                        <p>{example.prompt}</p>
                        {example.attachment && (
                          <div className="mt-2 p-2 bg-muted/20 border border-dashed border-muted/50 text-xs text-muted flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {example.attachment} (dragged into terminal)
                          </div>
                        )}
                      </div>
                    </UserMessage>

                    {/* Claude's response with steps */}
                    <ClaudeMessage>
                      <div className="space-y-2">
                        {example.steps.map((step, index) => {
                          const isCurrentlyStreaming = expanded === example.id && streamingStep === index && index <= playingStep;

                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{
                                opacity: index <= playingStep ? 1 : 0.3,
                                x: 0
                              }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="flex items-start gap-2"
                            >
                              <div className={`w-4 h-4 flex items-center justify-center text-xs flex-shrink-0 ${
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
                                <span className="text-sm text-muted ml-1">
                                  {isCurrentlyStreaming ? (
                                    <StreamingText
                                      text={step.detail}
                                      speed={12}
                                      onComplete={() => handleStreamComplete(example.id, index)}
                                    />
                                  ) : (
                                    index <= playingStep ? step.detail : ""
                                  )}
                                </span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </ClaudeMessage>
                  </ClaudeCodeDemo>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Build your own prompt */}
      <div className="mt-6 p-4 bg-accent/10 border border-accent/30">
        <h4 className="text-sm text-accent mb-2">Try it yourself</h4>
        <p className="text-xs text-muted mb-3">Think of something tedious you do on your computer. Claude can probably automate it.</p>
        <div className="flex gap-2 flex-wrap">
          <span className="text-xs px-2 py-1 bg-card text-muted">&quot;Organize my downloads folder&quot;</span>
          <span className="text-xs px-2 py-1 bg-card text-muted">&quot;Rename all these files&quot;</span>
          <span className="text-xs px-2 py-1 bg-card text-muted">&quot;Summarize what changed this week&quot;</span>
        </div>
      </div>
    </div>
  );
}
