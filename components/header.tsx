"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

function LiveClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
}

export function Header() {
  return (
    <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur z-50">
      <div className="px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          {/* Glassmorphism frame */}
          <div className="p-0.5 rounded-xl bg-linear-to-br from-white/20 to-white/5 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-background/50 border border-white/10">
              <Image
                src="https://github.com/sankalpaacharya.png"
                alt="Sanku"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <p className="font-semibold">Sanku</p>
            <p className="text-xs text-muted-foreground">
              <LiveClock />
            </p>
          </div>
        </Link>
        <nav className="flex items-center gap-6">
          <button className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm transition-colors flex items-center gap-2">
            Follow me
            <span>→</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
