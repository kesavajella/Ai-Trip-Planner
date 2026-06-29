import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Topbar } from "@/components/dashboard/topbar"
import { TripCard } from "@/components/dashboard/trip-card"
import { dummyTrips } from "@/lib/dummy-data"

export default function TripsPage() {
  return (
    <>
      <Topbar
        title="My Trips"
        subtitle="Every itinerary you've planned, one place."
        action={
          <Button asChild className="rounded-full">
            <Link href="/dashboard/generate">
              <Plus className="h-4 w-4" />
              New trip
            </Link>
          </Button>
        }
      />
      <div className="flex-1 px-4 py-8 md:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dummyTrips.map((t) => (
            <TripCard key={t.id} trip={t} />
          ))}
        </div>
      </div>
    </>
  )
}
