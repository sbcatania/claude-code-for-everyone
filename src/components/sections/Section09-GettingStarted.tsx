"use client";

import { SectionWrapper } from "../ui/SectionWrapper";
import { GettingStarted } from "../demos/GettingStarted";

export function Section09GettingStarted() {
  return (
    <SectionWrapper
      number="09"
      title="Getting started"
      description="Ready to try it yourself? Here's how to install Claude Code and some prompts to get you started. It only takes a minute to set up."
    >
      <GettingStarted />
    </SectionWrapper>
  );
}
