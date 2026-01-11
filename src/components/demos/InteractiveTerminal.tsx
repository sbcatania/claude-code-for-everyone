"use client";

import { useState } from "react";
import { Terminal } from "../ui/Terminal";

const responses: Record<string, string[]> = {
  "ls": ["Documents/  Downloads/  Desktop/  Pictures/"],
  "pwd": ["/Users/you"],
  "whoami": ["you"],
  "date": [new Date().toLocaleString()],
  "echo hello": ["hello"],
  "help": [
    "Try these commands:",
    "  ls      - list files",
    "  pwd     - show current directory",
    "  whoami  - show username",
    "  date    - show current date",
    "  echo    - repeat what you type"
  ],
};

export function InteractiveTerminal() {
  const [hint, setHint] = useState("Try typing 'ls' or 'help' and press Enter");

  const handleSubmit = (input: string) => {
    const cmd = input.toLowerCase().trim();

    // Check for exact matches
    if (responses[cmd]) {
      setHint("Nice! Try another command");
      return responses[cmd].map(line => ({ type: "output" as const, content: line }));
    }

    // Check for echo command
    if (cmd.startsWith("echo ")) {
      const text = input.slice(5);
      return [{ type: "output" as const, content: text }];
    }

    // Unknown command
    setHint("Command not found. Try 'help' to see available commands");
    return [{ type: "output" as const, content: `command not found: ${input}` }];
  };

  return (
    <div className="space-y-4">
      <Terminal
        placeholder="Type a command..."
        onSubmit={handleSubmit}
        initialLines={[
          { type: "output", content: "Welcome! This is a simulated terminal." },
          { type: "output", content: "Type commands and press Enter to see how it works." },
        ]}
      />
      <div className="text-sm text-muted text-center">{hint}</div>
    </div>
  );
}
