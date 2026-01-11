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
  autoFocus?: boolean;
}

export function Terminal({
  initialLines = [],
  placeholder = "Type a command...",
  onSubmit,
  allowInput = true,
  autoType,
  autoFocus = false
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

  // Auto-focus on mount
  useEffect(() => {
    if (autoFocus && allowInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus, allowInput]);

  const focusInput = () => {
    if (allowInput && !isTyping && inputRef.current) {
      inputRef.current.focus();
    }
  };

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
    <div className="terminal overflow-hidden flex flex-col">
      {/* Terminal header with dots */}
      <div className="terminal-header">
        <div className="terminal-dot terminal-dot-red" />
        <div className="terminal-dot terminal-dot-yellow" />
        <div className="terminal-dot terminal-dot-green" />
        <span className="ml-2 text-xs text-muted">terminal</span>
      </div>

      {/* Terminal content - scrollable area */}
      <div
        ref={containerRef}
        onClick={focusInput}
        className="p-4 h-48 overflow-y-auto font-mono text-sm cursor-text flex-1"
      >
        <AnimatePresence>
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="terminal-row mb-1"
            >
              {line.type === "input" && (
                <span className="text-accent-green terminal-text">{line.content}</span>
              )}
              {line.type === "claude" && (
                <>
                  <span className="text-accent" style={{ width: '8ch', flexShrink: 0 }}>claude:</span>
                  <span className="text-accent">{line.content}</span>
                </>
              )}
              {line.type === "output" && (
                <span className="text-muted terminal-text">{line.content}</span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <span className="terminal-cursor" />
        )}
      </div>

      {/* Fixed input area at bottom */}
      {allowInput && (
        <div
          className="border-t border-border bg-[#0a0a0a] px-4 py-3 font-mono text-sm relative"
          onClick={focusInput}
        >
          {/* Hidden input for actual text entry */}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            className="absolute inset-0 bg-transparent outline-none text-foreground caret-transparent w-full disabled:opacity-50 opacity-0 px-4 py-3"
          />
          {/* Visual display */}
          <div className="flex items-center cursor-text">
            <span className="text-accent-green mr-1">$</span>
            {!isTyping && <span className="terminal-cursor" />}
            {input ? (
              <span className="text-foreground">{input}</span>
            ) : (
              <span className="text-muted/50">{placeholder}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
