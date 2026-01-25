"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  RefreshIcon,
  ArrowRight01Icon,
  Layers01Icon,
  Search01Icon,
  CheckmarkCircle02Icon
} from "@hugeicons/core-free-icons";

type Phase = "idle" | "rendering" | "diffing" | "committing";

export default function ReconcileDemo() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [nextCount, setNextCount] = useState(0);

  // Auto-run the animation cycle when user requests update
  const triggerUpdate = () => {
    if (phase !== "idle") return;

    setPhase("rendering");
    setNextCount(c => count + 1);

    // Timeline
    setTimeout(() => setPhase("diffing"), 1500);
    setTimeout(() => setPhase("committing"), 3000);
    setTimeout(() => {
      setCount(c => c + 1);
      setPhase("idle");
    }, 4500);
  };

  return (
    <div className="my-12 w-full max-w-3xl mx-auto font-sans">
      {/* Control Panel */}
      <div className="flex items-center justify-between mb-8 p-4 rounded-xl bg-card border border-border shadow-sm">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            React Runtime
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">
              Status:
            </span>
            <PhaseBadge phase={phase} />
          </div>
        </div>

        <button
          onClick={triggerUpdate}
          disabled={phase !== "idle"}
          className={`
            relative overflow-hidden group px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300
            ${phase === "idle"
              ? "bg-primary text-primary-foreground hover:opacity-90 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              : "bg-muted text-muted-foreground cursor-not-allowed"}
          `}
        >
          <span className="relative z-10 flex items-center gap-2">
            {phase === "idle" ? "Update State (count++)" : "Processing..."}
            {phase === "idle" && <HugeiconsIcon icon={ArrowRight01Icon} size={16} />}
          </span>
        </button>
      </div>

      {/* Visualization Area */}
      <div className="relative bg-muted/30 rounded-2xl border border-border/50 p-6 md:p-10 min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full">

          {/* Current Tree */}
          <TreePanel
            title="Current Tree"
            count={count}
            isOld={true} // Always "old" perspective
            isActive={true}
          />

          {/* Connection / Progress */}
          <div className="h-12 w-0.5 md:h-0.5 md:w-24 bg-border relative">
            <AnimatePresence mode="wait">
              {phase === "rendering" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background border border-border rounded-full p-2 shadow-sm z-10"
                >
                  <HugeiconsIcon icon={Layers01Icon} size={20} className="text-muted-foreground animate-pulse" />
                </motion.div>
              )}
              {phase === "diffing" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background border border-border rounded-full p-2 shadow-sm z-10"
                >
                  <HugeiconsIcon icon={Search01Icon} size={20} className="text-primary animate-pulse" />
                </motion.div>
              )}
              {phase === "committing" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background border border-green-200 rounded-full p-2 shadow-sm z-10"
                >
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} className="text-green-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Work-in-Progress Tree */}
          <div className="relative">
            <AnimatePresence>
              {phase !== "idle" && (
                <motion.div
                  initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                  transition={{ duration: 0.4 }}
                >
                  <TreePanel
                    title="Work-in-Progress"
                    count={nextCount}
                    isOld={false}
                    highlightDiff={phase === "diffing"}
                    isActive={true}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Placeholder to keep layout stable */}
            {phase === "idle" && (
              <div className="opacity-0 pointer-events-none select-none grayscale">
                <TreePanel title="Work-in-Progress" count={count} isActive={false} />
              </div>
            )}
          </div>

        </div>

        {/* Phase explainer overlay */}
        <div className="absolute bottom-4 left-0 right-0 text-center px-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-foreground/70 font-medium"
            >
              {getPhaseDescription(phase)}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function PhaseBadge({ phase }: { phase: Phase }) {
  const styles = {
    idle: "bg-secondary text-secondary-foreground border-border",
    rendering: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    diffing: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    committing: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  };

  const labels = {
    idle: "Idle",
    rendering: "Rendering...",
    diffing: "Diffing...",
    committing: "Committing...",
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${styles[phase]} transition-colors duration-300`}>
      {labels[phase]}
    </span>
  );
}

function getPhaseDescription(phase: Phase) {
  switch (phase) {
    case "idle": return "Waiting for state change...";
    case "rendering": return "React calls your component function to create a new UI tree.";
    case "diffing": return "React compares the new tree with the old one to find what changed.";
    case "committing": return "React applies only the necessary changes to the real DOM.";
  }
}

// Visual Tree Component
function TreePanel({ title, count, highlightDiff, isOld, isActive }: { title: string, count: number, highlightDiff?: boolean, isOld?: boolean, isActive?: boolean }) {
  return (
    <div className={`
      flex flex-col items-center gap-4 p-4 rounded-xl border bg-card transition-all duration-500
      ${isActive ? "shadow-lg border-border" : "shadow-sm border-transparent opacity-50 grayscale"}
    `}>
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </span>

      <div className="flex flex-col gap-2 w-48 font-mono text-sm">
        {/* Node: CounterApp */}
        <Node label="CounterApp">
          {/* Node: Text */}
          <Node
            label="Text"
            hasChange={highlightDiff} // logic: Text's prop changed
          >
            {/* Leaf: Span */}
            <div className={`
               mt-2 px-3 py-1.5 rounded bg-background border text-xs flex items-center justify-between transition-all duration-300
               ${highlightDiff
                ? "border-primary text-primary-foreground bg-primary ring-2 ring-primary/20 scale-105"
                : "border-border text-foreground/80"}
             `}>
              <span>count:</span>
              <span className="font-bold">{count}</span>
            </div>
          </Node>
        </Node>
      </div>
    </div>
  );
}

// Recursive-ish Node
function Node({ label, children, hasChange }: { label: string, children: React.ReactNode, hasChange?: boolean }) {
  return (
    <div className={`
        relative px-3 py-2 rounded-lg border bg-secondary/30 transition-all duration-300
        ${hasChange ? "border-primary/50 bg-primary/5 shadow-[0_0_15px_-3px_var(--color-primary)] ring-1 ring-primary/20" : "border-border/60"}
    `}>
      <span className="text-[10px] text-muted-foreground block mb-1">{label}</span>
      <div className="pl-2 border-l border-border/40">
        {children}
      </div>
    </div>
  );
}
