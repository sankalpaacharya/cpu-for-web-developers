import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/mdx-data";

export async function GET() {
  const posts = await getAllPosts();

  return NextResponse.json(
    posts.map((post) => ({
      slug: post.slug,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      date: post.frontmatter.date,
      topic: post.frontmatter.topic,
    }))
  );
}
