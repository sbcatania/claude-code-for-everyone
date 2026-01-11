"use client";

import { motion } from "framer-motion";
import { HeroTerminal } from "@/components/demos/HeroTerminal";
import { Section01WhatIs } from "@/components/sections/Section01-WhatIs";
import { Section02Terminal } from "@/components/sections/Section02-Terminal";
import { Section03Talking } from "@/components/sections/Section03-Talking";
import { Section04Interview } from "@/components/sections/Section04-Interview";
import { Section05Beyond } from "@/components/sections/Section05-Beyond";
import { Section06NotionPrototype } from "@/components/sections/Section06-NotionPrototype";
import { Section07PlaywrightMCP } from "@/components/sections/Section07-PlaywrightMCP";
import { Section08PuttingTogether } from "@/components/sections/Section08-PuttingTogether";
import { Section09GettingStarted } from "@/components/sections/Section09-GettingStarted";
import { Section10Advanced } from "@/components/sections/Section10-Advanced";
import { TableOfContents } from "@/components/ui/TableOfContents";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Floating TOC */}
      <TableOfContents />

      {/* Hero Section */}
      <header id="section-00" className="pt-16 pb-12">
        <div className="content-column">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="section-number">00</div>
            <h1 className="text-3xl font-medium text-accent mb-3">
              Claude Code for Everyone
            </h1>
            <p className="section-description mb-8">
              Claude Code and Codex let you DM your computer. It doesn't have to be scary.
            </p>

            {/* Animated terminal demo */}
            <div className="mb-10">
              <HeroTerminal />
            </div>

            {/* Real story callout */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-10 p-4 bg-card border border-border"
            >
              <p className="text-sm text-muted">
                <span className="text-accent">This site was built with Claude Code.</span>{" "}
                I thought of this site while in a meeting and DM'd some colleagues about it. I pasted a screenshot of my Slack DM plus a 3-sentence prompt.
                10 minutes later, Claude Code produced this entire site. I had no idea how to deploy it, so I asked Claude—it walked me through setting up Vercel auto deployments step by step. That took 5 more minutes.
              </p>
            </motion.div>

            {/* Quick summary */}
            <div className="space-y-4">
              <div className="p-4 bg-card border border-border">
                <h3 className="font-medium text-foreground mb-1">Chat, don&apos;t command</h3>
                <p className="text-sm text-muted">
                  Talk like you would to a coworker. Be vague, ask questions, think out loud.
                </p>
              </div>

              <div className="p-4 bg-card border border-border">
                <h3 className="font-medium text-foreground mb-1">Uses your computer</h3>
                <p className="text-sm text-muted">
                  Creates files, runs scripts, opens browsers, installs tools—not just text.
                </p>
              </div>

              <div className="p-4 bg-card border border-border">
                <h3 className="font-medium text-foreground mb-1">Your thought partner</h3>
                <p className="text-sm text-muted">
                  Have it interview you, explain tradeoffs, and help you make decisions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Divider */}
      <div className="content-column">
        <div className="section-divider" />
      </div>

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
        <Section10Advanced />
      </main>

      {/* Footer */}
      <footer className="py-16">
        <div className="content-column">
          <div className="mb-8">
            <h2 className="section-title mb-4">Ready to get started?</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://docs.anthropic.com/en/docs/claude-code"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-accent text-background font-medium hover:bg-accent/90 transition-colors text-center"
              >
                Read the docs
              </a>
              <a
                href="https://github.com/anthropics/claude-code"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-card border border-border font-medium hover:bg-card-hover transition-colors text-center"
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
