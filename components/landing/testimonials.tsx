import Image from "next/image"
import { Quote } from "lucide-react"
import { testimonials } from "@/lib/dummy-data"

export function Testimonials() {
  return (
    <section id="testimonials" className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            Loved by travelers
          </span>
          <h2 className="font-serif text-4xl tracking-tight text-balance md:text-5xl">
            Real trips. <em className="italic text-primary">Real magic.</em>
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="relative flex flex-col rounded-3xl border border-border bg-card p-6 text-card-foreground"
            >
              <Quote className="h-7 w-7 text-primary/30" aria-hidden />
              <blockquote className="mt-3 flex-1 text-pretty text-base leading-relaxed">{t.quote}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image src={t.avatar || "/placeholder.svg"} alt={t.name} fill sizes="40px" className="object-cover" />
                </span>
                <div>
                  <p className="text-sm font-medium leading-tight">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
