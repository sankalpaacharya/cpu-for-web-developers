import { ImageResponse } from "next/og";
import { getPostFrontmatter } from "@/lib/mdx-data";

export const runtime = "nodejs";
export const alt = "Blog Post";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default async function Image({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getPostFrontmatter(slug);

    if (!post) {
        return new ImageResponse(
            (
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#0a0a0a",
                        color: "#fff",
                    }}
                >
                    <div style={{ fontSize: 60, fontWeight: 700 }}>Post Not Found</div>
                </div>
            ),
            { ...size }
        );
    }

    const title = post.frontmatter.title;
    const description = post.frontmatter.description;
    const topic = post.frontmatter.topic;

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    padding: "60px 80px",
                    backgroundColor: "#0a0a0a",
                    backgroundImage:
                        "radial-gradient(circle at 25px 25px, #1a1a1a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1a1a1a 2%, transparent 0%)",
                    backgroundSize: "100px 100px",
                }}
            >
                {/* Top section with topic badge */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "40px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "8px 20px",
                            backgroundColor: "rgba(232, 168, 124, 0.15)",
                            borderRadius: "100px",
                            border: "1px solid rgba(232, 168, 124, 0.3)",
                        }}
                    >
                        <span
                            style={{
                                color: "#e8a87c",
                                fontSize: 20,
                                fontWeight: 500,
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                            }}
                        >
                            {topic}
                        </span>
                    </div>
                </div>

                {/* Title */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        justifyContent: "center",
                    }}
                >
                    <h1
                        style={{
                            fontSize: title.length > 50 ? 52 : 64,
                            fontWeight: 700,
                            color: "#ffffff",
                            lineHeight: 1.2,
                            margin: 0,
                            marginBottom: "24px",
                            fontStyle: "italic",
                        }}
                    >
                        {title}
                    </h1>

                    {/* Description */}
                    <p
                        style={{
                            fontSize: 26,
                            color: "rgba(255, 255, 255, 0.6)",
                            lineHeight: 1.5,
                            margin: 0,
                            maxWidth: "900px",
                        }}
                    >
                        {description.length > 150
                            ? description.substring(0, 150) + "..."
                            : description}
                    </p>
                </div>

                {/* Bottom section - Author/Brand */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "40px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}
                    >
                        {/* Author avatar placeholder */}
                        <div
                            style={{
                                width: "56px",
                                height: "56px",
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #e8a87c 0%, #c4785c 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <span
                                style={{
                                    color: "#0a0a0a",
                                    fontSize: 24,
                                    fontWeight: 700,
                                }}
                            >
                                S
                            </span>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <span
                                style={{
                                    color: "#ffffff",
                                    fontSize: 22,
                                    fontWeight: 600,
                                }}
                            >
                                Sanku
                            </span>
                            <span
                                style={{
                                    color: "rgba(255, 255, 255, 0.5)",
                                    fontSize: 16,
                                }}
                            >
                                sanku.blog
                            </span>
                        </div>
                    </div>

                    {/* Decorative element */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                        }}
                    >
                        <div
                            style={{
                                width: "60px",
                                height: "4px",
                                backgroundColor: "#e8a87c",
                                borderRadius: "2px",
                            }}
                        />
                        <div
                            style={{
                                width: "20px",
                                height: "4px",
                                backgroundColor: "rgba(232, 168, 124, 0.5)",
                                borderRadius: "2px",
                            }}
                        />
                        <div
                            style={{
                                width: "8px",
                                height: "4px",
                                backgroundColor: "rgba(232, 168, 124, 0.3)",
                                borderRadius: "2px",
                            }}
                        />
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
