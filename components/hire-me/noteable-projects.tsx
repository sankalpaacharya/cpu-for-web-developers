import React from "react";
import Link from "next/link";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import portfolioImage from "../../public/hire-me/portfolio.png";

export function NoteableProjects() {
    return (
        <section className="space-y-8">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider border-b border-border/40 pb-2">
                Noteable Projects
            </h2>

            <div className="space-y-12">

                {/* Portfolio (New) */}
                <div className="group grid md:grid-cols-[30%_1fr] gap-8 items-start">
                    <div className="relative aspect-video w-full rounded border border-border/40 bg-muted/20 overflow-hidden">
                        <HeroVideoDialog
                            animationStyle="from-center"
                            videoSrc="https://www.youtube.com/embed/jQKMsxR0GjU?si=dDqVuAWRqhhW-ruB"
                            thumbnailSrc={portfolioImage.src}
                            thumbnailAlt="Portfolio Website"
                            className="w-full h-full"
                        />
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-foreground">Portfolio</h3>
                            <div className="flex gap-4 text-sm shrink-0">
                                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                                    Live <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} />
                                </Link>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            I'm using hyprland so thought to make a portfolio like my linux setup, if you want to make a portfolio like mine you can find the component in the chatcn.me
                        </p>
                    </div>
                </div>

                {/* ChatCN */}
                <div className="group grid md:grid-cols-[30%_1fr] gap-8 items-start">
                    <div className="relative aspect-video w-full rounded border border-border/40 bg-muted/20 overflow-hidden">
                        <HeroVideoDialog
                            animationStyle="from-center"
                            videoSrc="https://www.youtube.com/embed/jM4u1MMhqJM?si=Ar21lzq00UokusSD"
                            thumbnailSrc="https://www.sankalpa.info.np/images/chatcn.png"
                            thumbnailAlt="ChatCN Interface"
                            className="w-full h-full"
                        />
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-foreground">ChatCN</h3>
                            <div className="flex gap-4 text-sm shrink-0">
                                <Link href="https://chatcn.me" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                                    chatcn.me <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} />
                                </Link>
                                <Link href="https://github.com/sankalpaacharya/chatcn" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Source
                                </Link>
                            </div>
                        </div>
                        <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                            <p>
                                chatcn is a collection of React components. When I was working on bloomi.live, I had to build a calendar-like heatmap.
                            </p>
                            <p>
                                Shadcn didn’t have the component I needed, so I built one for my app. After finishing the component, I thought, why not make it shareable?
                            </p>
                            <p>
                                Since then, I’ve been adding more components that I use in my applications and feel might be useful for others too.
                            </p>
                        </div>
                    </div>
                </div>

                {/* WeRide */}
                <div className="group grid md:grid-cols-[30%_1fr] gap-8 items-start">
                    <div className="relative aspect-video w-full rounded border border-border/40 bg-muted/20 overflow-hidden">
                        <HeroVideoDialog
                            animationStyle="from-center"
                            videoSrc="https://www.youtube.com/embed/f2gtGsR3yHo?si=f0LOQQhvIqpUr36h"
                            thumbnailSrc="https://www.sankalpa.info.np/images/weride.png"
                            thumbnailAlt="WeRide Platform"
                            className="w-full h-full"
                        />
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-foreground">WeRide</h3>
                            <div className="flex gap-4 text-sm shrink-0 items-center">
                                <span className="text-xs font-mono text-muted-foreground/60">AUG 2024 - MAY 2025</span>
                                <Link href="https://weride-ruddy.vercel.app" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                                    Live <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} />
                                </Link>
                                <Link href="https://github.com/sankalpaacharya/weride" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Source
                                </Link>
                            </div>
                        </div>
                        <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                            <p>
                                Started this project thinking about myself, in our hostel many people own scooters, and most of the time they’re just sitting there collecting dust in the parking lot. Whenever I wanted to go out, I always had to hustle for an autorickshaw or Uber, and none of my close friends had a vehicle I could borrow.
                            </p>
                            <p>
                                One day, on my way back from groceries, I got an idea why not make a platform where people can list their vehicles and let others rent them? Owners earn money, renters get cheap and comfortable transportation.
                            </p>
                            <p>
                                So I invited two of my friends and led a small team to build the platform. We worked on it for almost 9 months and finally launched it! People really liked the idea, and it started doing great within the hostel. Within a few weeks of launch, we were already having regular rides.
                            </p>
                            <p>
                                We completed <strong>45+ rides</strong> before shutting it down since managing it legally was tough for us. Coding, marketing, convincing people, rushing to deliver vehicle keys everything was super fun to work on!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bloomi */}
                <div className="group grid md:grid-cols-[30%_1fr] gap-8 items-start">
                    <div className="relative aspect-video w-full rounded border border-border/40 bg-muted/20 overflow-hidden">
                        <HeroVideoDialog
                            animationStyle="from-center"
                            videoSrc="https://www.youtube.com/embed/SuxJXAgvEAo?si=cPMFJA3V9EP6TVXH"
                            thumbnailSrc="https://www.sankalpa.info.np/images/bloomiapp.png"
                            thumbnailAlt="Bloomi Interface"
                            className="w-full h-full"
                        />
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-foreground">Bloomi</h3>
                            <div className="flex gap-4 text-sm shrink-0">
                                <Link href="https://bloomi.live" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                                    bloomi.live <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} />
                                </Link>
                                <Link href="https://github.com/sankalpaacharya/bloomi" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Source
                                </Link>
                            </div>
                        </div>
                        <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                            <p>
                                As a college student living in a hostel, managing expenses is really crucial to make sure you're not overspending on pizzas 🍕. My friends and I always debate about who spends more money on junk food. We keep promising to hit the gym regularly and stay away from junk, but those promises never last.
                            </p>
                            <p>
                                I wanted to make expense tracking more fun and social, something where you can track your spending with friends with leaderboard and ofc without having to manually fill every field.
                            </p>
                            <p>
                                That's why I started building Bloomi because apps like YNAB or other money managers aren't UI-friendly, and their UX didn't match how I wanted to use an expense tracker. I needed a simple expense tracker where you can capture an image and instantly add an expense.
                            </p>
                            <p>
                                I spent free time of my summer vacation working on this. I'm not actively working on Bloomi at the moment, but I'll definitely be adding more features in the future.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
