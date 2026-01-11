"use client";

import { SectionWrapper } from "../ui/SectionWrapper";
import { ChatComparison } from "../demos/ChatComparison";

export function Section01WhatIs() {
  return (
    <SectionWrapper
      number="01"
      title="What is Claude Code? Codex?"
      description="Claude Code is an AI coding agents that lives in your terminal. Because your terminal can do almost anything on your computer and these coding agents can use your terminal, Claude Code can do almost anything on your computer"
    >
      <ChatComparison />
    </SectionWrapper>
  );
}
