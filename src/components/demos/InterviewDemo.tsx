"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClaudeCodeDemo, UserMessage, ClaudeMessage } from "../ui/ClaudeCodeDemo";
import { useCopyWithToast } from "../ui/Toast";

const INTERVIEW_PROMPT = "Ask me any questions about how you should do this before you get started";

const conversation = [
  {
    role: "user" as const,
    content: `I want to add a new feature to track user activity. ${INTERVIEW_PROMPT}`
  },
  {
    role: "assistant" as const,
    content: (
      <>
        <p>I&apos;d love to help you build activity tracking! Let me ask a few questions to make sure I build exactly what you need:</p>
        <div className="mt-3 space-y-3 bg-background/30 p-3 ">
          <div>
            <span className="text-accent font-medium">1. What activities should we track?</span>
            <p className="text-sm text-muted mt-1">Page views, button clicks, form submissions, time on page, or something else?</p>
          </div>
          <div>
            <span className="text-accent font-medium">2. Who needs to see this data?</span>
            <p className="text-sm text-muted mt-1">Admins only? Users can see their own? Public dashboard?</p>
          </div>
          <div>
            <span className="text-accent font-medium">3. How should we store it?</span>
            <p className="text-sm text-muted mt-1">Are you using a database already? Do you have analytics tools like Mixpanel or Amplitude?</p>
          </div>
          <div>
            <span className="text-accent font-medium">4. Any privacy considerations?</span>
            <p className="text-sm text-muted mt-1">GDPR compliance, user consent, anonymization needs?</p>
          </div>
        </div>
      </>
    )
  },
  {
    role: "user" as const,
    content: "Track button clicks, admins see it, we use Postgres, and yes GDPR compliance needed"
  },
  {
    role: "assistant" as const,
    content: (
      <>
        <p>Perfect! I&apos;ll build a GDPR-compliant button click tracker with an admin dashboard. Here&apos;s my plan:</p>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 bg-accent/20 text-accent text-xs flex items-center justify-center">1</span>
            <span>Create a Postgres table for anonymous click events</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 bg-accent/20 text-accent text-xs flex items-center justify-center">2</span>
            <span>Add a trackClick() utility that doesn&apos;t store PII</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 bg-accent/20 text-accent text-xs flex items-center justify-center">3</span>
            <span>Build an admin dashboard at /admin/analytics</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 bg-accent/20 text-accent text-xs flex items-center justify-center">4</span>
            <span>Add consent banner integration</span>
          </div>
        </div>
        <p className="mt-3">Should I start building this?</p>
      </>
    )
  }
];

export function InterviewDemo() {
  const [visibleMessages, setVisibleMessages] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const copyToClipboard = useCopyWithToast();

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleMessages]);

  useEffect(() => {
    if (isPlaying && visibleMessages < conversation.length) {
      const timer = setTimeout(() => {
        setVisibleMessages(v => v + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (visibleMessages >= conversation.length) {
      setIsPlaying(false);
    }
  }, [isPlaying, visibleMessages]);

  const handlePlay = () => {
    if (visibleMessages >= conversation.length) {
      setVisibleMessages(1);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-4">
      {/* Copyable prompt tip */}
      <div
        onClick={() => copyToClipboard(INTERVIEW_PROMPT, "Prompt copied!")}
        className="p-3 bg-accent/10 border border-accent/30  cursor-pointer hover:bg-accent/20 transition-colors"
      >
        <p className="text-xs text-muted mb-1">The key is to ask Claude to interview you. Try adding this to your prompts:</p>
        <p className="text-sm text-accent font-mono">&quot;{INTERVIEW_PROMPT}&quot;</p>
        <p className="text-xs text-muted mt-2">Click to copy</p>
      </div>

      {/* Demo in terminal chrome */}
      <ClaudeCodeDemo showInput>
        <div ref={containerRef} className="max-h-64 overflow-y-auto">
          <AnimatePresence>
            {conversation.slice(0, visibleMessages).map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {msg.role === "user" ? (
                  <UserMessage>{msg.content}</UserMessage>
                ) : (
                  <ClaudeMessage>{msg.content}</ClaudeMessage>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ClaudeCodeDemo>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted">
          {visibleMessages} / {conversation.length} messages
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setVisibleMessages(1)}
            className="px-3 py-1.5 text-sm  bg-card border border-border hover:bg-card-hover transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handlePlay}
            className={`px-4 py-1.5 text-sm  font-medium transition-colors ${
              isPlaying
                ? "bg-accent/20 text-accent border border-accent"
                : "bg-accent text-background"
            }`}
          >
            {isPlaying ? "Pause" : visibleMessages >= conversation.length ? "Replay" : "Play"}
          </button>
        </div>
      </div>
    </div>
  );
}
