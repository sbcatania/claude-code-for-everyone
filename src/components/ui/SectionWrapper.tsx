"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
  id?: string;
}

export function SectionWrapper({ number, title, description, children, id }: SectionWrapperProps) {
  return (
    <motion.section
      id={id || `section-${number}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="py-20"
    >
      <div className="content-column">
        {/* Section header */}
        <div className="mb-8">
          <div className="section-number">{number}</div>
          <h2 className="section-title">{title}</h2>
          <p className="section-description">{description}</p>
        </div>

        {/* Section content */}
        <div className="mt-8">
          {children}
        </div>
      </div>
    </motion.section>
  );
}
