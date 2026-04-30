"use client";

import { Check, X, Sparkles, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type PlanType = "free" | "pro" | "premium";

interface PricingSectionProps {
  currentPlan: PlanType;
  onSelectPlan: (plan: PlanType) => void;
}

const plans = [
  {
    id: "free" as PlanType,
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with basic matching",
    icon: Zap,
    features: [
      "Up to 5 scholarship matches",
      "Basic AI matching",
      "View scholarship links",
    ],
    disabledFeatures: [
      "Add Deadline to Calendar",
      "Deadline reminders",
    ],
    matchLimit: 5,
    buttonText: "Current Plan",
    popular: false,
  },
  {
    id: "pro" as PlanType,
    name: "Pro",
    price: "$9.99",
    period: "/month",
    description: "Perfect for serious scholarship hunters",
    icon: Sparkles,
    features: [
      "Up to 15 scholarship matches",
      "Add Deadline to Calendar",
      "Deadline reminders",
      "Better match explanations",
      "Priority matching",
    ],
    disabledFeatures: [],
    matchLimit: 15,
    buttonText: "Upgrade to Pro",
    popular: true,
  },
  {
    id: "premium" as PlanType,
    name: "Premium",
    price: "$14.99",
    period: "/month",
    description: "Maximum opportunities unlocked",
    icon: Crown,
    features: [
      "Up to 30+ scholarship matches",
      "Add Deadline to Calendar",
      "Deadline reminders",
      "Application tracking",
      "Early access to new scholarships",
      "1-on-1 support",
    ],
    disabledFeatures: [],
    matchLimit: 30,
    buttonText: "Go Premium",
    popular: false,
  },
];

export function getPlanLimit(plan: PlanType): number {
  const planData = plans.find((p) => p.id === plan);
  return planData?.matchLimit || 5;
}

export function PricingSection({ currentPlan, onSelectPlan }: PricingSectionProps) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Unlock more scholarship matches and maximize your opportunities
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isCurrentPlan = currentPlan === plan.id;

            return (
              <div
                key={plan.id}
                className={cn(
                  "relative rounded-2xl border bg-white p-8 shadow-sm transition-all duration-200",
                  plan.popular
                    ? "border-yellow-300 ring-2 ring-yellow-400/20"
                    : "border-border hover:border-blue-200",
                  isCurrentPlan && "ring-2 ring-blue-500"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 px-4 py-1 text-sm font-semibold text-white shadow-md">
                      <Sparkles className="h-3.5 w-3.5" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "rounded-lg p-2",
                      plan.id === "free"
                        ? "bg-gray-100"
                        : plan.id === "pro"
                          ? "bg-yellow-100"
                          : "bg-blue-100"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5",
                        plan.id === "free"
                          ? "text-gray-600"
                          : plan.id === "pro"
                            ? "text-yellow-600"
                            : "text-blue-600"
                      )}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          plan.id === "free"
                            ? "text-gray-500"
                            : plan.id === "pro"
                              ? "text-yellow-500"
                              : "text-blue-500"
                        )}
                      />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                  {plan.disabledFeatures?.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/50" />
                      <span className="text-sm text-muted-foreground line-through">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => onSelectPlan(plan.id)}
                  disabled={isCurrentPlan}
                  className={cn(
                    "mt-8 w-full",
                    plan.popular && !isCurrentPlan
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white hover:from-yellow-500 hover:to-yellow-600"
                      : ""
                  )}
                  variant={isCurrentPlan ? "outline" : plan.popular ? "default" : "outline"}
                >
                  {isCurrentPlan ? "Current Plan" : plan.buttonText}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
