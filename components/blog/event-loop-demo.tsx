"use client";

import { useState, useEffect } from "react";

export function EventLoopDemo() {
  const [count, setCount] = useState(0);
  const [callStack, setCallStack] = useState<string[]>(["task()", "task()", "task()"]);
  const [macroQueue, setMacroQueue] = useState<string[]>(["onClick()", "onClick()", "onClick()"]);
  const [isRunning, setIsRunning] = useState(false);

  // Auto-process call stack when running
  useEffect(() => {
    if (!isRunning || callStack.length === 0) return;
    
    const timer = setTimeout(() => {
      setCallStack((prev) => prev.slice(0, -1));
    }, 700);
    return () => clearTimeout(timer);
  }, [isRunning, callStack]);

  // Event loop: transfer from queue to stack when stack is empty
  useEffect(() => {
    if (!isRunning || callStack.length > 0 || macroQueue.length === 0) return;
    
    const timer = setTimeout(() => {
      const [first, ...rest] = macroQueue;
      setMacroQueue(rest);
      setCallStack([first]);
      if (first.startsWith("onClick")) {
        setCount((c) => c + 1);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [isRunning, callStack.length, macroQueue]);

  const handleClick = () => {
    if (macroQueue.length >= 3) return;
    setMacroQueue((prev) => [...prev, `onClick()`]);
  };

  return (
    <div className="not-prose my-10">
      <div className="border-2 border-border/60 rounded-2xl p-6 bg-transparent">
        {/* Top: Counter and Click Button */}
        <div className="flex flex-col items-center gap-3 mb-8 pb-6 border-b border-border/40">
          <div className="text-xl font-mono">count: {count}</div>
          <button 
            onClick={handleClick} 
            disabled={macroQueue.length >= 3}
            className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-amber-950 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Click me
          </button>
        </div>

        {/* Bottom: Call Stack - Event Loop - Macro Queue */}
        <div className="flex items-start gap-6">
          {/* Call Stack */}
          <div className="flex-1">
            <div className="text-xs font-medium text-muted-foreground mb-2">Call Stack</div>
            <div className="flex flex-col gap-2 h-[160px] p-3 border border-border/40 rounded-xl bg-muted/20 overflow-hidden">
              {callStack.map((task, i) => (
                <div
                  key={`s-${i}`}
                  className="px-3 py-2 text-sm font-mono bg-sky-500/15 border border-sky-500/30 rounded-lg text-center text-sky-700 dark:text-sky-300"
                >
                  {task}
                </div>
              ))}
            </div>
          </div>

          {/* Event Loop */}
          <div className="flex flex-col items-center gap-2 pt-6">
            <div className="text-xs font-medium text-muted-foreground">Event Loop</div>
            <div 
              className="w-10 h-10 flex items-center justify-center border border-border/40 rounded-xl bg-muted/20"
              style={{
                transition: 'transform 0.5s ease-in-out',
                transform: callStack.length === 0 && macroQueue.length > 0 ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground">
                <path d="M12 4L18 10L12 16" />
                <path d="M18 10H2" />
              </svg>
            </div>
          </div>

          {/* Macro Queue */}
          <div className="flex-1">
            <div className="text-xs font-medium text-muted-foreground mb-2">Macro Queue</div>
            <div className="flex flex-col gap-2 h-[160px] p-3 border border-border/40 rounded-xl bg-muted/20 overflow-hidden">
              {macroQueue.map((task, i) => (
                <div
                  key={`q-${i}`}
                  className="px-3 py-2 text-sm font-mono bg-fuchsia-500/15 border border-fuchsia-500/30 rounded-lg text-center text-fuchsia-700 dark:text-fuchsia-300"
                >
                  {task}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Start/Pause Button */}
        <div className="flex justify-center mt-6">
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
              isRunning 
                ? 'bg-rose-500/15 border border-rose-500/30 text-rose-700 dark:text-rose-300 hover:bg-rose-500/25' 
                : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25'
            }`}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
        </div>
      </div>
    </div>
  );
}
