"use client";

import { useState, useEffect, useCallback } from "react";

export function EditMode() {
  const [enabled, setEnabled] = useState(false);
  const [changes, setChanges] = useState<Array<{ original: string; updated: string; element: string }>>([]);
  const [showPanel, setShowPanel] = useState(false);

  const handleBlur = useCallback((e: FocusEvent) => {
    const target = e.target as HTMLElement;
    const original = target.dataset.originalText;
    const updated = target.textContent || "";

    if (original && original !== updated) {
      const elementInfo = getElementInfo(target);
      setChanges(prev => [...prev, { original, updated, element: elementInfo }]);
      setShowPanel(true);
    }
  }, []);

  const handleFocus = useCallback((e: FocusEvent) => {
    const target = e.target as HTMLElement;
    if (!target.dataset.originalText) {
      target.dataset.originalText = target.textContent || "";
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // Make text elements editable
    const textSelectors = "h1, h2, h3, h4, h5, h6, p, span, li, a, label, button";
    const elements = document.querySelectorAll(textSelectors);

    elements.forEach(el => {
      const htmlEl = el as HTMLElement;
      // Skip elements that are interactive or have no text
      if (htmlEl.closest('[data-edit-ignore]') ||
          htmlEl.querySelector('svg') ||
          !htmlEl.textContent?.trim()) {
        return;
      }
      htmlEl.contentEditable = "true";
      htmlEl.style.outline = "1px dashed rgba(249, 115, 22, 0.3)";
      htmlEl.style.cursor = "text";
      htmlEl.addEventListener("focus", handleFocus as EventListener);
      htmlEl.addEventListener("blur", handleBlur as EventListener);
    });

    return () => {
      elements.forEach(el => {
        const htmlEl = el as HTMLElement;
        htmlEl.contentEditable = "false";
        htmlEl.style.outline = "";
        htmlEl.style.cursor = "";
        htmlEl.removeEventListener("focus", handleFocus as EventListener);
        htmlEl.removeEventListener("blur", handleBlur as EventListener);
      });
    };
  }, [enabled, handleBlur, handleFocus]);

  const getElementInfo = (el: HTMLElement): string => {
    const tag = el.tagName.toLowerCase();
    const classes = el.className ? `.${el.className.split(" ").slice(0, 2).join(".")}` : "";
    const parent = el.parentElement?.tagName.toLowerCase() || "";
    return `<${tag}${classes}> in <${parent}>`;
  };

  const copyChange = (change: { original: string; updated: string }) => {
    navigator.clipboard.writeText(change.updated);
  };

  const copyAll = () => {
    const text = changes.map(c => `${c.element}\nOLD: ${c.original}\nNEW: ${c.updated}`).join("\n\n---\n\n");
    navigator.clipboard.writeText(text);
  };

  const clearChanges = () => {
    setChanges([]);
  };

  return (
    <div data-edit-ignore>
      {/* Toggle button */}
      <button
        onClick={() => setEnabled(!enabled)}
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          zIndex: 9999,
          padding: "0.5rem 1rem",
          background: enabled ? "#f97316" : "#27272a",
          color: enabled ? "#0a0a0a" : "#e4e4e7",
          border: "1px solid #3f3f46",
          borderRadius: "4px",
          fontSize: "12px",
          fontFamily: "monospace",
          cursor: "pointer",
        }}
      >
        {enabled ? "Edit mode ON" : "Edit mode OFF"}
      </button>

      {/* Changes panel */}
      {showPanel && changes.length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: "4rem",
            right: "1rem",
            zIndex: 9999,
            width: "400px",
            maxHeight: "60vh",
            background: "#141414",
            border: "1px solid #27272a",
            borderRadius: "4px",
            overflow: "hidden",
            fontFamily: "monospace",
            fontSize: "12px",
          }}
        >
          <div
            style={{
              padding: "0.5rem 1rem",
              background: "#1a1a1a",
              borderBottom: "1px solid #27272a",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#f97316" }}>Changes ({changes.length})</span>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={copyAll}
                style={{
                  padding: "0.25rem 0.5rem",
                  background: "#27272a",
                  color: "#e4e4e7",
                  border: "none",
                  borderRadius: "2px",
                  cursor: "pointer",
                  fontSize: "11px",
                }}
              >
                Copy all
              </button>
              <button
                onClick={clearChanges}
                style={{
                  padding: "0.25rem 0.5rem",
                  background: "#27272a",
                  color: "#e4e4e7",
                  border: "none",
                  borderRadius: "2px",
                  cursor: "pointer",
                  fontSize: "11px",
                }}
              >
                Clear
              </button>
              <button
                onClick={() => setShowPanel(false)}
                style={{
                  padding: "0.25rem 0.5rem",
                  background: "#27272a",
                  color: "#e4e4e7",
                  border: "none",
                  borderRadius: "2px",
                  cursor: "pointer",
                  fontSize: "11px",
                }}
              >
                Hide
              </button>
            </div>
          </div>
          <div style={{ maxHeight: "calc(60vh - 40px)", overflow: "auto", padding: "0.5rem" }}>
            {changes.map((change, i) => (
              <div
                key={i}
                style={{
                  padding: "0.5rem",
                  marginBottom: "0.5rem",
                  background: "#0a0a0a",
                  border: "1px solid #27272a",
                }}
              >
                <div style={{ color: "#71717a", marginBottom: "0.25rem", fontSize: "10px" }}>
                  {change.element}
                </div>
                <div style={{ color: "#71717a", marginBottom: "0.25rem" }}>
                  <span style={{ color: "#ef4444" }}>−</span> {change.original.slice(0, 80)}{change.original.length > 80 ? "..." : ""}
                </div>
                <div style={{ color: "#e4e4e7", marginBottom: "0.5rem" }}>
                  <span style={{ color: "#22c55e" }}>+</span> {change.updated.slice(0, 80)}{change.updated.length > 80 ? "..." : ""}
                </div>
                <button
                  onClick={() => copyChange(change)}
                  style={{
                    padding: "0.25rem 0.5rem",
                    background: "#27272a",
                    color: "#e4e4e7",
                    border: "none",
                    borderRadius: "2px",
                    cursor: "pointer",
                    fontSize: "10px",
                  }}
                >
                  Copy new text
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
