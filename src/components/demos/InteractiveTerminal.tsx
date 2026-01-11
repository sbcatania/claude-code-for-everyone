"use client";

import { useState } from "react";
import { Terminal } from "../ui/Terminal";

const basicCommands = [
  { cmd: "ls", desc: "List files in the current folder" },
  { cmd: "cd", desc: "Change to a different folder" },
  { cmd: "mkdir", desc: "Create a new folder" },
  { cmd: "pwd", desc: "Show which folder you're in" },
];

export function InteractiveTerminal() {
  const [currentDir, setCurrentDir] = useState("/Users/you");
  const [folders, setFolders] = useState(["Documents", "Downloads", "Desktop", "Pictures"]);
  const [hint, setHint] = useState("Try typing 'ls' to see what's in this folder");

  const handleSubmit = (input: string) => {
    const cmd = input.toLowerCase().trim();
    const parts = cmd.split(" ");

    // ls - list files
    if (cmd === "ls") {
      setHint("Those are the folders here. Try 'cd Documents' to go into one.");
      return [{ type: "output" as const, content: folders.map(f => f + "/").join("  ") }];
    }

    // pwd - print working directory
    if (cmd === "pwd") {
      setHint("That's where you are right now. Try 'ls' to see what's here.");
      return [{ type: "output" as const, content: currentDir }];
    }

    // cd - change directory
    if (parts[0] === "cd") {
      if (parts.length === 1) {
        return [{ type: "output" as const, content: "Usage: cd <folder-name>" }];
      }
      const target = parts[1];
      if (target === "..") {
        const parentDir = currentDir.split("/").slice(0, -1).join("/") || "/";
        setCurrentDir(parentDir);
        setHint("You went up one folder. Try 'pwd' to see where you are.");
        return [{ type: "output" as const, content: `Changed to ${parentDir}` }];
      }
      const folderExists = folders.some(f => f.toLowerCase() === target.toLowerCase());
      if (folderExists) {
        setCurrentDir(currentDir + "/" + target);
        setFolders(["file1.txt", "file2.txt", "subfolder"]);
        setHint("You're in a new folder now. Try 'ls' again.");
        return [{ type: "output" as const, content: `Changed to ${currentDir}/${target}` }];
      }
      return [{ type: "output" as const, content: `No folder named '${target}' here` }];
    }

    // mkdir - make directory
    if (parts[0] === "mkdir") {
      if (parts.length === 1) {
        return [{ type: "output" as const, content: "Usage: mkdir <folder-name>" }];
      }
      const newFolder = parts[1];
      setFolders([...folders, newFolder]);
      setHint(`Created '${newFolder}'! Try 'ls' to see it.`);
      return [{ type: "output" as const, content: `Created folder: ${newFolder}` }];
    }

    // help
    if (cmd === "help") {
      return [
        { type: "output" as const, content: "Basic commands:" },
        { type: "output" as const, content: "  ls        - list files in current folder" },
        { type: "output" as const, content: "  cd <dir>  - change to a folder" },
        { type: "output" as const, content: "  cd ..     - go up one folder" },
        { type: "output" as const, content: "  mkdir     - create a new folder" },
        { type: "output" as const, content: "  pwd       - show current folder path" },
      ];
    }

    // Unknown command
    setHint("Command not found. Try 'help' to see available commands.");
    return [{ type: "output" as const, content: `command not found: ${input}` }];
  };

  return (
    <div className="space-y-4">
      {/* Basic commands reference */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {basicCommands.map((item) => (
          <div key={item.cmd} className="p-3 bg-card border border-border ">
            <code className="text-accent font-mono text-sm">{item.cmd}</code>
            <p className="text-xs text-muted mt-1">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Interactive terminal */}
      <Terminal
        placeholder="Type a command..."
        onSubmit={handleSubmit}
        autoFocus
        initialLines={[
          { type: "output", content: "Welcome! Try the commands above." },
          { type: "output", content: "The terminal is always 'in' a folder. Right now you're in /Users/you" },
        ]}
      />

      <div className="text-sm text-muted text-center">{hint}</div>

      {/* Learn more link */}
      <div className="text-center">
        <a
          href="https://www.codecademy.com/learn/learn-the-command-line"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-accent hover:underline"
        >
          Want to learn more? Try Codecademy's free terminal course
        </a>
      </div>
    </div>
  );
}
