"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  topic: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredPosts = posts;

  return (
    <>
      {/* Banner */}
      <motion.div
        className="relative w-full h-48 md:h-64 overflow-hidden"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="/image.png"
          alt="Blog Banner"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
      </motion.div>

      <main className="max-w-2xl mx-auto px-6 py-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {loading ? (
            <p className="text-muted-foreground font-mono text-xs text-center mt-12">
              LOADING...
            </p>
          ) : filteredPosts.length === 0 ? (
            <p className="text-muted-foreground font-mono text-xs text-center mt-12">
              EMPTY
            </p>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key="all"
                className="space-y-2"
                variants={container}
                initial="hidden"
                animate="show"
              >
                <div className="flex items-end justify-between mb-8 border-b border-border/60 pb-2">
                  <h1 className="text-2xl font-serif italic text-foreground/90">
                    Contents
                  </h1>
                  <span className="font-mono text-[10px] text-muted-foreground mb-1">
                    VOL. {filteredPosts.length.toString().padStart(2, "0")}
                  </span>
                </div>

                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    variants={item}
                    layout
                    initial="collapsed"
                    whileHover="expanded"
                    className="group"
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block w-full hover:opacity-100 opacity-80 transition-opacity"
                    >
                      {/* TOC Row */}
                      <div className="flex items-baseline gap-3 py-3">
                        <span className="shrink-0 font-mono text-xs text-muted-foreground w-6">
                          {(index + 1).toString().padStart(2, "0")}.
                        </span>

                        <h2 className="shrink-0 font-serif text-lg md:text-xl font-medium text-foreground italic transition-all">
                          {post.title}
                        </h2>

                        {/* Dotted Leader */}
                        <span className="grow border-b border-dotted border-muted-foreground/30 mx-2" />

                        <span className="shrink-0 font-mono text-xs text-muted-foreground">
                          {post.date}
                        </span>
                      </div>

                      {/* Hidden Details */}
                      <motion.div
                        variants={{
                          collapsed: { height: 0, opacity: 0, marginTop: 0 },
                          expanded: {
                            height: "auto",
                            opacity: 1,
                            marginTop: 4,
                          },
                        }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col md:flex-row md:justify-between pl-9 pr-0 md:pr-14 pb-4 gap-4">
                          <p className="text-sm text-muted-foreground/80 max-w-lg leading-relaxed font-serif italic">
                            {post.description}
                          </p>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60 shrink-0 pt-1">
                            {post.topic}
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </motion.section>
      </main>
    </>
  );
}
