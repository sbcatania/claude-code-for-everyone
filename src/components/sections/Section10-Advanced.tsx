"use client";

import { SectionWrapper } from "../ui/SectionWrapper";
import { AdvancedTips } from "../demos/AdvancedTips";

export function Section10Advanced() {
  return (
    <SectionWrapper
      number="10"
      title="Advanced usage tips"
      description="Once you're comfortable with the basics, these tips will help you get even more out of Claude Code. Remember: you can always ask Claude how to do something."
    >
      <AdvancedTips />
    </SectionWrapper>
  );
}
