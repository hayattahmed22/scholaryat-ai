"use client";

import { CalendarPlus, ExternalLink, Clock, Award, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MatchCardProps {
  title: string;
  deadline?: string;
  reason: string;
  link?: string;
  calendar_link?: string;
  canAccessCalendar?: boolean;
  onUpgradeClick?: () => void;
}

export function MatchCard({
  title,
  deadline,
  reason,
  link,
  calendar_link,
  canAccessCalendar = true,
  onUpgradeClick,
}: MatchCardProps) {
  return (
    <div className="group rounded-xl border border-border bg-white p-5 shadow-sm transition-all duration-200 hover:border-yellow-200 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-yellow-100 p-2">
            <Award className="h-5 w-5 text-yellow-600" />
          </div>
          <h3 className="text-balance font-semibold text-foreground leading-tight">
            {title}
          </h3>
        </div>
      </div>

      {deadline && (
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
          <Clock className="h-3.5 w-3.5" />
          Deadline: {deadline}
        </div>
      )}

      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        {reason}
      </p>

      <div className="flex flex-wrap gap-2">
        {link && (
          <Button asChild size="sm" className="gap-1.5">
            <a href={link} target="_blank" rel="noreferrer">
              <ExternalLink className="h-3.5 w-3.5" />
              View Scholarship
            </a>
          </Button>
        )}

        {calendar_link && canAccessCalendar ? (
          <Button asChild variant="outline" size="sm" className="gap-1.5">
            <a href={calendar_link} target="_blank" rel="noreferrer">
              <CalendarPlus className="h-3.5 w-3.5" />
              Add Deadline to Calendar
            </a>
          </Button>
        ) : calendar_link && !canAccessCalendar ? (
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 border-dashed border-muted-foreground/30 text-muted-foreground hover:border-yellow-400 hover:text-yellow-600 hover:bg-yellow-50"
            onClick={onUpgradeClick}
          >
            <Lock className="h-3.5 w-3.5" />
            Calendar unlocks with Pro
          </Button>
        ) : null}
      </div>
    </div>
  );
}
