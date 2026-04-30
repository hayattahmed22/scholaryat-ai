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
  match_score?: number;
}

export default function ScholarshipMatcher() {
  const [resume, setResume] = useState("");
  const [transcript, setTranscript] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [transcriptFile, setTranscriptFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("");
  const [matches, setMatches] = useState<ScholarshipMatch[]>([]);
  const [error, setError] = useState("");
  const [currentPlan, setCurrentPlan] = useState<PlanType>("free");
  const [showPricing, setShowPricing] = useState(false);

  const planLimit = getPlanLimit(currentPlan);
  const visibleMatches = matches.slice(0, planLimit);

  // FORCE unlock card to show for free users after matches load
  const lockedCount =
    currentPlan === "free" && matches.length > 0
      ? Math.max(5, matches.length - planLimit)
      : Math.max(0, matches.length - planLimit);

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
        const errorData = await response.json().catch(() => null);
        console.error("API error details:", errorData);
        throw new Error(errorData?.error || "failed");
      }

      const data = await response.json();

      if (!data.matches || !Array.isArray(data.matches)) {
        throw new Error("invalid");
      }

      setMatches(data.matches);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(`Could not load matches: ${message}`);
      console.error("Scholarship matcher error:", err);
    } finally {
      setLoading(false);
      setLoadingStatus("");
    }
  }

  const isReady = resume.trim().length > 0 || transcript.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50/50 via-white to-blue-50/40">
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Scholyat AI" className="h-10 w-10 object-contain" />
            <span className="text-lg font-bold text-foreground">Scholyat AI</span>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setShowPricing(!showPricing)}>
              Pricing
            </Button>

            <div className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1">
              <span className="text-xs text-muted-foreground">Plan:</span>
              <span className="text-xs font-semibold text-foreground capitalize">
                {currentPlan}
              </span>
            </div>
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

      <main className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-yellow-100 p-2">
                  <FileText className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Student Profile</CardTitle>
                  <CardDescription>
                    Upload your documents or paste the content below
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Resume</label>

                <FileDropzone
                  label="Drop your resume here"
                  description="Resume file (PDF, DOCX, or TXT)"
                  onFileContent={setResume}
                  onFileUpload={setResumeFile}
                  hasContent={!!resume.trim()}
                />

                <Textarea
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  placeholder="Or paste your resume text here..."
                  className="min-h-[120px] resize-y bg-white"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Transcript</label>

                <FileDropzone
                  label="Drop your transcript here"
                  description="Transcript file (PDF, DOCX, or TXT)"
                  onFileContent={setTranscript}
                  onFileUpload={setTranscriptFile}
                  hasContent={!!transcript.trim()}
                />

                <Textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  placeholder="Or paste your transcript text here..."
                  className="min-h-[120px] resize-y bg-white"
                />
              </div>

              <Button
                onClick={findScholarships}
                disabled={loading || !isReady}
                className="w-full gap-2 py-6 text-base font-semibold"
                size="lg"
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

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="text-sm font-medium text-red-700">{error}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-2">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                  </div>

                  <div>
                    <CardTitle className="text-xl">Your Matches</CardTitle>
                    <CardDescription>
                      {matches.length > 0
                        ? `Found ${matches.length} scholarship${
                            matches.length === 1 ? "" : "s"
                          } for you`
                        : "Scholarships matched to your profile"}
                    </CardDescription>
                  </div>
                </div>

                {matches.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                      {visibleMatches.length} of {matches.length}
                    </span>

                    {lockedCount > 0 && (
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                        {lockedCount} locked
                      </span>
                    )}
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent>
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <Spinner className="h-10 w-10 text-yellow-500" />
                  <p className="mt-4 text-sm text-muted-foreground">
                    {loadingStatus || "Finding the best scholarships for you..."}
                  </p>
                </div>
              ) : matches.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="space-y-4">
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
                      score={match.match_score ?? 0}
                    />
                  ))}

                  {lockedCount > 0 && (
                    <LockedCard
                      lockedCount={lockedCount}
                      onUpgrade={() => setShowPricing(true)}
                    />
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Trusted by students at leading universities worldwide
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale">
            <span className="text-lg font-semibold text-muted-foreground">Stanford</span>
            <span className="text-lg font-semibold text-muted-foreground">MIT</span>
            <span className="text-lg font-semibold text-muted-foreground">Harvard</span>
            <span className="text-lg font-semibold text-muted-foreground">Berkeley</span>
            <span className="text-lg font-semibold text-muted-foreground">Yale</span>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/40 bg-white/60 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Scholyat AI" className="h-8 w-8 object-contain" />
              <span className="font-semibold text-foreground">Scholyat AI</span>
            </div>

            <p className="text-sm text-muted-foreground">
              © 2026 Scholyat AI. Helping students find their future.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}