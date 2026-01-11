"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalLine {
  type: "input" | "output" | "claude";
  content: string;
}

interface TerminalProps {
  initialLines?: TerminalLine[];
  placeholder?: string;
  onSubmit?: (input: string) => TerminalLine[] | void;
  allowInput?: boolean;
  autoType?: { lines: TerminalLine[]; delay?: number };
}

export function Terminal({
  initialLines = [],
  placeholder = "Type a command...",
  onSubmit,
  allowInput = true,
  autoType
}: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>(initialLines);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-type effect
  useEffect(() => {
    if (autoType && autoType.lines.length > 0) {
      setIsTyping(true);
      let currentIndex = 0;
      const delay = autoType.delay || 50;

      const typeNextLine = () => {
        if (currentIndex < autoType.lines.length) {
          const line = autoType.lines[currentIndex];
          let charIndex = 0;

          const typeChar = () => {
            if (charIndex <= line.content.length) {
              setLines(prev => {
                const newLines = [...prev];
                const lastLine = newLines[newLines.length - 1];
                if (lastLine && lastLine.type === line.type && charIndex > 0) {
                  newLines[newLines.length - 1] = { ...line, content: line.content.slice(0, charIndex) };
                } else if (charIndex === 0) {
                  newLines.push({ ...line, content: "" });
                }
                return newLines;
              });
              charIndex++;
              setTimeout(typeChar, delay);
            } else {
              currentIndex++;
              setTimeout(typeNextLine, delay * 10);
            }
          };
          typeChar();
        } else {
          setIsTyping(false);
        }
      };

      typeNextLine();
    }
  }, [autoType]);

  // Scroll to bottom on new lines
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() && !isTyping) {
      const newLines: TerminalLine[] = [{ type: "input", content: `$ ${input}` }];

      if (onSubmit) {
        const response = onSubmit(input);
        if (response) {
          newLines.push(...response);
        }
      }

      setLines(prev => [...prev, ...newLines]);
      setInput("");
    }
  };

  return (
    <div className="terminal overflow-hidden">
      {/* Terminal header with dots */}
      <div className="terminal-header">
        <div className="terminal-dot terminal-dot-red" />
        <div className="terminal-dot terminal-dot-yellow" />
        <div className="terminal-dot terminal-dot-green" />
        <span className="ml-2 text-xs text-muted">terminal</span>
      </div>

      {/* Terminal content */}
      <div
        ref={containerRef}
        className="p-4 h-64 overflow-y-auto font-mono text-sm"
      >
        <AnimatePresence>
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`mb-1 ${
                line.type === "input"
                  ? "text-accent-green"
                  : line.type === "claude"
                    ? "text-accent"
                    : "text-muted"
              }`}
            >
              {line.type === "claude" && (
                <span className="text-accent mr-2">claude:</span>
              )}
              {line.content}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Input line */}
        {allowInput && !isTyping && (
          <div className="flex items-center">
            <span className="text-accent-green mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted/50"
            />
            <span className="cursor-blink text-foreground">|</span>
          </div>
        )}

        {isTyping && (
          <span className="cursor-blink text-accent">|</span>
        )}
      </div>
    </div>
  );
}
