"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const scenarios = [
  {
    id: "mobile",
    title: "Make it mobile-friendly",
    emoji: "📱",
    request: "Make our landing page mobile-friendly",
    steps: [
      {
        type: "claude",
        content: "I'll check the current responsive behavior first. Let me scan the landing page components."
      },
      {
        type: "action",
        content: "Scanning src/pages/Landing.tsx and related styles..."
      },
      {
        type: "claude",
        content: "Found several issues: fixed widths, missing breakpoints, and images not scaling. A few questions:\n\n• Should the navigation collapse into a hamburger menu?\n• Any elements you want hidden on mobile?\n• Target mobile width: 375px (iPhone) or 360px (Android)?"
      },
      {
        type: "user",
        content: "Yes hamburger menu, hide the testimonials carousel on mobile, target 375px"
      },
      {
        type: "action",
        content: "Updating 8 files with responsive classes..."
      },
      {
        type: "action",
        content: "Testing at 375px viewport with Playwright..."
      },
      {
        type: "claude",
        content: "Done! Changes made:\n• Added hamburger menu (appears below 768px)\n• Testimonials hidden on mobile\n• All images now responsive\n• Touch-friendly button sizes (min 44px)\n• Text scales properly\n\nTested on simulated iPhone 12 - all looks good!"
      }
    ]
  },
  {
    id: "expense",
    title: "Build expense tracker",
    emoji: "💰",
    request: "Build me a personal expense tracker",
    steps: [
      {
        type: "claude",
        content: "I'll build you an expense tracker! Quick questions:\n\n• Web app, or do you want a CLI tool?\n• Need categories (food, transport, etc.)?\n• Want charts/visualizations?\n• Should it export to CSV?"
      },
      {
        type: "user",
        content: "Web app, yes categories, simple bar chart for monthly spending, CSV export would be nice"
      },
      {
        type: "action",
        content: "Creating expense-tracker project with React + Recharts..."
      },
      {
        type: "action",
        content: "Building components: ExpenseForm, ExpenseList, CategoryChart, ExportButton..."
      },
      {
        type: "action",
        content: "Adding localStorage persistence..."
      },
      {
        type: "action",
        content: "Testing: add expense, edit, delete, chart updates, CSV download..."
      },
      {
        type: "claude",
        content: "Your expense tracker is ready! Features:\n\n✓ Add expenses with amount, category, date, notes\n✓ 8 preset categories + custom\n✓ Monthly bar chart showing spending by category\n✓ Export to CSV button\n✓ Data saved in browser (localStorage)\n\nRun `cd expense-tracker && npm run dev` to start!"
      }
    ]
  }
];

export function WorkflowScenario() {
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0].id);
  const [visibleSteps, setVisibleSteps] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const scenario = scenarios.find(s => s.id === selectedScenario)!;

  const handlePlay = () => {
    if (visibleSteps >= scenario.steps.length) {
      setVisibleSteps(1);
    }
    setIsPlaying(true);

    let step = visibleSteps;
    const interval = setInterval(() => {
      step++;
      if (step >= scenario.steps.length) {
        clearInterval(interval);
        setIsPlaying(false);
        setVisibleSteps(scenario.steps.length);
      } else {
        setVisibleSteps(step + 1);
      }
    }, 1500);
  };

  const handleScenarioChange = (id: string) => {
    setSelectedScenario(id);
    setVisibleSteps(1);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-4">
      {/* Scenario selector */}
      <div className="flex gap-2">
        {scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => handleScenarioChange(s.id)}
            className={`flex-1 p-3 rounded-lg border text-left transition-all ${
              selectedScenario === s.id
                ? "bg-accent/10 border-accent"
                : "bg-card border-border hover:border-muted"
            }`}
          >
            <span className="text-xl">{s.emoji}</span>
            <div className="text-sm font-medium mt-1">{s.title}</div>
          </button>
        ))}
      </div>

      {/* Request */}
      <div className="p-3 bg-accent/10 border border-accent/30 rounded-lg">
        <span className="text-xs text-accent block mb-1">Request:</span>
        <p className="text-foreground">&quot;{scenario.request}&quot;</p>
      </div>

      {/* Steps */}
      <div className="space-y-3 max-h-80 overflow-y-auto p-1">
        <AnimatePresence>
          {scenario.steps.slice(0, visibleSteps).map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-3 rounded-lg ${
                step.type === "user"
                  ? "bg-accent/20 ml-8"
                  : step.type === "action"
                    ? "bg-background border border-border font-mono text-sm"
                    : "bg-card border border-border"
              }`}
            >
              {step.type === "claude" && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                    <span className="text-xs font-bold text-background">C</span>
                  </div>
                  <span className="text-xs text-accent">Claude Code</span>
                </div>
              )}
              {step.type === "action" && (
                <span className="text-accent-green mr-2">→</span>
              )}
              <div className="text-sm whitespace-pre-line">{step.content}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted">
          {visibleSteps} / {scenario.steps.length} steps
        </span>
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isPlaying
              ? "bg-muted/20 text-muted cursor-not-allowed"
              : "bg-accent text-background hover:bg-accent/90"
          }`}
        >
          {isPlaying ? "Playing..." : visibleSteps >= scenario.steps.length ? "Replay" : "Play Scenario"}
        </button>
      </div>
    </div>
  );
}
