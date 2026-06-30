import Image from "next/image"
import Link from "next/link"
import { Sparkles, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuickPlanForm } from "@/components/landing/quick-plan-form"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft background wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, color-mix(in oklch, var(--primary) 14%, transparent) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-12 pt-10 md:grid-cols-2 md:gap-12 md:px-6 md:pb-20 md:pt-16 lg:gap-16">
        <div className="flex flex-col justify-center">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            AI-crafted itineraries · trusted by 12,000+ travelers
          </span>

          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-balance md:text-6xl lg:text-7xl">
            Plan your <em className="font-serif italic text-primary">perfect trip</em> with AI
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Tell us where you&apos;re going, your budget, and your vibe. In under a minute, intellitrip builds a day-by-day
            itinerary with hotels, restaurants, and hidden gems — tuned to your taste.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/dashboard/generate">Generate Trip Plan</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="rounded-full">
              <Link href="#how-it-works">See how it works</Link>
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {["/images/avatar-1.jpg", "/images/avatar-2.jpg", "/images/avatar-3.jpg"].map((src, i) => (
                <span
                  key={src}
                  className="relative inline-block h-8 w-8 overflow-hidden rounded-full ring-2 ring-background"
                >
                  <Image src={src || "/placeholder.svg"} alt="" fill sizes="32px" className="object-cover" />
                  <span className="sr-only">{`Traveler ${i + 1}`}</span>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <Star className="h-4 w-4 fill-accent text-accent" />
              <Star className="h-4 w-4 fill-accent text-accent" />
              <Star className="h-4 w-4 fill-accent text-accent" />
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="ml-1.5 font-medium text-foreground">4.9</span>
              <span>· 2,400 reviews</span>
            </div>
          </div>
        </div>

        {/* Right side: Image + floating quick form */}
        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl soft-shadow-lg md:aspect-[5/6]">
            <Image
              src="/images/hero-travel.jpg"
              alt="Aerial view of a coastal village at golden hour"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-foreground/40 to-transparent"
            />
            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-background/85 px-3 py-1.5 text-xs font-medium backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Live: 1,842 trips this week
            </div>
          </div>

          <div className="mt-6 md:absolute md:-bottom-16 md:left-1/2 md:mt-0 md:w-[110%] md:-translate-x-1/2">
            <QuickPlanForm />
          </div>
        </div>
      </div>
      {/* Spacer to make room for floating form on desktop */}
      <div className="hidden h-16 md:block" />
    </section>
  )
}
