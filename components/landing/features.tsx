import { Brain, Wallet, ListChecks, Compass } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI Planning",
    description:
      "Our model studies your taste, season, and pacing to suggest itineraries that feel made for you, not the average tourist.",
  },
  {
    icon: Wallet,
    title: "Budget Optimization",
    description:
      "Set a number — we balance flights, stays, food, and experiences to keep you under it without cutting the magic.",
  },
  {
    icon: ListChecks,
    title: "Smart Itinerary",
    description:
      "Day-by-day plans with realistic timing, walkability, and built-in slow mornings. No 6 AM museum runs unless you want them.",
  },
  {
    icon: Compass,
    title: "Local Recommendations",
    description:
      "Restaurants, viewpoints, and shops the locals actually love — sourced from real reviews, not just the loudest results.",
  },
]

export function Features() {
  return (
    <section id="features" className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            Why Maro
          </span>
          <h2 className="font-serif text-4xl tracking-tight text-balance md:text-5xl">
            Travel planning, <em className="italic text-primary">finally</em> done right.
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground md:text-lg">
            Four ingredients that turn the spreadsheet-and-tabs nightmare into a single, calm conversation.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <article
              key={f.title}
              className="group relative flex flex-col rounded-3xl border border-border bg-card p-6 text-card-foreground transition-all hover:-translate-y-1 hover:soft-shadow-lg"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-medium">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
