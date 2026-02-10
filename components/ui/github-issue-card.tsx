import { Suspense } from "react"
import { cn } from "@/lib/utils"
import { MagicGitHubIssue } from "./magic-github-issue"

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("bg-primary/10 rounded-md animate-pulse", className)} {...props} />
  )
}

export const GitHubIssueSkeleton = ({
  className,
  ...props
}: {
  className?: string
  [key: string]: unknown
}) => (
  <div
    className={cn(
      "flex size-full max-h-max min-w-72 flex-col gap-2 rounded-xl border p-4",
      className
    )}
    {...props}
  >
    <div className="flex flex-row gap-2">
      <Skeleton className="size-10 shrink-0 rounded-full" />
      <Skeleton className="h-10 w-full" />
    </div>
    <Skeleton className="h-20 w-full" />
  </div>
)

export const GitHubIssueNotFound = ({
  className,
  ...props
}: {
  className?: string
  [key: string]: unknown
}) => (
  <div
    className={cn(
      "flex size-full flex-col items-center justify-center gap-2 rounded-lg border p-4",
      className
    )}
    {...props}
  >
    <h3>Issue not found</h3>
  </div>
)

export interface GitHubIssueData {
  owner: string
  repo: string
  number: number
  title: string
  body: string
  author: string
  authorAvatar?: string
  state: "open" | "closed"
  createdAt: string
  labels?: { name: string; color: string }[]
  commentCount?: number
}

async function fetchGitHubIssue(
  owner: string,
  repo: string,
  issueNumber: number
): Promise<GitHubIssueData | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          // Add token if you have rate limiting issues
          // Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    )

    if (!response.ok) {
      return null
    }

    const data = await response.json()

    return {
      owner,
      repo,
      number: data.number,
      title: data.title,
      body: data.body || "",
      author: data.user?.login || "unknown",
      authorAvatar: data.user?.avatar_url,
      state: data.state as "open" | "closed",
      createdAt: data.created_at,
      labels: data.labels?.map((l: { name: string; color: string }) => ({
        name: l.name,
        color: l.color,
      })),
      commentCount: data.comments,
    }
  } catch (error) {
    console.error("Failed to fetch GitHub issue:", error)
    return null
  }
}

export interface GitHubIssueCardProps {
  owner: string
  repo: string
  issueNumber: number
  className?: string
  /** Optional: Override the body text shown in the card */
  excerpt?: string
  /** Max characters to show from the body (default: 280) */
  maxBodyLength?: number
  fallback?: React.ReactNode
}

// Inner async component that does the actual fetching
async function GitHubIssueContent({
  owner,
  repo,
  issueNumber,
  className,
  excerpt,
  maxBodyLength = 280,
}: Omit<GitHubIssueCardProps, "fallback">) {
  const issue = await fetchGitHubIssue(owner, repo, issueNumber)

  if (!issue) {
    return <GitHubIssueNotFound className={className} />
  }

  return (
    <MagicGitHubIssue
      issue={issue}
      excerpt={excerpt}
      maxBodyLength={maxBodyLength}
      className={className}
    />
  )
}

/**
 * GitHubIssueCard with Streaming - renders skeleton immediately,
 * streams in the issue content without blocking the page
 * 
 * Usage:
 * <GitHubIssueCard 
 *   owner="facebook" 
 *   repo="react" 
 *   issueNumber={7942} 
 * />
 */
export function GitHubIssueCard({
  owner,
  repo,
  issueNumber,
  className,
  excerpt,
  maxBodyLength = 280,
  fallback = <GitHubIssueSkeleton />,
}: GitHubIssueCardProps) {
  return (
    <Suspense fallback={fallback}>
      <GitHubIssueContent
        owner={owner}
        repo={repo}
        issueNumber={issueNumber}
        className={className}
        excerpt={excerpt}
        maxBodyLength={maxBodyLength}
      />
    </Suspense>
  )
}
