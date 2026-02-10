import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { type CodeHikeConfig } from "codehike/mdx";
import premiumTheme from "./premium-theme.json";

// Code Hike configuration
export const chConfig: CodeHikeConfig = {
    components: { code: "Code" },
    syntaxHighlighting: {
        theme: premiumTheme as any,
    },
};

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

// Cache for frontmatter to avoid repeated file reads
const frontmatterCache = new Map<string, { data: PostFrontmatter; mtime: number }>();

export interface PostFrontmatter {
    title: string;
    description: string;
    date: string;
    topic: string;
    image: string;
    draft?: boolean;
}

export interface Post {
    slug: string;
    frontmatter: PostFrontmatter;
}

/**
 * Get all posts - uses gray-matter for fast frontmatter parsing
 * instead of full MDX compilation with CodeHike
 */
export function getAllPosts(): Post[] {
    const files = fs.readdirSync(CONTENT_DIR);

    const posts = files
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => {
            const slug = file.replace(/\.mdx$/, "");
            const filePath = path.join(CONTENT_DIR, file);
            const source = fs.readFileSync(filePath, "utf-8");

            // Use gray-matter for fast frontmatter parsing (no MDX compilation!)
            const { data } = matter(source);

            return {
                slug,
                frontmatter: data as PostFrontmatter,
            };
        });

    // Filter out drafts in production
    const filteredPosts = posts.filter((post) => {
        if (process.env.NODE_ENV === "production") {
            return !post.frontmatter.draft;
        }
        return true;
    });

    // Sort by date (newest first)
    return filteredPosts.sort((a, b) => {
        const dateA = new Date(a.frontmatter.date);
        const dateB = new Date(b.frontmatter.date);
        return dateB.getTime() - dateA.getTime();
    });
}

export function getAllPostSlugs(): string[] {
    const posts = getAllPosts();
    return posts.map((post) => post.slug);
}

/**
 * Get frontmatter only for a specific post - fast, no MDX compilation
 * Use this when you only need metadata (e.g., for OG images, metadata)
 * Includes in-memory caching with mtime checking for dev mode performance
 */
export function getPostFrontmatter(slug: string): Post | null {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
        return null;
    }

    // Check cache with mtime validation (for hot reload support in dev)
    const stats = fs.statSync(filePath);
    const mtime = stats.mtimeMs;
    const cached = frontmatterCache.get(slug);

    if (cached && cached.mtime === mtime) {
        return {
            slug,
            frontmatter: cached.data,
        };
    }

    const source = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(source);

    // Update cache
    frontmatterCache.set(slug, { data: data as PostFrontmatter, mtime });

    return {
        slug,
        frontmatter: data as PostFrontmatter,
    };
}

export function isScrollyPost(slug: string): boolean {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
        return false;
    }
    const source = fs.readFileSync(filePath, "utf-8");

    // Split frontmatter and content
    const parts = source.split('---');
    if (parts.length < 3) return false;

    const content = parts.slice(2).join('---').trim();

    // Only return true if the post is PURELY scrolly (starts with !!steps)
    // If it has mixed content (prose before scrolly), return false
    return content.startsWith('## !!steps');
}
