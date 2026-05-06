"use client";

import { useState } from "react";
import { HeroSection } from "@/components/scholarship/hero-section";
import { FileDropzone } from "@/components/scholarship/file-dropzone";
import { MatchCard } from "@/components/scholarship/match-card";
import { EmptyState } from "@/components/scholarship/empty-state";
import {
  PricingSection,
  getPlanLimit,
  type PlanType,
} from "@/components/scholarship/pricing-section";
import { LockedCard } from "@/components/scholarship/locked-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { Rocket, FileText, Sparkles } from "lucide-react";

interface ScholarshipMatch {
  title: string;
  amount?: string;
  deadline?: string | null;
  reason: string;
  link?: string;
  calendar_link?: string;
}

export default function ScholarshipMatcher() {
  const [resume, setResume] = useState("");
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("");
  const [matches, setMatches] = useState<ScholarshipMatch[]>([]);
  const [error, setError] = useState("");
  const [currentPlan, setCurrentPlan] = useState<PlanType>("free");
  const [showPricing, setShowPricing] = useState(false);

  const planLimit = getPlanLimit(currentPlan);
  const visibleMatches = matches.slice(0, planLimit);

  // ✅ FORCE UNLOCK UI TO ALWAYS SHOW ON FREE
  const lockedCount = currentPlan === "free" ? 5 : 0;

  async function findScholarships() {
    setLoading(true);
    setError("");
    setMatches([]);
    setLoadingStatus("Reading your profile...");

    try {
      const combinedText = `
Resume:
${resume}

Transcript:
${transcript}
`;

      const response = await fetch("/api/find-scholarships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pastedText: combinedText,
        }),
      });

      if (!response.ok) {
        throw new Error("failed");
      }

      const data = await response.json();

      if (!data.matches || !Array.isArray(data.matches)) {
        throw new Error("invalid");
      }

      setMatches(data.matches);
    } catch (err) {
      setError("Could not load matches");
    } finally {
      setLoading(false);
      setLoadingStatus("");
    }
  }

  const isReady = resume.trim().length > 0 || transcript.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50/50 via-white to-blue-50/40">
      
      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" className="h-10 w-10" />
            <span className="font-bold">Scholyat AI</span>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => setShowPricing(!showPricing)}>
              Pricing
            </Button>

            <span className="text-xs font-semibold">
              Plan: {currentPlan}
            </span>
          </div>
        </div>
      </nav>

      <HeroSection />

      {showPricing && (
        <PricingSection
          currentPlan={currentPlan}
          onSelectPlan={(plan) => {
            setCurrentPlan(plan);
            setShowPricing(false);
          }}
        />
      )}

      <main className="mx-auto max-w-7xl px-4 pb-20">
        <div className="grid gap-6 lg:grid-cols-2">
          
          {/* LEFT */}
          <Card>
            <CardHeader>
              <CardTitle>Student Profile</CardTitle>
              <CardDescription>Paste your resume + transcript</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <Textarea
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                placeholder="Paste resume..."
              />

              <Textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Paste transcript..."
              />

              <Button
                onClick={findScholarships}
                disabled={loading || !isReady}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Spinner className="h-5 w-5" />
                    {loadingStatus || "Processing..."}
                  </>
                ) : (
                  <>
                    <Rocket className="h-5 w-5" />
                    Find My Scholarships
                  </>
                )}
              </Button>

              {error && <p className="text-red-500">{error}</p>}
            </CardContent>
          </Card>

          {/* RIGHT */}
          <Card>
            <CardHeader>
              <CardTitle>Your Matches</CardTitle>
              <CardDescription>
                {matches.length > 0
                  ? `Found ${matches.length} scholarships`
                  : "Results will appear here"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {loading ? (
                <div className="flex justify-center py-10">
                  <Spinner />
                </div>
              ) : matches.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="space-y-4">
                  
                  {/* REAL MATCHES */}
                  {visibleMatches.map((match, index) => (
                    <MatchCard
                      key={index}
                      title={match.title}
                      deadline={match.deadline || undefined}
                      reason={match.reason}
                      link={match.link}
                      calendar_link={match.calendar_link}
                      canAccessCalendar={currentPlan !== "free"}
                      onUpgradeClick={() => setShowPricing(true)}
                    />
                  ))}

                  {/* 🔒 LOCKED SECTION */}
                        {currentPlan === "free" && (
                     <LockedCard
                           lockedCount={5}
                           onUpgrade={() => setShowPricing(true)}
                              />
                               )}

                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}