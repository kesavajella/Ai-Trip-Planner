"use client"

import Link from "next/link"
import * as React from "react"
import { Menu, X } from "lucide-react"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

const links = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#testimonials", label: "Stories" },
]

export function Navbar() {
  const router = useRouter()
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [profileOpen, setProfileOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  function handleLogout() {
    setProfileOpen(false)
    router.replace("/")
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-colors",
        scrolled ? "border-border bg-background/85 backdrop-blur-md" : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <div className="relative">
            <button
              onClick={() => setProfileOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-1.5 py-1 pr-3 text-sm hover:bg-muted"
            >
              <span className="relative h-7 w-7 overflow-hidden rounded-full">
                <img src="/images/avatar-1.jpg" alt="Profile" className="h-full w-full object-cover" />
              </span>
              <span className="font-medium">Amelia</span>
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-border bg-card py-1 shadow-lg">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3" aria-label="Mobile">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 pt-2">
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((v) => !v)}
                  className="flex w-full items-center gap-2 rounded-full border border-border bg-card px-1.5 py-1 pr-3 text-sm hover:bg-muted"
                >
                  <span className="relative h-7 w-7 overflow-hidden rounded-full">
                    <img src="/images/avatar-1.jpg" alt="Profile" className="h-full w-full object-cover" />
                  </span>
                  <span className="font-medium">Amelia</span>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-border bg-card py-1 shadow-lg">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
