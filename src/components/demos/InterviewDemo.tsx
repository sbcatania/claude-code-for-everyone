"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatBubble, ChatContainer } from "../ui/ChatBubble";

const conversation = [
  {
    role: "user" as const,
    content: "I want to add a new feature to track user activity"
  },
  {
    role: "assistant" as const,
    content: (
      <>
        <p>I&apos;d love to help you build activity tracking! Let me ask a few questions to make sure I build exactly what you need:</p>
        <div className="mt-3 space-y-3 bg-background/30 p-3 rounded-lg">
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
            <span className="w-5 h-5 rounded bg-accent/20 text-accent text-xs flex items-center justify-center">1</span>
            <span>Create a Postgres table for anonymous click events</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-accent/20 text-accent text-xs flex items-center justify-center">2</span>
            <span>Add a trackClick() utility that doesn&apos;t store PII</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-accent/20 text-accent text-xs flex items-center justify-center">3</span>
            <span>Build an admin dashboard at /admin/analytics</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-accent/20 text-accent text-xs flex items-center justify-center">4</span>
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
      <ChatContainer>
        <AnimatePresence>
          {conversation.slice(0, visibleMessages).map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChatBubble role={msg.role} animate={false}>
                {msg.content}
              </ChatBubble>
            </motion.div>
          ))}
        </AnimatePresence>
      </ChatContainer>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted">
          {visibleMessages} / {conversation.length} messages
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setVisibleMessages(1)}
            className="px-3 py-1.5 text-sm rounded-lg bg-card border border-border hover:bg-card-hover transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handlePlay}
            className={`px-4 py-1.5 text-sm rounded-lg font-medium transition-colors ${
              isPlaying
                ? "bg-accent/20 text-accent border border-accent"
                : "bg-accent text-background"
            }`}
          >
            {isPlaying ? "Pause" : visibleMessages >= conversation.length ? "Replay" : "Play"}
          </button>
        </div>
      </div>

      {/* Tip */}
      <div className="p-4 bg-card border border-border rounded-lg">
        <p className="text-sm font-medium text-foreground mb-2">Pro tip: The Interview Technique</p>
        <p className="text-sm text-muted">
          Try saying: <span className="text-accent">&quot;Come up with a list of questions you have about how this should work and ask them to me&quot;</span>
        </p>
      </div>
    </div>
  );
}
