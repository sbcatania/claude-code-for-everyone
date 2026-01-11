"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClaudeCodeDemo, UserMessage, ClaudeMessage } from "../ui/ClaudeCodeDemo";
import { useCopyWithToast } from "../ui/Toast";
import { StreamingText } from "../ui/StreamingText";

const INTERVIEW_PROMPT = "Ask me any questions about how you should do this before you get started";

const conversation = [
  {
    role: "user" as const,
    text: `I want to add a new feature to track user activity. ${INTERVIEW_PROMPT}`,
    content: null
  },
  {
    role: "assistant" as const,
    text: "I'd love to help you build activity tracking! Let me ask a few questions to make sure I build exactly what you need:",
    content: (
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
    )
  },
  {
    role: "user" as const,
    text: "Track button clicks, admins see it, we use Postgres, and yes GDPR compliance needed",
    content: null
  },
  {
    role: "assistant" as const,
    text: "Perfect! I'll build a GDPR-compliant button click tracker with an admin dashboard. Here's my plan:",
    content: (
      <>
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
  const [streamingMessage, setStreamingMessage] = useState(0);
  const [showContent, setShowContent] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const copyToClipboard = useCopyWithToast();

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleMessages, showContent]);

  const handleStreamComplete = (messageIndex: number) => {
    // Show the content section after text streams
    const msg = conversation[messageIndex];
    if (msg.content) {
      setTimeout(() => {
        setShowContent(prev => [...prev, messageIndex]);
      }, 100);
    }

    // Move to next message if playing
    if (isPlaying) {
      setTimeout(() => {
        if (messageIndex + 1 < conversation.length) {
          setVisibleMessages(messageIndex + 2);
          setStreamingMessage(messageIndex + 1);
        } else {
          setIsPlaying(false);
        }
      }, 500);
    }
  };

  const handlePlay = () => {
    if (visibleMessages >= conversation.length) {
      setVisibleMessages(1);
      setStreamingMessage(0);
      setShowContent([]);
    }
    setIsPlaying(true);
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
            {conversation.slice(0, visibleMessages).map((msg, index) => {
              const isCurrentlyStreaming = isPlaying && streamingMessage === index;
              const hasCompletedStreaming = !isPlaying || streamingMessage > index || showContent.includes(index);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {msg.role === "user" ? (
                    <UserMessage>
                      {isCurrentlyStreaming ? (
                        <StreamingText
                          text={msg.text}
                          speed={12}
                          onComplete={() => handleStreamComplete(index)}
                        />
                      ) : msg.text}
                    </UserMessage>
                  ) : (
                    <ClaudeMessage>
                      <div>
                        {isCurrentlyStreaming ? (
                          <StreamingText
                            text={msg.text}
                            speed={10}
                            onComplete={() => handleStreamComplete(index)}
                          />
                        ) : (
                          <p>{msg.text}</p>
                        )}
                        {hasCompletedStreaming && msg.content && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {msg.content}
                          </motion.div>
                        )}
                      </div>
                    </ClaudeMessage>
                  )}
                </motion.div>
              );
            })}
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
            onClick={() => {
              setVisibleMessages(1);
              setStreamingMessage(0);
              setShowContent([]);
              setIsPlaying(false);
            }}
            className="px-3 py-1.5 text-sm  bg-card border border-border hover:bg-card-hover transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handlePlay}
            disabled={isPlaying}
            className={`px-4 py-1.5 text-sm  font-medium transition-colors ${
              isPlaying
                ? "bg-muted/20 text-muted cursor-not-allowed"
                : "bg-accent text-background hover:bg-accent/90"
            }`}
          >
            {isPlaying ? "Playing..." : visibleMessages >= conversation.length ? "Replay" : "Play"}
          </button>
        </div>
      </div>
    </div>
  );
}
