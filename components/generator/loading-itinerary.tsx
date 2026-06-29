"use client"

import * as React from "react"
import { Sparkles, MapPin, Hotel, Coffee, Plane, Compass, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  { icon: Compass, label: "Reading your preferences" },
  { icon: MapPin, label: "Picking the best places" },
  { icon: Hotel, label: "Matching hotels to your budget" },
  { icon: Coffee, label: "Curating food & local gems" },
  { icon: Plane, label: "Sequencing your perfect day" },
]

export function LoadingItinerary() {
  const [active, setActive] = React.useState(0)

  React.useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => Math.min(i + 1, steps.length - 1))
    }, 900)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="rounded-3xl border border-border bg-card p-6 text-card-foreground md:p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground">
          <Sparkles className="h-[1.05rem] w-[1.05rem] animate-pulse" />
        </span>
        <div>
          <p className="font-serif text-xl">Crafting your itinerary…</p>
          <p className="text-sm text-muted-foreground">This usually takes about 30 seconds.</p>
        </div>
      </div>

      <ol className="mt-6 space-y-3">
        {steps.map((s, i) => {
          const done = i < active
          const isActive = i === active
          return (
            <li key={s.label} className="flex items-center gap-3">
              <span
                className={cn(
                  "grid h-7 w-7 place-items-center rounded-full border transition-colors",
                  done
                    ? "border-primary bg-primary text-primary-foreground"
                    : isActive
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground",
                )}
              >
                {done ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <s.icon className={cn("h-3.5 w-3.5", isActive && "animate-pulse")} />
                )}
              </span>
              <span
                className={cn(
                  "text-sm",
                  done ? "text-foreground" : isActive ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {s.label}
              </span>
              {isActive && (
                <span className="ml-auto text-xs text-muted-foreground">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                </span>
              )}
            </li>
          )
        })}
      </ol>

      {/* Skeleton preview */}
      <div className="mt-8 space-y-3">
        <div className="h-4 w-1/3 rounded shimmer" />
        <div className="h-3 w-2/3 rounded shimmer" />
        <div className="h-3 w-1/2 rounded shimmer" />
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="h-20 rounded-xl shimmer" />
          <div className="h-20 rounded-xl shimmer" />
        </div>
      </div>
    </div>
  )
}
