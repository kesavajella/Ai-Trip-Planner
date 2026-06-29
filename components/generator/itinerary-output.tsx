"use client"

import * as React from "react"
import { Download, Hotel, Bus, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

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

export function ItineraryOutput({ data }: { data: ItineraryData }) {
  function handleDownload() {
    toast.success("PDF ready", {
      description: `Your ${data.title} itinerary has been queued for download.`,
    })
  }

  const totalDays = data.days.length

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3 rounded-3xl border border-border bg-card p-6 text-card-foreground">
        <div>
          <span className="inline-block rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            Generated · {totalDays} days
          </span>
          <h2 className="mt-3 font-serif text-3xl tracking-tight md:text-4xl">{data.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {data.overview}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Total estimated cost{" "}
            <span className="font-medium text-foreground">${data.totalBudget.toLocaleString()}</span>
          </p>
        </div>
        <Button onClick={handleDownload} size="lg" variant="outline" className="rounded-full">
          <Download className="mr-1.5 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <Tabs defaultValue="itinerary" className="w-full">
        <TabsList className="grid w-full grid-cols-4 rounded-full bg-muted p-1">
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="stays">Hotels</TabsTrigger>
          <TabsTrigger value="transport">Transport</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
        </TabsList>

        <TabsContent value="itinerary" className="space-y-4">
          {data.days.map((day) => (
            <div
              key={day.day}
              className="rounded-3xl border border-border bg-card p-6 text-card-foreground"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Day {day.day}</h3>
                  <p className="text-sm text-muted-foreground">{day.title}</p>
                </div>
                <Badge variant="outline" className="rounded-full">
                  {day.theme}
                </Badge>
              </div>

              <div className="space-y-3">
                {day.activities.map((activity, idx) => (
                  <div key={idx} className="flex gap-4 border-l-2 border-primary/30 pl-4">
                    <div className="pt-1 text-xs font-medium text-primary">{activity.time}</div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{activity.activity}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">{activity.description}</p>
                      <p className="mt-1 text-xs text-primary">Est. ${activity.estimatedCost}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="stays" className="space-y-4">
          {data.accommodation.map((hotel, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-border bg-card p-6 text-card-foreground"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Hotel className="h-5 w-5 text-primary" />
                    <h4 className="font-medium text-foreground">{hotel.name}</h4>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{hotel.type}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{hotel.description}</p>
                  <div className="mt-3 flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium text-foreground">{hotel.rating}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">${hotel.price}</p>
                  <p className="text-xs text-muted-foreground">per night</p>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="transport" className="space-y-4">
          {data.transportation.map((transport, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-border bg-card p-6 text-card-foreground"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bus className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{transport.type}</p>
                    <p className="text-sm text-muted-foreground">{transport.description}</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-primary">${transport.cost}</p>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="budget" className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6 text-card-foreground">
            <h3 className="font-medium text-foreground">Cost Breakdown</h3>

            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {[
                { label: "Accommodation", amount: data.costBreakdown.accommodation },
                { label: "Food", amount: data.costBreakdown.food },
                { label: "Activities", amount: data.costBreakdown.activities },
                { label: "Transport", amount: data.costBreakdown.transportation },
                { label: "Other", amount: data.costBreakdown.other },
              ].map((item, idx) => (
                <div key={idx} className="rounded-2xl border border-border bg-muted p-4 text-center">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="mt-2 text-xl font-bold text-primary">${item.amount}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 text-card-foreground">
            <h3 className="font-medium text-foreground">Travel Tips</h3>
            <ul className="mt-4 space-y-2">
              {data.tips.map((tip, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="text-primary">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
