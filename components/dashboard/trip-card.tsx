import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Users, Wallet, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type Trip, formatBudget, formatTravelType } from "@/lib/dummy-data"

const statusStyles: Record<Trip["status"], string> = {
  upcoming: "bg-primary/10 text-primary border-primary/20",
  draft: "bg-muted text-muted-foreground border-border",
  completed: "bg-accent/30 text-accent-foreground border-accent/40",
}

export function TripCard({ trip }: { trip: Trip }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card text-card-foreground transition-all hover:-translate-y-1 hover:soft-shadow-lg">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={trip.image || "/placeholder.svg"}
          alt={`${trip.destination}, ${trip.country}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge variant="outline" className={`absolute left-3 top-3 capitalize ${statusStyles[trip.status]}`}>
          {trip.status}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-serif text-2xl leading-tight tracking-tight">{trip.destination}</h3>
            <p className="mt-0.5 inline-flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {trip.country}
            </p>
          </div>
          <span className="text-right text-xs text-muted-foreground">{trip.startDate}</span>
        </div>

        <dl className="mt-5 grid grid-cols-3 gap-3">
          <Stat icon={<Calendar className="h-3.5 w-3.5" />} label="Days" value={String(trip.days)} />
          <Stat icon={<Wallet className="h-3.5 w-3.5" />} label="Budget" value={formatBudget(trip.budget)} />
          <Stat icon={<Users className="h-3.5 w-3.5" />} label="Type" value={formatTravelType(trip.travelType)} />
        </dl>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {trip.interests.map((interest) => (
            <Badge key={interest} variant="secondary" className="rounded-full font-normal">
              {interest}
            </Badge>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <p className="text-sm">
            <span className="text-muted-foreground">Total</span>{" "}
            <span className="font-medium">${trip.budgetUsd.toLocaleString()}</span>
          </p>
          <Button asChild size="sm" variant="ghost" className="rounded-full">
            <Link href={`/dashboard/trips/${trip.id}`}>
              View details
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  )
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <dt className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wide text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </dt>
      <dd className="mt-0.5 text-sm font-medium">{value}</dd>
    </div>
  )
}
