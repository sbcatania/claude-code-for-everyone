"use client";

import { SectionWrapper } from "../ui/SectionWrapper";
import { InteractiveTerminal } from "../demos/InteractiveTerminal";

export function Section02Terminal() {
  return (
    <SectionWrapper
      number="02"
      title="The Terminal (It's Not Scary)"
      description="The terminal is just a text-based way to talk to your computer. You type commands, it responds. Think of it as texting your computer—very literally."
    >
      <InteractiveTerminal />
    </SectionWrapper>
  );
}
