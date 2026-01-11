"use client";

import { SectionWrapper } from "../ui/SectionWrapper";
import { VagueVsSpecific } from "../demos/VagueVsSpecific";

export function Section03Talking() {
  return (
    <SectionWrapper
      number="03"
      title="Talking to Claude Code"
      description="You don't need perfect technical language. Be vague! Claude will ask clarifying questions or just try something. It's like working with a smart colleague who fills in the gaps."
    >
      <VagueVsSpecific />
    </SectionWrapper>
  );
}
