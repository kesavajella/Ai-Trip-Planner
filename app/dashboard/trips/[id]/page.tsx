import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, MapPin, Users, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Topbar } from "@/components/dashboard/topbar"
import { ItineraryOutput } from "@/components/generator/itinerary-output"
import { dummyTrips, formatBudget, formatTravelType, dummyItinerary } from "@/lib/dummy-data"

export default async function TripDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const trip = dummyTrips.find((t) => t.id === id)
  if (!trip) notFound()

  return (
    <>
      <Topbar
        title={trip.destination}
        subtitle={`${trip.country} · ${trip.startDate}`}
        action={
          <Button asChild variant="outline" className="rounded-full bg-transparent">
            <Link href="/dashboard/trips">
              <ArrowLeft className="h-4 w-4" />
              All trips
            </Link>
          </Button>
        }
      />

      <div className="flex-1 space-y-6 px-4 py-8 md:px-8">
        <div className="overflow-hidden rounded-3xl border border-border bg-card text-card-foreground">
          <div className="relative aspect-[21/9] w-full">
            <Image
              src={trip.image || "/placeholder.svg"}
              alt={`${trip.destination}, ${trip.country}`}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-3">
              <div className="text-background">
                <Badge variant="secondary" className="rounded-full capitalize">
                  {trip.status}
                </Badge>
                <h2 className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">{trip.destination}</h2>
              </div>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-4 px-6 py-5 md:grid-cols-4">
            <Stat icon={<MapPin className="h-4 w-4" />} label="Country" value={trip.country} />
            <Stat icon={<Calendar className="h-4 w-4" />} label="Days" value={String(trip.days)} />
            <Stat
              icon={<Wallet className="h-4 w-4" />}
              label="Budget"
              value={`${formatBudget(trip.budget)} · $${trip.budgetUsd.toLocaleString()}`}
            />
            <Stat icon={<Users className="h-4 w-4" />} label="Travel type" value={formatTravelType(trip.travelType)} />
          </dl>
        </div>

        <ItineraryOutput data={dummyItinerary as any} />
      </div>
    </>
  )
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <dt className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  )
}
