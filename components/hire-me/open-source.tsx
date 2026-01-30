import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight01Icon, GithubIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import gaiaImage from "../../public/hire-me/gaia.webp";

export function OpenSource() {
    return (
        <section className="space-y-8">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider border-b border-border/40 pb-2">
                Open Source
            </h2>
            <div className="space-y-12">
                {/* Gaia */}
                <div className="group grid md:grid-cols-[30%_1fr] gap-8 items-start">
                    <div className="relative aspect-video w-full rounded border border-border/40 bg-muted/20 overflow-hidden">
                        <Image
                            src={gaiaImage}
                            alt="Gaia App"
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-foreground">Gaia</h3>
                            <div className="flex gap-4 text-sm shrink-0">
                                <Link href="https://github.com/theexperiencecompany/gaia/" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                                    Repo <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} />
                                </Link>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            An open-source mobile application built with React Native. I am actively contributing to the mobile ecosystem, working on cross-platform compatibility and native performance optimizations.
                        </p>
                    </div>
                </div>

                {/* Stage (PR Rows with Icons) */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium text-foreground">Stage</h3>
                        <Link href="https://github.com/KartikLabhshetwar/stage" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                            <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} />
                        </Link>
                    </div>
                    <div className="space-y-2">
                        <Link
                            href="https://github.com/KartikLabhshetwar/stage/pull/29"
                            target="_blank"
                            className="flex items-center_gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono truncate group"
                        >
                            <HugeiconsIcon icon={GithubIcon} size={14} className="opacity-70 group-hover:opacity-100" />
                            <span>feat: add konva transformer to transform images and text #29</span>
                        </Link>
                        <Link
                            href="https://github.com/KartikLabhshetwar/stage/pull/31"
                            target="_blank"
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono truncate group"
                        >
                            <HugeiconsIcon icon={GithubIcon} size={14} className="opacity-70 group-hover:opacity-100" />
                            <span>Fix: 3d presperctive image export #31</span>
                        </Link>
                    </div>
                </div>

                {/* Astro Docs */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium text-foreground">Astro Docs</h3>
                        <Link href="https://github.com/withastro/docs" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                            <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} />
                        </Link>
                    </div>
                    <div className="space-y-2">
                        <Link
                            href="https://github.com/withastro/docs/pull/12492"
                            target="_blank"
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono truncate group"
                        >
                            <HugeiconsIcon icon={GithubIcon} size={14} className="opacity-70 group-hover:opacity-100" />
                            <span>feat: replace Tabs with PackageManagerTabs across pages [i18nIgnore] #12492</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
