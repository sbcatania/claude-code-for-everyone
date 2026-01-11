"use client";

import { motion } from "framer-motion";

interface Step {
  label: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (index: number) => void;
}

export function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="flex flex-col gap-2">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isComplete = index < currentStep;

        return (
          <button
            key={index}
            onClick={() => onStepClick?.(index)}
            disabled={!onStepClick}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all text-left ${
              isActive
                ? "bg-accent/10 border border-accent"
                : isComplete
                  ? "bg-accent-green/10 border border-accent-green/30"
                  : "bg-card border border-border hover:border-muted"
            } ${onStepClick ? "cursor-pointer" : "cursor-default"}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              isActive
                ? "bg-accent text-background"
                : isComplete
                  ? "bg-accent-green text-background"
                  : "bg-border text-muted"
            }`}>
              {isComplete ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <div className="flex-1">
              <div className={`font-medium ${isActive ? "text-accent" : isComplete ? "text-accent-green" : "text-foreground"}`}>
                {step.label}
              </div>
              {step.description && (
                <div className="text-xs text-muted mt-0.5">{step.description}</div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

interface PlaybackControlsProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onPlay: () => void;
}

export function PlaybackControls({
  currentStep,
  totalSteps,
  isPlaying,
  onPrevious,
  onNext,
  onPlay
}: PlaybackControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      <button
        onClick={onPrevious}
        disabled={currentStep === 0}
        className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-card-hover transition-colors"
      >
        Previous
      </button>

      <button
        onClick={onPlay}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          isPlaying
            ? "bg-accent/20 text-accent border border-accent"
            : "bg-accent text-background hover:bg-accent/90"
        }`}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>

      <button
        onClick={onNext}
        disabled={currentStep >= totalSteps - 1}
        className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-card-hover transition-colors"
      >
        Next
      </button>
    </div>
  );
}
