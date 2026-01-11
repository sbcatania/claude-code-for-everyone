"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ code, language = "bash", filename, showLineNumbers = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const lines = code.split("\n");

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-card-hover border-b border-border">
        <div className="flex items-center gap-2">
          {filename && (
            <span className="text-xs text-muted font-mono">{filename}</span>
          )}
          {!filename && language && (
            <span className="text-xs text-muted font-mono">{language}</span>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="text-xs text-muted hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-border"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-accent-green"
              >
                Copied!
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Copy
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Code content */}
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-sm">
          {lines.map((line, index) => (
            <div key={index} className="flex">
              {showLineNumbers && (
                <span className="select-none text-muted/50 w-8 text-right pr-4">
                  {index + 1}
                </span>
              )}
              <code className="text-foreground">{line || " "}</code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
