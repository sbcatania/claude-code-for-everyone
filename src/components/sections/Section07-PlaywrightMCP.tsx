"use client";

import { SectionWrapper } from "../ui/SectionWrapper";
import { PlaywrightLoop } from "../demos/PlaywrightLoop";

export function Section07PlaywrightMCP() {
  return (
    <SectionWrapper
      number="07"
      title="Self-Testing with Playwright"
      description="Here's where it gets really powerful: Claude can test its own work. Using Playwright, it opens a browser, interacts with your UI, spots issues, fixes them, and retests—automatically."
    >
      <PlaywrightLoop />
    </SectionWrapper>
  );
}
