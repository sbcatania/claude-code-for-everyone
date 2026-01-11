"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StepIndicator, PlaybackControls } from "../ui/StepIndicator";

const steps = [
  {
    label: "Describe your idea",
    description: "Start with what you want",
    content: (
      <div className="p-4 bg-card  border border-border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
            <span className="text-accent">👤</span>
          </div>
          <span className="text-sm text-muted">You</span>
        </div>
        <p className="text-foreground">&quot;Build me a task tracker like Notion - I want to be able to add tasks, mark them complete, and organize them into different projects&quot;</p>
      </div>
    )
  },
  {
    label: "Claude asks questions",
    description: "Clarifying requirements",
    content: (
      <div className="p-4 bg-card  border border-accent/30">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <span className="text-background font-bold text-sm">C</span>
          </div>
          <span className="text-sm text-accent">Claude Code</span>
        </div>
        <div className="space-y-3 text-sm">
          <p>Great idea! Let me clarify a few things:</p>
          <ul className="space-y-2 text-muted">
            <li>• Should tasks have due dates and priorities?</li>
            <li>• Do you want drag-and-drop to reorder?</li>
            <li>• Should data persist (save between sessions)?</li>
            <li>• Any preference for styling? Minimal, colorful?</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    label: "Creates project structure",
    description: "Setting up the foundation",
    content: (
      <div className="font-mono text-sm bg-[#0d0d0d]  p-4 border border-border">
        <div className="text-accent-green mb-2">Creating project structure...</div>
        <div className="space-y-1 text-muted">
          <div><span className="text-accent-green">✓</span> task-tracker/</div>
          <div className="ml-4"><span className="text-accent-green">✓</span> src/</div>
          <div className="ml-8"><span className="text-accent-green">✓</span> components/</div>
          <div className="ml-8"><span className="text-accent-green">✓</span> hooks/</div>
          <div className="ml-8"><span className="text-accent-green">✓</span> types/</div>
          <div className="ml-4"><span className="text-accent-green">✓</span> package.json</div>
          <div className="ml-4"><span className="text-accent-green">✓</span> index.html</div>
        </div>
      </div>
    )
  },
  {
    label: "Builds components",
    description: "Creating the UI pieces",
    content: (
      <div className="space-y-3">
        <div className="p-3 bg-card  border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">TaskCard.tsx</span>
            <span className="text-xs text-accent-green">✓ Created</span>
          </div>
          <div className="h-16 bg-background/50 flex items-center justify-center">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-muted" />
              <span className="text-sm text-muted">Sample Task</span>
              <span className="text-xs px-2 py-0.5 bg-accent/20 text-accent">High</span>
            </div>
          </div>
        </div>
        <div className="p-3 bg-card  border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">ProjectList.tsx</span>
            <span className="text-xs text-accent-green">✓ Created</span>
          </div>
          <div className="h-12 bg-background/50 flex items-center px-3 gap-2">
            <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400">Work</span>
            <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400">Personal</span>
            <span className="text-xs px-2 py-1 bg-border text-muted">+ New</span>
          </div>
        </div>
      </div>
    )
  },
  {
    label: "Tests in browser",
    description: "Verifying it works",
    content: (
      <div className="p-4 bg-card  border border-border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-accent-green" />
          <span className="text-sm text-accent-green">Testing with Playwright...</span>
        </div>
        <div className="space-y-2 text-sm text-muted">
          <div className="flex items-center gap-2">
            <span className="text-accent-green">✓</span> App loads correctly
          </div>
          <div className="flex items-center gap-2">
            <span className="text-accent-green">✓</span> Can add new task
          </div>
          <div className="flex items-center gap-2">
            <span className="text-accent-green">✓</span> Can mark task complete
          </div>
          <div className="flex items-center gap-2">
            <span className="text-accent-green">✓</span> Can switch between projects
          </div>
          <div className="flex items-center gap-2">
            <span className="text-accent-green">✓</span> Data persists on reload
          </div>
        </div>
      </div>
    )
  },
  {
    label: "Ready to use!",
    description: "Your app is complete",
    content: (
      <div className="p-4 bg-accent/10 border border-accent/30 ">
        <div className="text-center mb-4">
          <span className="text-4xl">🎉</span>
        </div>
        <h4 className="font-medium text-accent text-center mb-2">Your task tracker is ready</h4>
        <div className="space-y-2 text-sm">
          <div className="p-2 bg-card border border-border font-mono text-xs">
            cd task-tracker && npm run dev
          </div>
          <p className="text-muted text-center">
            Open <span className="text-accent">localhost:3000</span> to see your app
          </p>
        </div>
      </div>
    )
  }
];

export function NotionWalkthrough() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        if (currentStep < steps.length - 1) {
          setCurrentStep(s => s + 1);
        } else {
          setIsPlaying(false);
        }
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentStep]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Steps */}
        <StepIndicator
          steps={steps}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {steps[currentStep].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <PlaybackControls
        currentStep={currentStep}
        totalSteps={steps.length}
        isPlaying={isPlaying}
        onPrevious={() => setCurrentStep(s => Math.max(0, s - 1))}
        onNext={() => setCurrentStep(s => Math.min(steps.length - 1, s + 1))}
        onPlay={() => {
          if (currentStep >= steps.length - 1) setCurrentStep(0);
          setIsPlaying(!isPlaying);
        }}
      />
    </div>
  );
}
