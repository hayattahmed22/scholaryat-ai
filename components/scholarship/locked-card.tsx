"use client";

import { Lock, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LockedCardProps {
  lockedCount: number;
  onUpgrade: () => void;
}

export function LockedCard({ lockedCount, onUpgrade }: LockedCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50/50 to-yellow-50/50 p-6 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(250,204,21,0.1),transparent_50%)]" />
      
      <div className="relative">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-yellow-100 to-blue-100">
          <Lock className="h-6 w-6 text-blue-600" />
        </div>
        
        <h3 className="text-lg font-semibold text-foreground">
          {lockedCount} More Scholarship{lockedCount === 1 ? "" : "s"} Available
        </h3>
        
        <p className="mt-2 text-sm text-muted-foreground">
          Upgrade your plan to unlock all scholarship matches and maximize your funding opportunities.
        </p>
        
        <Button
          onClick={onUpgrade}
          className="mt-4 gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white hover:from-yellow-500 hover:to-yellow-600"
        >
          <Crown className="h-4 w-4" />
          Unlock All Matches
        </Button>
        
        <p className="mt-3 text-xs text-muted-foreground">
          Starting at $9.99/month
        </p>
      </div>
    </div>
  );
}
