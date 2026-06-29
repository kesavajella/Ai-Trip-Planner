"use client"

import * as React from "react"
import { Sparkles, MapPin, Calendar, Compass, DollarSign, Gem, TrendingDown, User, Users, Baby, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Spinner } from "@/components/ui/spinner"
import { CityCombobox } from "./city-combobox"
import { tripPlanCities } from "@/lib/destination-data"
import { TripPlanRequest } from "@/lib/types"

const interests = [
  { id: "adventure", label: "Adventure", emoji: "🧗" },
  { id: "food", label: "Food", emoji: "🍝" },
  { id: "culture", label: "Culture", emoji: "🏛️" },
  { id: "nature", label: "Nature", emoji: "🌿" },
  { id: "nightlife", label: "Nightlife", emoji: "🎶" },
]

const budgets: { id: TripPlanRequest["budget"]; label: string; desc: string; icon: any }[] = [
  { id: "Cheap", label: "Cheap", desc: "Stay conscious of costs", icon: TrendingDown },
  { id: "Moderate", label: "Moderate", desc: "Balance comfort and value", icon: DollarSign },
  { id: "Luxury", label: "Luxury", desc: "Premium experience", icon: Gem },
]

const travelCompanions: { id: TripPlanRequest["travelers"]; label: string; desc: string; icon: any }[] = [
  { id: "Just Me", label: "Just Me", desc: "Solo exploration", icon: User },
  { id: "A Couple", label: "A Couple", desc: "Romantic getaway", icon: Heart },
  { id: "Family", label: "Family", desc: "With kids", icon: Baby },
  { id: "Friends", label: "Friends", desc: "Group adventure", icon: Users },
]

export function GeneratorForm({
  initial,
  onGenerate,
  loading,
  onChange,
}: {
  initial?: Partial<TripPlanRequest> & { interests?: string[] }
  onGenerate: () => void
  loading: boolean
  onChange?: (data: TripPlanRequest & { interests: string[] }) => void
}) {
  const [city, setCity] = React.useState(initial?.city || "")
  const [budget, setBudget] = React.useState<TripPlanRequest["budget"]>(initial?.budget || "Moderate")
  const [days, setDays] = React.useState(initial?.numberOfDays?.toString() || "5")
  const [picked, setPicked] = React.useState<string[]>(initial?.interests || ["food", "culture"])
  const [travelers, setTravelers] = React.useState<TripPlanRequest["travelers"]>(initial?.travelers || "Just Me")

  function toggle(id: string) {
    const updated = picked.includes(id) ? picked.filter((x) => x !== id) : [...picked, id]
    setPicked(updated)
    onChange?.({ city, budget, numberOfDays: Number(days), travelers, interests: updated })
  }

  function handleBudgetChange(value: string) {
    setBudget(value as TripPlanRequest["budget"])
    onChange?.({ city, budget: value as TripPlanRequest["budget"], numberOfDays: Number(days), travelers, interests: picked })
  }

  function handleDaysChange(value: string) {
    setDays(value)
    onChange?.({ city, budget, numberOfDays: Number(value), travelers, interests: picked })
  }

  function handleTravelersChange(value: string) {
    setTravelers(value as TripPlanRequest["travelers"])
    onChange?.({ city, budget, numberOfDays: Number(days), travelers: value as TripPlanRequest["travelers"], interests: picked })
  }

  function handleCityChange(value: string) {
    setCity(value)
    onChange?.({ city: value, budget, numberOfDays: Number(days), travelers, interests: picked })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onGenerate()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12 rounded-3xl border border-border bg-card p-6 md:p-8 font-sans">
      <div className="grid gap-5 md:grid-cols-2">
        <CityCombobox
          value={city}
          onChange={handleCityChange}
          options={tripPlanCities}
        />
        <div className="space-y-2">
          <Label htmlFor="days" className="flex items-center gap-1.5 text-sm">
            <Calendar className="h-3.5 w-3.5 text-primary" /> Number of days
          </Label>
          <Input
            id="days"
            type="number"
            min={1}
            max={30}
            value={days}
            onChange={(e) => handleDaysChange(e.target.value)}
            className="h-11 rounded-xl"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">What is Your Budget?</h2>
        <RadioGroup value={budget} onValueChange={handleBudgetChange} className="grid gap-4 md:grid-cols-3">
          {budgets.map((b) => {
            const Icon = b.icon
            return (
              <Label
                key={b.id}
                htmlFor={`b-${b.id}`}
                className={`flex cursor-pointer flex-col items-start rounded-xl border bg-white p-5 transition-colors ${
                  budget === b.id ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/40"
                }`}
              >
                <Icon className="h-6 w-6 text-primary" />
                <p className="mt-2 font-bold text-lg text-foreground">{b.label}</p>
                <p className="mt-1 text-sm text-gray-500">{b.desc}</p>
                <RadioGroupItem id={`b-${b.id}`} value={b.id} className="sr-only" />
              </Label>
            )
          })}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">Who do you plan on traveling with on your next adventure?</h2>
        <RadioGroup value={travelers} onValueChange={handleTravelersChange} className="grid gap-4 md:grid-cols-3">
          {travelCompanions.map((t) => {
            const Icon = t.icon
            return (
              <Label
                key={t.id}
                htmlFor={`t-${t.id}`}
                className={`flex cursor-pointer flex-col items-start rounded-xl border bg-white p-5 transition-colors ${
                  travelers === t.id ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/40"
                }`}
              >
                <Icon className="h-6 w-6 text-primary" />
                <p className="mt-2 font-bold text-lg text-foreground">{t.label}</p>
                <p className="mt-1 text-sm text-gray-500">{t.desc}</p>
                <RadioGroupItem id={`t-${t.id}`} value={t.id} className="sr-only" />
              </Label>
            )
          })}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="flex items-center gap-1.5 text-sm">
          <Compass className="h-3.5 w-3.5 text-primary" /> Interests
        </Label>
        <div className="flex flex-wrap gap-2">
          {interests.map((i) => {
            const active = picked.includes(i.id)
            return (
              <Label
                key={i.id}
                htmlFor={`i-${i.id}`}
                className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-gray-200 bg-white hover:border-primary/40"
                }`}
              >
                <Checkbox
                  id={`i-${i.id}`}
                  checked={active}
                  onCheckedChange={() => toggle(i.id)}
                  className="sr-only"
                />
                <span aria-hidden>{i.emoji}</span>
                {i.label}
              </Label>
            )
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Pro tip:</span> the more specific your destination, the better
          the plan.
        </p>
        <Button type="submit" size="lg" className="rounded-full" disabled={loading}>
          {loading ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Generating…
            </>
          ) : (
            <>
              <Sparkles className="mr-1 h-4 w-4" />
              Generate AI Itinerary
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
