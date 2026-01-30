import React from "react";
import Link from "next/link";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function SecurityFindings() {
    return (
        <section className="space-y-8">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider border-b border-border/40 pb-2">
                Security Findings
            </h2>
            <div className="grid gap-6">
                <Link
                    href="https://blog.sankalpa.info.np/blog/testing-cookies-worth-500"
                    target="_blank"
                    className="group block p-5 rounded border border-border/40 bg-muted/10 hover:bg-muted/20 transition-colors"
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                            sso.agora.io <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                        <span className="text-sm font-mono text-emerald-500">$500 Reward</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Discovered a critical Broken Access Control vulnerability. I demonstrated how manipulating cookie parameters allowed for full account takeover without valid credentials.
                    </p>
                </Link>

                <Link
                    href="https://leetcode.com/accounts/login/?next=/accounts/zendesk/login%3Fbrand_id%3D360001394174%26locale_id%3D1%26return_to%3Dhttps%253A%252F%252Fsupport.leetcode.com%252Fhc%252Fen-us%252Frequests%252F208294%26timestamp%3D1769760757"
                    target="_blank"
                    className="group block p-5 rounded border border-border/40 bg-muted/10 hover:bg-muted/20 transition-colors"
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                            LeetCode <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                        <span className="text-sm font-mono text-amber-500">100 LeetCoins</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Identified a logical flaw in the authentication flow. The vulnerability exposed a redirection bypass that could be leveraged for account takeover under specific conditions.
                    </p>
                </Link>
            </div>
        </section>
    );
}
