"use client";

import { SectionWrapper } from "../ui/SectionWrapper";
import { VagueVsSpecific } from "../demos/VagueVsSpecific";

export function Section03Talking() {
  return (
    <SectionWrapper
      number="03"
      title="Talking to Claude Code"
      description="You can talk to Claude Code just like you talk to ChatGPT or any other AI. You DO NOT need perfect technical language. Be vague! Claude will ask clarifying questions or just try something. And unlike ChatGPT or other tools, Claude Code can actually do things, not just give you an answer."
    >
      <VagueVsSpecific />
    </SectionWrapper>
  );
}
