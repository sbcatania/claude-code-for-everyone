"use client";

import { SectionWrapper } from "../ui/SectionWrapper";
import { WorkflowScenario } from "../demos/WorkflowScenario";

export function Section08PuttingTogether() {
  return (
    <SectionWrapper
      number="08"
      title="Putting it all together"
      description="Watch complete workflows from start to finish. See how Claude combines questioning, building, and testing into smooth end-to-end experiences."
    >
      <WorkflowScenario />
    </SectionWrapper>
  );
}
