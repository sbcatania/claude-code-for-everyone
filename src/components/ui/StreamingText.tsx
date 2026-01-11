"use client";

import { useState, useEffect, useRef } from "react";

interface StreamingTextProps {
  text: string;
  speed?: number; // ms per character
  onComplete?: () => void;
  className?: string;
  startDelay?: number; // ms delay before starting
}

export function StreamingText({
  text,
  speed = 20,
  onComplete,
  className = "",
  startDelay = 0
}: StreamingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText("");
    setIsComplete(false);
    indexRef.current = 0;
    hasStartedRef.current = false;

    const startTimeout = setTimeout(() => {
      hasStartedRef.current = true;

      const interval = setInterval(() => {
        if (indexRef.current < text.length) {
          // Add multiple characters at once for faster feel
          const charsToAdd = Math.min(2, text.length - indexRef.current);
          setDisplayedText(text.slice(0, indexRef.current + charsToAdd));
          indexRef.current += charsToAdd;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, startDelay, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && <span className="terminal-cursor inline-block ml-0.5" />}
    </span>
  );
}

// Hook version for more control
export function useStreamingText(text: string, speed = 20, startDelay = 0) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    indexRef.current = 0;

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (indexRef.current < text.length) {
          const charsToAdd = Math.min(2, text.length - indexRef.current);
          setDisplayedText(text.slice(0, indexRef.current + charsToAdd));
          indexRef.current += charsToAdd;
        } else {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, speed);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, startDelay]);

  return { displayedText, isComplete };
}
