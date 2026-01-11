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
      <div className="relative p-8 bg-card  border border-border">
        {/* Circular layout */}
        <div className="relative w-64 h-64 mx-auto">
          {/* Center circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20  bg-accent/20 flex items-center justify-center">
              <span className="text-accent font-bold">
                {iteration === 2 && currentStep === loopSteps.length - 1 ? "✓" : `#${iteration}`}
              </span>
            </div>
          </div>

          {/* Arrows between steps */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 256">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" className="text-muted/40" />
              </marker>
            </defs>
            {loopSteps.map((_, index) => {
              const n = loopSteps.length;
              const angle1 = (index / n) * 2 * Math.PI - Math.PI / 2;
              const nextIndex = (index + 1) % n;
              const angle2 = (nextIndex / n) * 2 * Math.PI - Math.PI / 2;
              const radius = 100;
              const centerX = 128;
              const centerY = 128;

              // Angular offset to start/end arrows away from node centers
              const angularOffset = 0.25;

              // Start point: slightly clockwise from current node
              const startX = centerX + Math.cos(angle1 + angularOffset) * radius;
              const startY = centerY + Math.sin(angle1 + angularOffset) * radius;

              // End point: slightly counter-clockwise from next node
              const endX = centerX + Math.cos(angle2 - angularOffset) * radius;
              const endY = centerY + Math.sin(angle2 - angularOffset) * radius;

              // Calculate midpoint angle properly (handling wrap-around)
              let midAngle;
              if (index === n - 1) {
                // Last arrow wraps around, so go the "short way" (clockwise)
                midAngle = angle1 + (2 * Math.PI + angle2 - angle1) / 2;
              } else {
                midAngle = (angle1 + angle2) / 2;
              }

              // Control point outside the circle for outward curve
              const controlRadius = radius + 20;
              const controlX = centerX + Math.cos(midAngle) * controlRadius;
              const controlY = centerY + Math.sin(midAngle) * controlRadius;

              return (
                <path
                  key={index}
                  d={`M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  className="text-muted/40"
                  markerEnd="url(#arrowhead)"
                />
              );
            })}
          </svg>

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
                  className={`w-12 h-12  flex items-center justify-center text-lg transition-all ${
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
          <div className="mt-3 p-2 bg-background  font-mono text-xs text-accent">
            {loopSteps[currentStep].detail}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePlay}
          className={`px-6 py-2  font-medium transition-colors ${
            isPlaying
              ? "bg-accent/20 text-accent border border-accent"
              : "bg-accent text-background hover:bg-accent/90"
          }`}
        >
          {isPlaying ? "Pause" : "Watch the loop"}
        </button>
      </div>

      {/* Explanation */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {loopSteps.map((step, index) => (
          <div
            key={step.id}
            className={`p-3  border transition-all ${
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
      <div className="p-4 bg-card border border-border ">
        <h5 className="font-medium text-sm mb-2">Enable Playwright MCP</h5>
        <p className="text-xs text-muted">
          To use this feature, enable the Playwright MCP server in Claude Code settings.
          Claude will then be able to control a browser to test your UI automatically.
        </p>
      </div>
    </div>
  );
}
