import Link from "next/link"
import { Plus, Sparkles, Calendar, Globe2, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Topbar } from "@/components/dashboard/topbar"
import { TripCard } from "@/components/dashboard/trip-card"
import { dummyTrips } from "@/lib/dummy-data"

const stats = [
  { label: "Total trips", value: "5", icon: Globe2, hint: "+2 this month" },
  { label: "Upcoming days", value: "17", icon: Calendar, hint: "Next: May 12" },
  { label: "Budget tracked", value: "$13.6k", icon: Wallet, hint: "across 5 trips" },
  { label: "AI generations", value: "23", icon: Sparkles, hint: "of unlimited" },
]

export default function DashboardPage() {
  const upcoming = dummyTrips.filter((t) => t.status === "upcoming")
  const drafts = dummyTrips.filter((t) => t.status === "draft")
  const completed = dummyTrips.filter((t) => t.status === "completed")

  return (
    <>
      <Topbar
        title="Welcome back, Amelia."
        subtitle="Here's what's on your horizon. Ready to plan another?"
        action={
          <Button asChild size="lg" className="rounded-full">
            <Link href="/dashboard/generate">
              <Plus className="h-4 w-4" />
              Create new trip
            </Link>
          </Button>
        }
      />

      <div className="flex-1 px-4 py-8 md:px-8">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-3xl border border-border bg-card p-5 text-card-foreground">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</p>
                  <p className="mt-2 font-serif text-3xl tracking-tight">{s.value}</p>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="h-[1.05rem] w-[1.05rem]" />
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{s.hint}</p>
            </div>
          ))}
        </div>

        {/* Upcoming */}
        <Section
          title="Upcoming trips"
          description="Your confirmed plans, in order of departure."
          count={upcoming.length}
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((t) => (
              <TripCard key={t.id} trip={t} />
            ))}
          </div>
        </Section>

        {/* Drafts */}
        <Section title="Drafts" description="Started but not yet booked. Pick up where you left off." count={drafts.length}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {drafts.map((t) => (
              <TripCard key={t.id} trip={t} />
            ))}
            {/* New trip CTA card */}
            <Link
              href="/dashboard/generate"
              className="flex min-h-[18rem] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border bg-card/50 p-6 text-center text-muted-foreground transition-colors hover:border-primary/40 hover:bg-card hover:text-foreground"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Plus className="h-5 w-5" />
              </span>
              <p className="mt-4 font-medium">Plan a new trip</p>
              <p className="mt-1 max-w-[18ch] text-xs">Generate a complete day-by-day in under a minute.</p>
            </Link>
          </div>
        </Section>

        {/* Completed */}
        <Section title="Memories" description="Past adventures." count={completed.length}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {completed.map((t) => (
              <TripCard key={t.id} trip={t} />
            ))}
          </div>
        </Section>
      </div>
    </>
  )
}

function Section({
  title,
  description,
  count,
  children,
}: {
  title: string
  description: string
  count: number
  children: React.ReactNode
}) {
  return (
    <section className="mt-12">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h2 className="font-serif text-2xl tracking-tight md:text-3xl">
            {title} <span className="text-muted-foreground">({count})</span>
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </section>
  )
}
