"use client";

import { SectionWrapper } from "../ui/SectionWrapper";
import { ExampleCards } from "../demos/ExampleCards";

export function Section05Beyond() {
  return (
    <SectionWrapper
      number="05"
      title="Beyond Code: Claude Does Everything"
      description="Claude Code isn't just for writing code. It can organize files, scan your system, build tools, generate docs—pretty much anything you can do from the command line."
    >
      <ExampleCards />
    </SectionWrapper>
  );
}
