import Image from "next/image"

const steps = [
  {
    n: "01",
    title: "Tell us your trip",
    text: "Destination, days, budget, and what you love — solo café crawls or family adventure parks.",
  },
  {
    n: "02",
    title: "AI builds your day-by-day",
    text: "In under 60 seconds you get an itinerary with timings, costs, hotels, and transit between every stop.",
  },
  {
    n: "03",
    title: "Tweak, save, and go",
    text: "Swap any item, regenerate a single day, save trips to your dashboard, or export a polished PDF.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative border-t border-border bg-muted/40 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:px-6 lg:gap-16">
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl soft-shadow-lg">
          <Image
            src="/images/dest-bali.jpg"
            alt="Lush rice terraces in Bali"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-border bg-background/90 p-4 backdrop-blur">
            <p className="font-serif text-lg leading-tight">
              &ldquo;10 days in Bali for two, under $1,800.&rdquo;
            </p>
            <p className="mt-1 text-xs text-muted-foreground">— generated in 47 seconds</p>
          </div>
        </div>

        <div>
          <span className="mb-4 inline-block rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            How it works
          </span>
          <h2 className="font-serif text-4xl tracking-tight text-balance md:text-5xl">
            From idea to itinerary, in three calm steps.
          </h2>

          <ol className="mt-8 space-y-5">
            {steps.map((s) => (
              <li key={s.n} className="flex gap-5 rounded-2xl border border-border bg-card p-5 text-card-foreground">
                <span className="font-serif text-3xl text-primary leading-none">{s.n}</span>
                <div>
                  <h3 className="font-medium">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
