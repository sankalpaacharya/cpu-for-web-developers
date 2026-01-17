import fs from "fs";
import path from "path";
import React from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import { remarkCodeHike, recmaCodeHike, type CodeHikeConfig } from "codehike/mdx";
import { MockTweet } from "@/components/ui/mock-tweet";
import { TweetGroup } from "@/components/ui/tweet-group";
import { CodeSandbox } from "@/components/ui/codesandbox";
import { Code } from "@/components/ui/code";
import { Scrollycoding } from "@/components/ui/scrollycoding";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserGroupIcon, CheckmarkBadge01Icon, NoteIcon } from "@hugeicons/core-free-icons";

// Code Hike configuration
const chConfig: CodeHikeConfig = {
  components: { code: "Code" },
  syntaxHighlighting: {
    theme: "github-dark",
  },
};

const UserGroup = (props: any) => React.createElement(HugeiconsIcon, { icon: UserGroupIcon, ...props });
const CheckmarkBadge = (props: any) => React.createElement(HugeiconsIcon, { icon: CheckmarkBadge01Icon, ...props });
const Note = (props: any) => React.createElement(HugeiconsIcon, { icon: NoteIcon, ...props });

const mdxComponents = {
  MockTweet,
  TweetGroup,
  CodeSandbox,
  Code,
  Scrollycoding,
  HugeiconsIcon,
  UserGroup,
  CheckmarkBadge,
  Note,
};

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  topic: string;
  image: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
}

export interface PostWithContent extends Post {
  content: React.ReactElement;
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

  // Sort by date (newest first)
  return posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });
}

export async function getPostBySlug(slug: string): Promise<PostWithContent | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  let source = fs.readFileSync(filePath, "utf-8");
  
  // Auto-wrap content in Scrollycoding if it contains !!steps blocks
  // This allows MDX files to just use !!steps syntax without explicit wrapper
  if (source.includes('## !!steps') && !source.includes('<Scrollycoding>')) {
    // Split frontmatter and content
    const parts = source.split('---');
    if (parts.length >= 3) {
      const frontmatter = parts[1];
      const content = parts.slice(2).join('---');
      source = `---${frontmatter}---\n\n<Scrollycoding>\n${content}\n</Scrollycoding>`;
    }
  }

  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source,
    components: mdxComponents,
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
    content,
  };
}

export function getAllPostSlugs(): string[] {
  const files = fs.readdirSync(CONTENT_DIR);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
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
