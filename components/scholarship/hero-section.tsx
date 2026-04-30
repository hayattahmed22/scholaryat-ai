"use client";

import { Sparkles, GraduationCap, Award } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-yellow-200 opacity-50 blur-3xl" />
        <div className="absolute top-20 right-1/4 h-96 w-96 rounded-full bg-blue-200 opacity-40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-12 pb-8 text-center sm:pt-16 sm:pb-12">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-300 bg-white px-4 py-2 shadow-sm">
          <Sparkles className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-medium text-foreground">
            AI-Powered Scholarship Assistant
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Find scholarships that{" "}
          <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            actually fit you
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
          Upload or paste your resume and transcript. Our AI matches you to scholarships,
          explains why you&apos;re a great fit, and gives you calendar-ready deadline links.
        </p>

        {/* Stats */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-blue-100 p-2">
              <GraduationCap className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">10,000+</p>
              <p className="text-xs text-muted-foreground">Scholarships</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-yellow-100 p-2">
              <Award className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">$2.5M+</p>
              <p className="text-xs text-muted-foreground">Matched</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-blue-100 p-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">95%</p>
              <p className="text-xs text-muted-foreground">Match Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
