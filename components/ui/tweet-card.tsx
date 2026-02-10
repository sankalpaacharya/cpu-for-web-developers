import { Suspense } from "react"
import { type TweetProps } from "react-tweet"
import { getTweet } from "react-tweet/api"
import { unstable_cache } from "next/cache"

import { cn } from "@/lib/utils"
import { MagicTweet } from "./magic-tweet"

// Cache tweet fetches - persists across requests in dev and production
const getCachedTweet = unstable_cache(
  async (id: string) => getTweet(id),
  ["tweet-cache"],
  { revalidate: 3600 } // Cache for 1 hour
)

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("bg-primary/10 rounded-md animate-pulse", className)} {...props} />
  )
}

export const TweetSkeleton = ({
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

export const TweetNotFound = ({
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
    <h3>Tweet not found</h3>
  </div>
)

interface TweetCardProps {
  id?: string
  className?: string
  comments?: number
  reposts?: number
  likes?: number
  bookmarks?: number
  fallback?: React.ReactNode
  onError?: (error: Error) => void
  components?: TweetProps["components"]
}

// Inner async component that does the actual fetching
async function TweetContent({
  id,
  components,
  onError,
  comments,
  reposts,
  likes,
  bookmarks,
  className,
}: TweetCardProps) {
  const tweet = id
    ? await getCachedTweet(id).catch((err) => {
        if (onError) {
          onError(err)
        } else {
          console.error(err)
        }
        return undefined
      })
    : undefined

  if (!tweet) {
    const NotFound = components?.TweetNotFound || TweetNotFound
    return <NotFound className={className} />
  }

  return (
    <MagicTweet
      tweet={tweet}
      comments={comments}
      reposts={reposts}
      likes={likes}
      bookmarks={bookmarks}
      className={className}
    />
  )
}

/**
 * TweetCard with Streaming - renders skeleton immediately, 
 * streams in the tweet content without blocking the page
 */
export function TweetCard({
  id,
  components,
  fallback = <TweetSkeleton />,
  onError,
  comments,
  reposts,
  likes,
  bookmarks,
  className,
}: TweetCardProps) {
  return (
    <Suspense fallback={fallback}>
      <TweetContent
        id={id}
        components={components}
        onError={onError}
        comments={comments}
        reposts={reposts}
        likes={likes}
        bookmarks={bookmarks}
        className={className}
      />
    </Suspense>
  )
}
