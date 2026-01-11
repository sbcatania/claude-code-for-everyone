"use client";

import { SectionWrapper } from "../ui/SectionWrapper";
import { InterviewDemo } from "../demos/InterviewDemo";

export function Section04Interview() {
  return (
    <SectionWrapper
      number="04"
      title="The interview technique"
      description="Here's a power move: if you don't know what Claude Code needs to know, ask it to interview YOU. Tell it to come up with questions about what you want. It becomes a thought partner that helps you figure out requirements."
    >
      <InterviewDemo />
    </SectionWrapper>
  );
}
