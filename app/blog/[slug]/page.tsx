import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/mdx";
import { getAllPostSlugs, isScrollyPost, getPostFrontmatter } from "@/lib/mdx-data";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { TableOfContents } from "@/components/blog/table-of-contents";

export function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Use fast frontmatter parsing (gray-matter) instead of full MDX compilation
  const post = getPostFrontmatter(slug);
  if (!post) return {};

  const title = `${post.frontmatter.title} | Sanku's Blog`;
  const description = post.frontmatter.description;
  const url = `https://sanku.blog/blog/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title: post.frontmatter.title,
      description,
      url,
      siteName: "Sanku's Blog",
      type: "article",
      publishedTime: post.frontmatter.date,
      authors: ["Sanku"],
      tags: [post.frontmatter.topic],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description,
      creator: "@sanku",
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const isScrolly = isScrollyPost(slug);

  const articleClass = isScrolly
    ? "prose prose-invert max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-strong:font-medium prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-a:text-primary prose-a:underline hover:prose-a:text-primary/80"
    : "prose prose-invert max-w-none pb-8 prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-foreground prose-h1:text-[1.875rem] prose-h1:mt-16 prose-h1:mb-8 prose-h2:text-[1.375rem] prose-h2:mt-14 prose-h2:mb-6 prose-h3:text-lg prose-h3:mt-10 prose-h3:mb-4 prose-p:text-[1.0625rem] prose-p:text-foreground/90 prose-p:leading-[1.9] prose-p:my-7 prose-strong:text-foreground prose-strong:font-medium prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-a:text-[#e8a87c] prose-a:no-underline hover:prose-a:underline prose-a:transition-colors prose-li:text-[1.0625rem] prose-li:text-foreground/90 prose-li:my-3 prose-li:leading-[1.8] prose-ul:my-7 prose-ol:my-7 prose-blockquote:border-l-[#e8a87c] prose-blockquote:text-foreground/70 prose-blockquote:italic prose-blockquote:pl-6 prose-blockquote:my-8 prose-pre:p-0 prose-pre:m-0 prose-pre:bg-transparent prose-pre:my-8 prose-img:my-10 prose-img:rounded-lg prose-hr:my-16 prose-hr:border-muted-foreground/15";

  return (
    <main className="min-h-screen relative">
      {/* Header for normal blog posts */}
      {!isScrolly && (
        <div className="max-w-2xl mx-auto px-6">
          <header className="pt-16 pb-8">
            {/* Back button */}
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 group"
            >
              <HugeiconsIcon
                icon={ArrowLeft01Icon}
                size={18}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
              <span>Back</span>
            </a>

            {/* Meta info - subtle and refined */}
            <div className="flex items-center gap-3 mb-6 text-xs text-muted-foreground/60 uppercase tracking-[0.15em]">
              <span>{post.frontmatter.topic}</span>
              <span className="text-muted-foreground/30">·</span>
              <span>
                {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Title - clean, readable */}
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-6 leading-[1.3] italic">
              {post.frontmatter.title}
            </h1>

            {/* Description - subtle, refined */}
            <p className="text-base text-foreground/60 leading-relaxed max-w-xl">
              {post.frontmatter.description}
            </p>

            {/* Elegant separator */}
            <div className="mt-12 w-16 h-px bg-muted-foreground/20" />
          </header>
        </div>
      )}

      {/* Content wrapper with TOC */}
      {!isScrolly ? (
        <div className="relative max-w-2xl mx-auto px-6">
          {/* MDX Content */}
          <article className={articleClass}>{post.content}</article>

          {/* Table of Contents - positioned to the right of content */}
          <TableOfContents />
        </div>
      ) : (
        <div className="relative">
          <article className={articleClass}>{post.content}</article>
        </div>
      )}
    </main>
  );
}
