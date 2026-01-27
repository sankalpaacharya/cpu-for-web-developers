import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { remarkCodeHike, recmaCodeHike, type CodeHikeConfig } from "codehike/mdx";
import premiumTheme from "./premium-theme.json";

// Code Hike configuration
export const chConfig: CodeHikeConfig = {
    components: { code: "Code" },
    syntaxHighlighting: {
        theme: premiumTheme as any,
    },
};

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

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

export async function getAllPosts(): Promise<Post[]> {
    const files = fs.readdirSync(CONTENT_DIR);

    const posts = await Promise.all(
        files
            .filter((file) => file.endsWith(".mdx"))
            .map(async (file) => {
                const slug = file.replace(/\.mdx$/, "");
                const filePath = path.join(CONTENT_DIR, file);
                const source = fs.readFileSync(filePath, "utf-8");

                const { frontmatter } = await compileMDX<PostFrontmatter>({
                    source,
                    options: {
                        parseFrontmatter: true,
                        mdxOptions: {
                            remarkPlugins: [[remarkCodeHike, chConfig]],
                            recmaPlugins: [[recmaCodeHike, chConfig]],
                        },
                    },
                });

                return {
                    slug,
                    frontmatter,
                };
            })
    );

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

export async function getAllPostSlugs(): Promise<string[]> {
    const posts = await getAllPosts();
    return posts.map((post) => post.slug);
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
