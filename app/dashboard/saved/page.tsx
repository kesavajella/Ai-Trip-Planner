"use client"

import Link from "next/link"
import { Heart, MapPin, Star, Wallet } from "lucide-react"
import { Topbar } from "@/components/dashboard/topbar"
import { Button } from "@/components/ui/button"

const savedPlaces = [
  {
    id: 1,
    name: "Oia Sunset Viewpoint",
    location: "Santorini, Greece",
    rating: 4.9,
    price: "$$",
    image: "/images/destination-santorini.jpg",
    category: "Viewpoint",
    description: "Iconic sunset views over the caldera and whitewashed buildings",
  },
]

export default function SavedPlacesPage() {
  return (
    <>
      <Topbar
        title="Saved Places"
        subtitle="Your favorite destinations and spots for future trips."
      />
      <div className="flex-1 px-4 py-8 md:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {savedPlaces.map((place) => (
            <article
              key={place.id}
              className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card text-card-foreground transition-all hover:-translate-y-1 hover:soft-shadow-lg"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-2xl leading-tight tracking-tight">{place.name}</h3>
                    <p className="mt-0.5 inline-flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {place.location}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-amber-500" />
                    {place.rating}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{place.description}</p>
                <dl className="mt-5 grid grid-cols-2 gap-3">
                  <div>
                    <dt className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wide text-muted-foreground">
                      <Wallet className="h-3.5 w-3.5 text-primary" />
                      Price
                    </dt>
                    <dd className="mt-0.5 text-sm font-medium">{place.price}</dd>
                  </div>
                  <div>
                    <dt className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wide text-muted-foreground">
                      Category
                    </dt>
                    <dd className="mt-0.5 text-sm font-medium">{place.category}</dd>
                  </div>
                </dl>
                <Button size="sm" variant="ghost" className="mt-4 w-full rounded-full">
                  Remove from saved
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}