import Link from "next/link"
import { Mail, Twitter, Instagram, Github, Linkedin } from "lucide-react"
import { Logo } from "@/components/logo"

const sections = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Pricing", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help center", href: "#" },
      { label: "Travel guides", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
]

const socials = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Maro is the AI travel planner that turns scattered ideas into thoughtful, day-by-day itineraries.
            </p>
            <a
              href="mailto:hello@maro.app"
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              hello@maro.app
            </a>
          </div>

          <div className="grid grid-cols-2 gap-6 md:col-span-8">
            {sections.map((s) => (
              <div key={s.title}>
                <h3 className="text-sm font-medium">{s.title}</h3>
                <ul className="mt-3 space-y-2.5">
                  {s.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 md:flex-row md:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Maro Travel, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
