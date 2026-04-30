"use client";

import { Search } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">No matches yet</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Upload or paste your resume and transcript, then click{" "}
        <span className="font-medium text-foreground">Find My Scholarships</span> to discover
        opportunities tailored to you.
      </p>
    </div>
  );
}
