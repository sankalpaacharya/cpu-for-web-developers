"use client";

import { useState, useEffect } from "react";

export function React15ReconciliationDemo() {
  const [inputValue, setInputValue] = useState("");
  const [isRendering, setIsRendering] = useState(false);
  const [callStack, setCallStack] = useState<string[]>([]);
  const [currentDepth, setCurrentDepth] = useState(0);
  const [queuedInput, setQueuedInput] = useState<string | null>(null);
  const [renderedValue, setRenderedValue] = useState("");

  const componentTree = [
    "App",
    "Header",
    "SearchBar", 
    "InputField",
    "ProductList",
    "ProductItem",
    "ProductDetails",
    "PriceTag"
  ];

  // Simulate recursive rendering through component tree
  useEffect(() => {
    if (!isRendering) return;

    if (currentDepth < componentTree.length) {
      const timer = setTimeout(() => {
        const component = componentTree[currentDepth];
        setCallStack((prev) => [...prev, `updateComponent(${component})`]);
        setCurrentDepth((d) => d + 1);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      // Rendering complete
      const timer = setTimeout(() => {
        setRenderedValue(inputValue);
        setCallStack([]);
        setCurrentDepth(0);
        setIsRendering(false);
        
        // Process queued input if any
        if (queuedInput !== null) {
          const nextInput = queuedInput;
          setQueuedInput(null);
          setTimeout(() => {
            setInputValue(nextInput);
            setIsRendering(true);
          }, 300);
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isRendering, currentDepth]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (isRendering) {
      // Already rendering - queue this input
      setQueuedInput(newValue);
    } else {
      setInputValue(newValue);
      setIsRendering(true);
    }
  };

  return (
    <div className="not-prose my-10">
      <div className="border-2 border-border/60 rounded-2xl p-6 bg-transparent">
        {/* Input Section */}
        <div className="flex flex-col gap-3 mb-6 pb-6 border-b border-border/40">
          <div className="text-xs font-medium text-muted-foreground">User Input</div>
          <input
            type="text"
            value={queuedInput !== null ? queuedInput : inputValue}
            onChange={handleInputChange}
            placeholder="Type something..."
            className="px-4 py-2 border border-border rounded-lg bg-background font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Rendered:</span>
            <span className="font-mono text-sm">{renderedValue || "(nothing yet)"}</span>
          </div>
          {queuedInput !== null && (
            <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">
              ⚠️ Input queued: "{queuedInput}" (waiting for render to finish)
            </div>
          )}
        </div>

        {/* Visualization */}
        <div className="flex gap-6">
          {/* Component Tree */}
          <div className="flex-1">
            <div className="text-xs font-medium text-muted-foreground mb-3">Component Tree</div>
            <div className="space-y-1">
              {componentTree.map((component, idx) => (
                <div
                  key={idx}
                  style={{ paddingLeft: `${idx * 12}px` }}
                  className={`px-3 py-2 text-sm font-mono rounded-lg border transition-all duration-300 ${
                    idx < currentDepth
                      ? 'bg-sky-500/20 border-sky-500/40 text-sky-700 dark:text-sky-300'
                      : idx === currentDepth
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-700 dark:text-amber-300 animate-pulse'
                      : 'bg-muted/20 border-border/30 text-muted-foreground/50'
                  }`}
                >
                  {component}
                </div>
              ))}
            </div>
          </div>

          {/* Call Stack */}
          <div className="flex-1">
            <div className="text-xs font-medium text-muted-foreground mb-3">
              Call Stack {callStack.length > 0 && `(${callStack.length})`}
            </div>
            <div className="h-[320px] p-3 border border-border/40 rounded-xl bg-muted/20 overflow-y-auto">
              <div className="flex flex-col-reverse gap-1">
                {callStack.map((call, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2 text-xs font-mono bg-rose-500/15 border border-rose-500/30 rounded-lg text-rose-700 dark:text-rose-300"
                  >
                    {call}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mt-6 pt-4 border-t border-border/40">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isRendering ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
              <span className="text-muted-foreground">
                {isRendering ? `Rendering... (${currentDepth}/${componentTree.length})` : 'Idle'}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {isRendering && "⏸️ Can't interrupt - stuck in recursion"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
