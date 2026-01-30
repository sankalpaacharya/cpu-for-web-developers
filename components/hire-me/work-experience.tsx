import React from "react";
import Image from "next/image";

export function WorkExperience() {
    return (
        <section className="space-y-8">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider border-b border-border/40 pb-2">
                Work Experience
            </h2>
            <div className="space-y-6">
                {/* Nox */}
                <div className="flex items-start gap-4">
                    <div className="relative w-12 h-12 rounded-lg border border-border/40 bg-muted/10 overflow-hidden shrink-0">
                        <Image
                            src="/hire-me/nox.png"
                            alt="Nox"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-1 space-y-1">
                        <h3 className="font-medium text-foreground">Full Stack Engineer - Contractor</h3>
                        <p className="text-sm text-muted-foreground">Nox (OpenAI-backed)</p>
                        <p className="text-xs text-muted-foreground font-mono">
                            Mar. 2024 - Aug. 2024
                        </p>
                    </div>
                </div>

                {/* Unstuck */}
                <div className="flex items-start gap-4">
                    <div className="relative w-12 h-12 rounded-lg border border-border/40 bg-muted/10 overflow-hidden shrink-0">
                        <Image
                            src="/hire-me/unstuck.png"
                            alt="Unstuck"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-1 space-y-1">
                        <h3 className="font-medium text-foreground">Full Stack AI Developer- Contractor</h3>
                        <p className="text-sm text-muted-foreground">Unstuck</p>
                        <p className="text-xs text-muted-foreground font-mono">
                            Feb. 2024 - Mar. 2024
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
