"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClaudeCodeDemo, UserMessage, ClaudeMessage, ActionMessage } from "../ui/ClaudeCodeDemo";

const scenarios = [
  {
    id: "prototype",
    title: "Prototype a feature",
    emoji: "🧪",
    request: "I want to prototype a user dashboard for our app. Ask me any questions before you start.",
    steps: [
      {
        type: "claude",
        content: "I'd love to help prototype a user dashboard! Let me ask a few questions:\n\n• What data should the dashboard show? (activity, stats, notifications?)\n• Do you have existing user data I should connect to, or mock data is fine?\n• Any dashboards you like the look of I can reference?\n• Should I build this in your existing codebase or a separate prototype folder?"
      },
      {
        type: "user",
        content: "Show recent activity and key stats. Mock data is fine. I like Linear's dashboard. Put it in a prototype folder."
      },
      {
        type: "action",
        content: "Creating prototype/dashboard/ folder..."
      },
      {
        type: "action",
        content: "Building components: ActivityFeed, StatsCards, DashboardLayout..."
      },
      {
        type: "action",
        content: "Adding Linear-inspired styling with clean typography..."
      },
      {
        type: "claude",
        content: "Your dashboard prototype is ready!\n\n✓ Clean Linear-inspired design\n✓ Activity feed with timestamps\n✓ 4 stat cards (users, revenue, sessions, growth)\n✓ Mock data that's easy to swap out\n\nOpen prototype/dashboard/index.html in your browser to see it!"
      }
    ]
  },
  {
    id: "diagram",
    title: "Explain & diagram",
    emoji: "🗺️",
    request: "Help me understand how our payment system works and create a visual diagram I can share",
    steps: [
      {
        type: "action",
        content: "Scanning codebase for payment-related files..."
      },
      {
        type: "action",
        content: "Found: src/payments/, api/checkout/, lib/stripe.ts..."
      },
      {
        type: "claude",
        content: "I've mapped your payment system. Here's how it works:\n\n1. User clicks 'Buy' → checkout page loads\n2. Stripe Elements captures card info (never hits your server)\n3. Your API creates a PaymentIntent with Stripe\n4. On success, webhook updates your database\n5. Confirmation email sent via SendGrid\n\nLet me create an interactive diagram you can share."
      },
      {
        type: "action",
        content: "Creating payment-flow.html with interactive diagram..."
      },
      {
        type: "claude",
        content: "Done! I created payment-flow.html - it's a simple webpage with:\n\n✓ Visual flowchart of the payment process\n✓ Click each step for more details\n✓ Shows which files handle each step\n✓ Shareable - just send the HTML file to anyone\n\nOpen it in your browser to explore!"
      }
    ]
  },
  {
    id: "script",
    title: "One-off script",
    emoji: "⚡",
    request: "Write me a script that finds all images over 1MB in my Downloads folder and lists them",
    steps: [
      {
        type: "claude",
        content: "I'll create a script to find large images. Quick question:\n\n• Just list them, or also show their sizes?\n• Want to include subfolders?\n• Should I output to terminal or create a text file?"
      },
      {
        type: "user",
        content: "Show sizes, include subfolders, output to a text file"
      },
      {
        type: "action",
        content: "Creating find-large-images.sh script..."
      },
      {
        type: "action",
        content: "Running script on ~/Downloads..."
      },
      {
        type: "claude",
        content: "Found 23 images over 1MB! Results saved to large-images.txt\n\nTop 5 largest:\n• vacation-photo.png (12.4 MB)\n• screenshot-2024.png (8.2 MB)\n• design-mockup.psd (6.1 MB)\n• hero-image.jpg (4.8 MB)\n• banner.png (3.2 MB)\n\nYou can run this anytime with: ./find-large-images.sh"
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
            className={`flex-1 p-3  border text-left transition-all ${
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

      {/* Demo in terminal chrome */}
      <ClaudeCodeDemo showInput>
        {/* Initial request */}
        <UserMessage>{scenario.request}</UserMessage>

        {/* Steps */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          <AnimatePresence>
            {scenario.steps.slice(0, visibleSteps).map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {step.type === "claude" && (
                  <ClaudeMessage>
                    <div className="whitespace-pre-line">{step.content}</div>
                  </ClaudeMessage>
                )}
                {step.type === "user" && (
                  <UserMessage>{step.content}</UserMessage>
                )}
                {step.type === "action" && (
                  <ActionMessage>{step.content}</ActionMessage>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ClaudeCodeDemo>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted">
          {visibleSteps} / {scenario.steps.length} steps
        </span>
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className={`px-4 py-2  font-medium transition-colors ${
            isPlaying
              ? "bg-muted/20 text-muted cursor-not-allowed"
              : "bg-accent text-background hover:bg-accent/90"
          }`}
        >
          {isPlaying ? "Playing..." : visibleSteps >= scenario.steps.length ? "Replay" : "Play scenario"}
        </button>
      </div>
    </div>
  );
}
