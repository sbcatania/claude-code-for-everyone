"use client";

import { SectionWrapper } from "../ui/SectionWrapper";
import { InteractiveTerminal } from "../demos/InteractiveTerminal";

export function Section02Terminal() {
  return (
    <SectionWrapper
      number="02"
      title="The terminal (yes, it's scary)"
      description="Let's be honest: the terminal looks intimidating. But it's just a text-based way to talk to your computer. The terminal is always 'in' a folder, and a few basic commands let you navigate around. Once you understand that, everything else clicks."
    >
      <InteractiveTerminal />
    </SectionWrapper>
  );
}
