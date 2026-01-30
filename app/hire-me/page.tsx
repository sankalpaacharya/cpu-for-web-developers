"use client";

import { AboutMe } from "@/components/hire-me/about-me";
import { NoteableProjects } from "@/components/hire-me/noteable-projects";
import { OpenSource } from "@/components/hire-me/open-source";
import { SecurityFindings } from "@/components/hire-me/security-findings";
import { WorkExperience } from "@/components/hire-me/work-experience";

export default function HireMe() {
    return (
        <main className="max-w-3xl mx-auto px-6 py-16 space-y-20">
            <AboutMe />
            <WorkExperience />
            <SecurityFindings />
            <OpenSource />
            <NoteableProjects />
        </main>
    );
}
