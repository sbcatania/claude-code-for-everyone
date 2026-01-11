"use client";

import { SectionWrapper } from "../ui/SectionWrapper";
import { NotionWalkthrough } from "../demos/NotionWalkthrough";

export function Section06NotionPrototype() {
  return (
    <SectionWrapper
      number="06"
      title="Build Something Real"
      description="Let's walk through building an actual app from scratch—a task tracker like Notion. Watch how Claude handles the entire process: clarifying, building, and testing."
    >
      <NotionWalkthrough />
    </SectionWrapper>
  );
}
