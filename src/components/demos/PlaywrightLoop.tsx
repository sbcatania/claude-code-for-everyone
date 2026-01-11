"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const loopSteps = [
  {
    id: "write",
    label: "Write",
    description: "Claude creates or modifies code",
    icon: "✏️",
    detail: "Updating Button.tsx with new styles..."
  },
  {
    id: "launch",
    label: "Launch",
    description: "Opens browser with Playwright",
    icon: "🚀",
    detail: "Starting browser at localhost:3000..."
  },
  {
    id: "test",
    label: "Test",
    description: "Interacts with the UI",
    icon: "🧪",
    detail: "Clicking button, checking hover state..."
  },
  {
    id: "observe",
    label: "Observe",
    description: "Sees results (pass or fail)",
    icon: "👁️",
    detail: "Button color doesn't change on hover"
  },
  {
    id: "fix",
    label: "Fix",
    description: "Updates code based on findings",
    icon: "🔧",
    detail: "Adding missing hover: prefix to className"
  },
  {
    id: "repeat",
    label: "Repeat",
    description: "Loop until working",
    icon: "🔄",
    detail: "Re-testing... All checks pass!"
  }
];

export function PlaywrightLoop() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [iteration, setIteration] = useState(1);

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        if (currentStep < loopSteps.length - 1) {
          setCurrentStep(s => s + 1);
        } else {
          // Complete one iteration
          if (iteration < 2) {
            setIteration(i => i + 1);
            setCurrentStep(0);
          } else {
            setIsPlaying(false);
          }
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentStep, iteration]);

  const handlePlay = () => {
    if (!isPlaying) {
      setCurrentStep(0);
      setIteration(1);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-6">
      {/* Loop visualization */}
      <div className="relative p-8 bg-card rounded-xl border border-border">
        {/* Circular layout */}
        <div className="relative w-64 h-64 mx-auto">
          {/* Center circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-accent font-bold">
                {iteration === 2 && currentStep === loopSteps.length - 1 ? "✓" : `#${iteration}`}
              </span>
            </div>
          </div>

          {/* Step nodes */}
          {loopSteps.map((step, index) => {
            const angle = (index / loopSteps.length) * 2 * Math.PI - Math.PI / 2;
            const radius = 100;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isActive = index === currentStep;
            const isPast = index < currentStep || (iteration === 2 && index <= currentStep);

            return (
              <motion.div
                key={step.id}
                className="absolute"
                style={{
                  left: `calc(50% + ${x}px - 24px)`,
                  top: `calc(50% + ${y}px - 24px)`
                }}
                animate={{
                  scale: isActive ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all ${
                    isActive
                      ? "bg-accent shadow-lg shadow-accent/30"
                      : isPast
                        ? "bg-accent-green"
                        : "bg-card border border-border"
                  }`}
                >
                  {step.icon}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Current step info */}
        <div className="mt-6 text-center">
          <h4 className="text-lg font-medium text-foreground">
            {loopSteps[currentStep].label}
          </h4>
          <p className="text-sm text-muted mt-1">
            {loopSteps[currentStep].description}
          </p>
          <div className="mt-3 p-2 bg-background rounded-lg font-mono text-xs text-accent">
            {loopSteps[currentStep].detail}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePlay}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            isPlaying
              ? "bg-accent/20 text-accent border border-accent"
              : "bg-accent text-background hover:bg-accent/90"
          }`}
        >
          {isPlaying ? "Pause" : "Watch the Loop"}
        </button>
      </div>

      {/* Explanation */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {loopSteps.map((step, index) => (
          <div
            key={step.id}
            className={`p-3 rounded-lg border transition-all ${
              index === currentStep
                ? "bg-accent/10 border-accent"
                : "bg-card border-border"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span>{step.icon}</span>
              <span className="font-medium text-sm">{step.label}</span>
            </div>
            <p className="text-xs text-muted">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Setup note */}
      <div className="p-4 bg-card border border-border rounded-lg">
        <h5 className="font-medium text-sm mb-2">Enable Playwright MCP</h5>
        <p className="text-xs text-muted">
          To use this feature, enable the Playwright MCP server in Claude Code settings.
          Claude will then be able to control a browser to test your UI automatically.
        </p>
      </div>
    </div>
  );
}
