import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="px-4 py-20 md:px-6 md:py-28">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary to-primary/85 p-10 text-primary-foreground md:p-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-primary-foreground/10 blur-3xl"
        />

        <div className="relative max-w-xl">
          <h2 className="font-serif text-4xl tracking-tight text-balance md:text-5xl">
            Your next trip is one prompt away.
          </h2>
          <p className="mt-4 text-pretty text-base/relaxed opacity-90 md:text-lg">
            Free to try. No credit card. Generate your first itinerary in under a minute.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <Link href="/dashboard/generate">
                Plan my trip <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="rounded-full text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/signup">Create an account</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
