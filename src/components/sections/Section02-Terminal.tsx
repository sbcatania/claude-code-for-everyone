"use client";

import { SectionWrapper } from "../ui/SectionWrapper";
import { InteractiveTerminal } from "../demos/InteractiveTerminal";

export function Section02Terminal() {
  return (
    <SectionWrapper
      number="02"
      title="The terminal - is it scary?"
      description="The terminal can look intimidating. But it's just a text-based way to talk to your computer and it is not complicated. The terminal is always 'in' a folder, and a few basic commands let you navigate around. Once you understand that, everything else starts to click."
    >
      <InteractiveTerminal />
    </SectionWrapper>
  );
}
