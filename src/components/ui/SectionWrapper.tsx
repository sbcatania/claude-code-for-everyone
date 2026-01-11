"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function SectionWrapper({ number, title, description, children }: SectionWrapperProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="py-24 px-6 border-b border-border"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left side - text content */}
          <div className="space-y-4">
            <span className="section-number">{number}</span>
            <h2 className="text-3xl font-semibold text-foreground">{title}</h2>
            <p className="text-lg text-muted leading-relaxed">{description}</p>
          </div>

          {/* Right side - interactive demo */}
          <div className="w-full">
            {children}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
