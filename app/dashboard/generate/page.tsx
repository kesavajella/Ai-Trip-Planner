"use client"

import * as React from "react"
import { Topbar } from "@/components/dashboard/topbar"
import { GeneratorForm } from "@/components/generator/generator-form"
import { LoadingItinerary } from "@/components/generator/loading-itinerary"
import { ItineraryOutput } from "@/components/generator/itinerary-output"
import { toast } from "sonner"
import { useNotifications } from "@/components/notifications-provider"
import { TripPlanRequest } from "@/lib/types"

interface ItineraryData {
  title: string
  overview: string
  totalBudget: number
  dailyBudget: number
  days: Array<{
    day: number
    title: string
    theme: string
    activities: Array<{
      time: string
      activity: string
      description: string
      estimatedCost: number
    }>
  }>
  accommodation: Array<{
    name: string
    type: string
    price: number
    rating: string
    description: string
  }>
  transportation: Array<{
    type: string
    cost: number
    description: string
  }>
  costBreakdown: {
    accommodation: number
    food: number
    activities: number
    transportation: number
    other: number
  }
  tips: string[]
}

export default function GeneratePage() {
  const [stage, setStage] = React.useState<"idle" | "loading" | "result" | "error">("idle")
  const [itineraryData, setItineraryData] = React.useState<ItineraryData | null>(null)
  const [errorMessage, setErrorMessage] = React.useState<string>("")
  const [formData, setFormData] = React.useState<TripPlanRequest & { interests: string[] }>({
    city: "Santorini, Greece",
    numberOfDays: 5,
    budget: "Moderate",
    travelers: "Just Me",
    interests: ["food", "culture"],
  })

  const { addNotification } = useNotifications()

  async function handleGenerate() {
    if (!formData.city.trim()) {
      toast.error("Please select a city")
      return
    }

    setStage("loading")

    try {
      const payload = {
        city: formData.city,
        numberOfDays: formData.numberOfDays,
        budget: formData.budget,
        travelers: formData.travelers,
        interests: formData.interests,
      }

      const response = await fetch("/api/generate-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to generate itinerary")
      }

      const data = await response.json()
      setItineraryData(data)
      setStage("result")
      addNotification(formData.city, formData.numberOfDays)
      toast.success("Trip itinerary generated!")
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to generate trip itinerary"
      console.error("[v0] Generation error:", error)
      setErrorMessage(errorMsg)
      setStage("error")
      toast.error(errorMsg)
    }
  }

  function handleRetry() {
    setStage("idle")
    setErrorMessage("")
    setItineraryData(null)
  }

  return (
    <>
      <Topbar
        title="AI Trip Generator"
        subtitle="Tell us the basics — we'll handle the day-by-day, hotels, food, and the small stuff."
      />
      <div className="flex-1 space-y-6 px-4 py-8 md:px-8">
        <GeneratorForm
          initial={formData}
          onGenerate={handleGenerate}
          loading={stage === "loading"}
          onChange={setFormData}
        />

        {stage === "loading" && (
          <div className="animate-fade-up">
            <LoadingItinerary />
          </div>
        )}

        {stage === "result" && itineraryData && (
          <div className="animate-fade-up">
            <ItineraryOutput data={itineraryData} />
          </div>
        )}

        {stage === "error" && (
          <div className="animate-fade-up rounded-xl border border-destructive/50 bg-destructive/5 p-6">
            <div className="flex items-start gap-4">
              <div className="text-2xl">⚠️</div>
              <div className="flex-1">
                <h3 className="font-semibold text-destructive">Generation Failed</h3>
                <p className="mt-2 text-sm text-muted-foreground">{errorMessage}</p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={handleRetry}
                    className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => {
                      setStage("idle")
                      setFormData({
                        city: "Santorini, Greece",
                        numberOfDays: 5,
                        budget: "Moderate",
                        travelers: "Just Me",
                        interests: ["food", "culture"],
                      })
                    }}
                    className="inline-flex h-9 items-center justify-center rounded-lg border border-input bg-background px-4 text-sm font-medium hover:bg-accent transition-colors"
                  >
                    Reset Form
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}