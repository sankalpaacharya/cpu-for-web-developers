"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function EventLoopDemo() {
  const [callStack, setCallStack] = useState<string[]>([]);
  const [macroQueue, setMacroQueue] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const processTask = () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setCallStack(["task()"]);

    setTimeout(() => {
      setCallStack([]);
      setIsProcessing(false);
      
      // Event loop: move from queue to stack if stack is empty
      setTimeout(() => {
        if (macroQueue.length > 0) {
          const [next, ...rest] = macroQueue;
          setMacroQueue(rest);
          setCallStack([next]);
          
          setTimeout(() => {
            setCallStack([]);
          }, 800);
        }
      }, 100);
    }, 1500);
  };

  const handleClick = () => {
    setMacroQueue((prev) => [...prev, "onClick()"]);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={processTask} disabled={isProcessing} variant="outline">
          Process Task
        </Button>
        <Button onClick={handleClick} variant="outline">
          Click Me
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">Call Stack</div>
          <div className="border rounded-md min-h-[120px] p-3">
            {callStack.length === 0 ? (
              <div className="text-sm text-muted-foreground italic">empty</div>
            ) : (
              <div className="space-y-1">
                {callStack.map((task, i) => (
                  <div
                    key={i}
                    className="bg-primary/10 border border-primary/20 rounded px-3 py-2 text-sm font-mono"
                  >
                    {task}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">Macro Queue</div>
          <div className="border rounded-md min-h-[120px] p-3">
            {macroQueue.length === 0 ? (
              <div className="text-sm text-muted-foreground italic">empty</div>
            ) : (
              <div className="space-y-1">
                {macroQueue.map((task, i) => (
                  <div
                    key={i}
                    className="bg-secondary border rounded px-3 py-2 text-sm font-mono"
                  >
                    {task}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
