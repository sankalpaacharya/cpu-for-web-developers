"use client"

import { useEffect, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { LibraryIcon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

interface TOCItem {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    // Extract headings from the article
    const article = document.querySelector("article")
    if (!article) return

    const headingElements = article.querySelectorAll("h1, h2, h3")
    const items: TOCItem[] = Array.from(headingElements)
      .map((heading) => {
        // Add IDs to headings if they don't have them
        if (!heading.id) {
          const id = heading.textContent
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "") || ""
          heading.id = id
        }

        return {
          id: heading.id,
          text: heading.textContent || "",
          level: parseInt(heading.tagName.substring(1)),
        }
      })
      .filter((item) => item.id && item.text)

    setHeadings(items)

    // Intersection Observer for active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-100px 0px -66%",
        threshold: 0,
      }
    )

    headingElements.forEach((heading) => observer.observe(heading))

    return () => observer.disconnect()
  }, [])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  if (headings.length === 0) return null

  return (
    <aside className="hidden xl:block absolute left-full top-0 ml-16 w-56 h-full">
      <div className="sticky top-32">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground/60 mb-4">
          <HugeiconsIcon icon={LibraryIcon} size={14} />
          <span>On This Page</span>
        </div>
        <nav className="space-y-2.5">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToHeading(heading.id)}
              className={cn(
                "block w-full text-left text-xs transition-colors duration-200",
                heading.level === 1 && "pl-0 font-medium",
                heading.level === 2 && "pl-0",
                heading.level === 3 && "pl-4",
                activeId === heading.id
                  ? "text-foreground font-medium"
                  : "text-muted-foreground/70 hover:text-foreground"
              )}
            >
              {heading.text}
            </button>
          ))}
        </nav>
        <a
          href="https://github.com/sankalpaacharya/inside-react"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center justify-center group"
          aria-label="Star on GitHub"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            className="transition-transform duration-200 group-hover:scale-110"
          >
            <path
              d="M12 2L14.9 8.6L22 9.3L16.8 14L18.2 21L12 17.4L5.8 21L7.2 14L2 9.3L9.1 8.6L12 2Z"
              fill="#facc15"
              stroke="#eab308"
              strokeWidth="0.5"
            />
            <circle cx="9.5" cy="10.5" r="1" fill="#1a1a2e" />
            <circle cx="14.5" cy="10.5" r="1" fill="#1a1a2e" />
            <path
              d="M9.5 13.5Q12 15.5 14.5 13.5"
              fill="none"
              stroke="#1a1a2e"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </svg>
        </a>
      </div>
    </aside>
  )
}
