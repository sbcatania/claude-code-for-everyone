"use client";

import { motion } from "framer-motion";
import { Section01WhatIs } from "@/components/sections/Section01-WhatIs";
import { Section02Terminal } from "@/components/sections/Section02-Terminal";
import { Section03Talking } from "@/components/sections/Section03-Talking";
import { Section04Interview } from "@/components/sections/Section04-Interview";
import { Section05Beyond } from "@/components/sections/Section05-Beyond";
import { Section06NotionPrototype } from "@/components/sections/Section06-NotionPrototype";
import { Section07PlaywrightMCP } from "@/components/sections/Section07-PlaywrightMCP";
import { Section08PuttingTogether } from "@/components/sections/Section08-PuttingTogether";
import { Section09GettingStarted } from "@/components/sections/Section09-GettingStarted";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Claude Code for Everyone
            </h1>
            <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto mb-8">
              An interactive guide to terminal-based AI agents.
              <br />
              <span className="text-foreground">No coding experience required.</span>
            </p>

            {/* Quick summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 bg-card border border-border rounded-xl"
              >
                <div className="text-3xl mb-3">💬</div>
                <h3 className="font-semibold mb-2">Talk Naturally</h3>
                <p className="text-sm text-muted">
                  Be vague, ask questions, think out loud. Claude figures out what you mean.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 bg-card border border-border rounded-xl"
              >
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="font-semibold mb-2">Actually Does Things</h3>
                <p className="text-sm text-muted">
                  Creates files, runs code, tests in browsers—not just text responses.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 bg-card border border-border rounded-xl"
              >
                <div className="text-3xl mb-3">🤝</div>
                <h3 className="font-semibold mb-2">Thought Partner</h3>
                <p className="text-sm text-muted">
                  Have it interview you, ask clarifying questions, think through problems.
                </p>
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-16"
            >
              <p className="text-sm text-muted mb-4">Scroll to explore</p>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="flex justify-center"
              >
                <svg className="w-6 h-6 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Main content - All sections */}
      <main>
        <Section01WhatIs />
        <Section02Terminal />
        <Section03Talking />
        <Section04Interview />
        <Section05Beyond />
        <Section06NotionPrototype />
        <Section07PlaywrightMCP />
        <Section08PuttingTogether />
        <Section09GettingStarted />
      </main>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://docs.anthropic.com/en/docs/claude-code"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-accent text-background font-medium rounded-lg hover:bg-accent/90 transition-colors"
              >
                Read the Docs
              </a>
              <a
                href="https://github.com/anthropics/claude-code"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-card border border-border font-medium rounded-lg hover:bg-card-hover transition-colors"
              >
                View on GitHub
              </a>
            </div>
          </div>

          <div className="text-sm text-muted">
            <p className="mb-2">
              Built with Claude Code (of course)
            </p>
            <p>
              Inspired by{" "}
              <a
                href="https://how-terminals-work.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                How Terminals Work
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
