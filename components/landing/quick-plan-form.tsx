"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, MapPin, Wallet, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function QuickPlanForm() {
  const router = useRouter()
  const [destination, setDestination] = React.useState("")
  const [budget, setBudget] = React.useState("medium")
  const [days, setDays] = React.useState("5")
  const [travelType, setTravelType] = React.useState("solo")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams({
      destination,
      budget,
      days,
      travelType,
    })
    router.push(`/dashboard/generate?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-card p-4 text-card-foreground soft-shadow-lg md:p-5"
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <Field icon={<MapPin className="h-4 w-4" />} label="Destination" htmlFor="qp-dest">
          <Input
            id="qp-dest"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g. Lisbon"
            className="h-9 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
          />
        </Field>

        <Field icon={<Wallet className="h-4 w-4" />} label="Budget" htmlFor="qp-budget">
          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger
              id="qp-budget"
              className="h-9 border-0 bg-transparent px-0 shadow-none focus:ring-0 dark:bg-transparent"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field icon={<Calendar className="h-4 w-4" />} label="Days" htmlFor="qp-days">
          <Input
            id="qp-days"
            type="number"
            min={1}
            max={30}
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="h-9 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
          />
        </Field>

        <Field icon={<Users className="h-4 w-4" />} label="Travel type" htmlFor="qp-type">
          <Select value={travelType} onValueChange={setTravelType}>
            <SelectTrigger
              id="qp-type"
              className="h-9 border-0 bg-transparent px-0 shadow-none focus:ring-0 dark:bg-transparent"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solo">Solo</SelectItem>
              <SelectItem value="couple">Couple</SelectItem>
              <SelectItem value="family">Family</SelectItem>
              <SelectItem value="friends">Friends</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="mt-3 flex justify-end">
        <Button type="submit" size="lg" className="w-full rounded-full md:w-auto">
          Generate Trip Plan
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </form>
  )
}

function Field({
  icon,
  label,
  htmlFor,
  children,
}: {
  icon: React.ReactNode
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-border bg-background/60 px-4 py-2.5 transition-colors focus-within:border-primary/40 focus-within:bg-background">
      <Label htmlFor={htmlFor} className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </Label>
      <div className="mt-0.5">{children}</div>
    </div>
  )
}
