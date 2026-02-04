'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function ThreadBlockingDemo() {
  const [isRendering, setIsRendering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const startRendering = () => {
    setIsRendering(true);
    setProgress(0);
    
    const duration = 2000; // 2 seconds
    const interval = 50; // Update every 50ms
    const increment = (interval / duration) * 100;
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setIsRendering(false);
          return 100;
        }
        return next;
      });
    }, interval);
  };

  const handleClick = () => {
    setClickCount(prev => prev + 1);
  };

  const reset = () => {
    setClickCount(0);
    setProgress(0);
  };

  return (
    <Card className="p-6 my-8 border-2">
      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Rendering Progress</span>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isRendering ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
              <span className="text-xs text-muted-foreground">
                {isRendering ? 'Rendering...' : 'Ready'}
              </span>
            </div>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 items-center">
          <Button 
            onClick={startRendering}
            variant="outline"
            size="sm"
            className="gap-2"
            disabled={isRendering}
          >
            <span className="text-base">😰</span>
            Start Rendering (2s)
          </Button>
          
          <Button 
            onClick={handleClick}
            variant="outline"
            size="sm"
            className="gap-2"
            disabled={isRendering}
          >
            <span className="text-base">👆</span>
            Click Me!
          </Button>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md">
            <span className="text-sm font-medium">Clicks:</span>
            <span className="text-sm font-mono font-bold">{clickCount}</span>
          </div>

          <Button 
            onClick={reset}
            variant="ghost"
            size="sm"
          >
            Reset
          </Button>
        </div>

        {/* Instructions */}
        <div className="text-sm text-muted-foreground p-4 bg-muted/50 rounded-lg">
          <p>
            Click <strong>"Start Rendering"</strong> to simulate a 2-second rendering process. 
            The <strong>"Click Me!"</strong> button will be disabled until rendering completes.
          </p>
        </div>
      </div>
    </Card>
  );
}
