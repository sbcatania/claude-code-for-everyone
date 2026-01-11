"use client";

import { useState, useEffect } from "react";

interface TOCItem {
  id: string;
  number: string;
  title: string;
}

const tocItems: TOCItem[] = [
  { id: "section-00", number: "00", title: "Intro" },
  { id: "section-01", number: "01", title: "What is it?" },
  { id: "section-02", number: "02", title: "The terminal" },
  { id: "section-03", number: "03", title: "Talking to Claude" },
  { id: "section-04", number: "04", title: "Let Claude interview you" },
  { id: "section-05", number: "05", title: "Beyond chat" },
  { id: "section-06", number: "06", title: "Notion prototype" },
  { id: "section-07", number: "07", title: "Playwright testing" },
  { id: "section-08", number: "08", title: "Putting it together" },
  { id: "section-09", number: "09", title: "Getting started" },
  { id: "section-10", number: "10", title: "Advanced tips" },
];

export function TableOfContents() {
  const [activeId, setActiveId] = useState<string>("section-00");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -70% 0%",
        threshold: 0,
      }
    );

    tocItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="toc-container hidden lg:block">
      <div className="flex flex-col">
        {tocItems.map((item) => (
          <div key={item.id} className="toc-item">
            <button
              onClick={() => handleClick(item.id)}
              className={`toc-link text-left ${activeId === item.id ? "active" : ""}`}
            >
              {item.number}
            </button>
            <span className="toc-label">{item.title}</span>
          </div>
        ))}
      </div>
    </nav>
  );
}
