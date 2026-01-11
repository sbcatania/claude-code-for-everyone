"use client";

import { SectionWrapper } from "../ui/SectionWrapper";
import { ChatComparison } from "../demos/ChatComparison";

export function Section01WhatIs() {
  return (
    <SectionWrapper
      number="01"
      title="What is Claude Code?"
      description="Claude Code is an AI that lives in your terminal and can actually DO things on your computer. Not just give you code to copy—it creates files, runs commands, and builds entire projects."
    >
      <ChatComparison />
    </SectionWrapper>
  );
}
