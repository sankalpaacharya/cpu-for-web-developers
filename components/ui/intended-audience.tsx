import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";

interface IntendedAudienceProps {
    children?: React.ReactNode;
}

export function IntendedAudience({ children }: IntendedAudienceProps) {
    return (
        <div className="my-8 rounded-r-lg border-l-4 border-blue-500 bg-[#0f172a] p-6 shadow-sm not-prose">
            <div className="flex items-start gap-4">
                <div className="mt-1 shrink-0 text-blue-500">
                    <HugeiconsIcon icon={InformationCircleIcon} size={24} />
                </div>
                <div className="flex-1 space-y-4">
                    <h4 className="font-semibold text-white text-lg tracking-tight">
                        Intended audience
                    </h4>
                    <div className="text-slate-300 leading-relaxed text-[15px]">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
