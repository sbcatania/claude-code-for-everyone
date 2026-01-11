"use client";

import { SectionWrapper } from "../ui/SectionWrapper";
import { ExampleCards } from "../demos/ExampleCards";

export function Section05Beyond() {
  return (
    <SectionWrapper
      number="05"
      title="Claude can use your whole computer"
      description="This is what makes Claude Code different from regular AI chat. It's not just generating text—it's running scripts, creating files, opening browsers, and using your actual machine. You can drag files right into the terminal."
    >
      <ExampleCards />
    </SectionWrapper>
  );
}
