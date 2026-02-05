"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import type { GitHubIssueData } from "./github-issue-card"

interface IconProps {
  className?: string
}

const GitHubIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const IssueOpenIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
  </svg>
)

const IssueClosedIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M11.28 6.78a.75.75 0 0 0-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l3.5-3.5Z" />
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0Z" />
  </svg>
)

const CommentIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z" />
  </svg>
)

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3).trim() + "..."
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function getContrastColor(hexColor: string): string {
  const hex = hexColor.replace("#", "")
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? "#000000" : "#ffffff"
}

const IssueHeader = ({ issue }: { issue: GitHubIssueData }) => (
  <div className="flex flex-row items-start justify-between tracking-normal">
    <div className="flex items-center space-x-3">
      <div className="relative z-20">
        <a
          href={`https://github.com/${issue.author}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            title={`Profile picture of ${issue.author}`}
            alt={issue.author}
            height={48}
            width={48}
            src={issue.authorAvatar}
            className="border-border/50 size-12 overflow-hidden rounded-full border"
          />
        </a>
      </div>
      <div className="flex flex-col gap-0.5">
        <a
          href={`https://github.com/${issue.author}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground relative z-20 flex items-center font-medium whitespace-nowrap transition-opacity hover:opacity-80"
        >
          {issue.author}
        </a>
        <div className="flex items-center space-x-1">
          <a
            href={`https://github.com/${issue.owner}/${issue.repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground relative z-20 text-sm transition-colors"
          >
            {issue.owner}/{issue.repo}
          </a>
          <span className="text-muted-foreground text-sm">•</span>
          <span className="text-muted-foreground text-sm">
            {formatDate(issue.createdAt)}
          </span>
        </div>
      </div>
    </div>
    <div className="relative z-20">
      <a
        href={`https://github.com/${issue.owner}/${issue.repo}/issues/${issue.number}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="sr-only">Link to issue</span>
        <GitHubIcon className="text-muted-foreground hover:text-foreground size-5 items-start transition-all ease-in-out hover:scale-105" />
      </a>
    </div>
  </div>
)

const IssueTitle = ({ issue }: { issue: GitHubIssueData }) => {
  const issueUrl = `https://github.com/${issue.owner}/${issue.repo}/issues/${issue.number}`

  return (
    <div className="flex items-start gap-2">
      {issue.state === "open" ? (
        <IssueOpenIcon className="mt-1 size-4 shrink-0 text-green-600 dark:text-green-500" />
      ) : (
        <IssueClosedIcon className="mt-1 size-4 shrink-0 text-purple-600 dark:text-purple-500" />
      )}
      <a
        href={issueUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground hover:text-primary text-[15px] font-semibold leading-snug transition-colors hover:underline"
      >
        {issue.title}
        <span className="text-muted-foreground ml-1.5 font-normal">
          #{issue.number}
        </span>
      </a>
    </div>
  )
}

const IssueBody = ({ text }: { text: string }) => (
  <div className="text-[15px] leading-relaxed tracking-normal">
    <span className="text-foreground/90 font-normal whitespace-pre-wrap">
      {text}
    </span>
  </div>
)

const IssueLabels = ({ labels }: { labels: { name: string; color: string }[] }) => {
  if (!labels || labels.length === 0) return null

  return (
    <div className="flex flex-wrap gap-1.5">
      {labels.slice(0, 4).map((label) => (
        <span
          key={label.name}
          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
          style={{
            backgroundColor: `#${label.color}20`,
            color: `#${label.color}`,
            border: `1px solid #${label.color}40`,
          }}
        >
          {label.name}
        </span>
      ))}
    </div>
  )
}

const IssueStats = ({ commentCount }: { commentCount?: number }) => {
  return (
    <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
      <div
        className={cn(
          "flex items-center gap-1.5 rounded-full px-2 py-1 transition-colors",
          "hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:text-blue-500"
        )}
      >
        <CommentIcon className="size-4" />
        {commentCount !== undefined && commentCount > 0 && (
          <span className="text-sm">{commentCount}</span>
        )}
      </div>
    </div>
  )
}

export interface MagicGitHubIssueProps {
  issue: GitHubIssueData
  className?: string
  excerpt?: string
  maxBodyLength?: number
}

export function MagicGitHubIssue({
  issue,
  className,
  excerpt,
  maxBodyLength = 280,
}: MagicGitHubIssueProps) {
  const bodyText = excerpt || issue.body
  const truncatedBody = truncateText(bodyText, maxBodyLength)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  useEffect(() => {
    if (!contentRef.current) return

    const checkOverflow = () => {
      if (contentRef.current) {
        setIsOverflowing(
          contentRef.current.scrollHeight > contentRef.current.clientHeight + 1
        )
      }
    }

    const observer = new ResizeObserver(checkOverflow)
    observer.observe(contentRef.current)

    checkOverflow()
    const timer = setTimeout(checkOverflow, 500)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [issue])

  return (
    <div
      className={cn(
        "not-prose group relative flex h-fit w-full max-w-lg flex-col overflow-hidden rounded-xl border transition-all hover:bg-muted/50",
        className
      )}
    >
      <div className="relative p-5">
        <div
          ref={contentRef}
          className={cn(
            "relative flex max-h-[400px] flex-col gap-4 overflow-hidden transition-all",
            isOverflowing &&
              "[mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]"
          )}
        >
          <IssueHeader issue={issue} />
          <IssueTitle issue={issue} />
          {truncatedBody && <IssueBody text={truncatedBody} />}
          <IssueLabels labels={issue.labels || []} />
          <IssueStats commentCount={issue.commentCount} />
        </div>
      </div>
    </div>
  )
}
