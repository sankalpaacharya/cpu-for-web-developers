import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs, isScrollyPost } from "@/lib/mdx";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.frontmatter.title} | Sanku's Blog`,
    description: post.frontmatter.description,
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

  // For scrolly posts, use full-width layout
  // For normal posts, use centered constrained layout with proper padding
  const articleClass = isScrolly
     ? "prose prose-invert max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-strong:font-medium prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-a:text-primary prose-a:underline hover:prose-a:text-primary/80"
     : "prose prose-invert max-w-2xl mx-auto px-6 py-10 prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-foreground prose-h2:text-lg prose-h2:mt-8 prose-h2:mb-3 prose-h3:text-base prose-p:text-base prose-p:text-muted-foreground prose-p:leading-[1.8] prose-p:my-4 prose-strong:text-foreground prose-strong:font-medium prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-a:text-primary prose-a:underline hover:prose-a:text-primary/80 prose-li:text-base prose-li:text-muted-foreground prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-pre:bg-muted prose-pre:rounded-lg";

  return (
    <main className="min-h-screen">
      {/* Header for normal blog posts */}
      {!isScrolly && (
        <header className="max-w-2xl mx-auto px-6 pt-16 pb-12">
          {/* Back button */}
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              size={18}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            <span>Back</span>
          </a>

          {/* Meta info - subtle and refined */}
          <div className="flex items-center gap-2 mb-6 text-[11px] text-muted-foreground/60 uppercase tracking-[0.2em]">
            <span>{post.frontmatter.topic}</span>
            <span className="text-muted-foreground/30">—</span>
            <span>
              {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Title - italic, elegant serif feel */}
          <h1
            className="text-3xl italic font-light tracking-tight text-foreground mb-5 leading-tight"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            {post.frontmatter.title}
          </h1>

          {/* Description - subtle, refined */}
          <p className="text-sm text-muted-foreground/80 leading-relaxed tracking-wide">
            {post.frontmatter.description}
          </p>

          {/* Subtle separator */}
          <div className="mt-10 w-8 h-px bg-muted-foreground/20" />
        </header>
      )}

      {/* MDX Content */}
      <article className={articleClass}>{post.content}</article>
    </main>
  );
}
