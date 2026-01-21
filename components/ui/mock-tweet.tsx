"use client";

import { cn } from "@/lib/utils";

interface MockTweetProps {
  name: string;
  username: string;
  avatar?: string;
  content: string;
  date?: string;
  className?: string;
}

const Twitter = ({ className }: { className?: string }) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g>
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"></path>
    </g>
  </svg>
);

export const MockTweet = ({
  name,
  username,
  avatar,
  content,
  date = "2013",
  className,
}: MockTweetProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={cn(
        "relative flex h-fit w-full max-w-lg flex-col gap-4 overflow-hidden rounded-xl border p-5 bg-card",
        className,
      )}
    >
      {/* Header */}
      <div className="flex flex-row items-start justify-between tracking-normal">
        <div className="flex items-center space-x-3">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="size-12 rounded-full border border-border/50 object-cover"
            />
          ) : (
            <div className="flex size-12 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-white font-semibold text-sm">
              {initials}
            </div>
          )}
          <div className="flex flex-col gap-0.5">
            <span className="text-foreground font-medium">{name}</span>
            <span className="text-muted-foreground text-sm">@{username}</span>
          </div>
        </div>
        <Twitter className="text-muted-foreground hover:text-foreground size-5 transition-all" />
      </div>

      {/* Content */}
      <div className="text-[15px] leading-relaxed text-foreground">
        {content}
      </div>

      {/* Footer */}
      <div className="text-muted-foreground text-sm">{date}</div>
    </div>
  );
};
