"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
   Home,
   Sparkles,
   Map as MapIcon,
   Heart,
   HelpCircle,
   LogOut,
   Menu,
   X,
   ShieldCheck,
} from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const userNav = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/dashboard/generate", label: "AI Trip Generator", icon: Sparkles, badge: "New" },
  { href: "/dashboard/trips", label: "My Trips", icon: MapIcon },
  { href: "/dashboard/saved", label: "Saved Places", icon: Heart },
]

const bottomNav = [
  { href: "/help", label: "Help", icon: HelpCircle },
]

const adminNav = [
  { href: "/admin", label: "Overview", icon: Home },
  { href: "/admin/users", label: "Users", icon: ShieldCheck },
  { href: "/admin/trips", label: "Trips", icon: MapIcon },
]

export function SidebarNav({ variant = "user" }: { variant?: "user" | "admin" }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const items = variant === "admin" ? adminNav : userNav

  function isActive(href: string) {
    if (href === "/dashboard" || href === "/admin") return pathname === href
    return pathname === href || pathname.startsWith(href + "/")
  }

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-5">
        <Logo />
        {variant === "admin" && (
          <span className="ml-2 rounded-full bg-accent/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent-foreground">
            Admin
          </span>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-3" aria-label="Sidebar">
        {items.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className={cn("h-[1.05rem] w-[1.05rem]", active ? "text-primary" : "")} />
              <span className="flex-1">{item.label}</span>
              {"badge" in item && typeof item.badge === "string" && (
                <span className="rounded-full bg-accent/40 px-1.5 py-0.5 text-[10px] font-medium text-accent-foreground">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="space-y-1 px-3 pb-4">
        {variant === "user" &&
          bottomNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <item.icon className="h-[1.05rem] w-[1.05rem]" />
              {item.label}
            </Link>
          ))}

        <Link
          href="/"
          className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <LogOut className="h-[1.05rem] w-[1.05rem]" />
          Sign out
        </Link>

        <div className="mt-3 rounded-2xl border border-border bg-muted/40 p-4">
          <p className="font-serif text-base">Upgrade to Pro</p>
          <p className="mt-1 text-xs text-muted-foreground">Unlimited regenerations & PDF exports.</p>
          <Button size="sm" className="mt-3 w-full rounded-full">
            Upgrade
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile trigger */}
      <div className="flex h-14 items-center justify-between border-b border-border bg-background px-4 lg:hidden">
        <Logo />
        <Button variant="ghost" size="icon" aria-label="Open navigation" onClick={() => setMobileOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <aside className="absolute left-0 top-0 h-full w-72 max-w-[80%] border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
            <div className="flex justify-end p-2">
              <Button variant="ghost" size="icon" aria-label="Close" onClick={() => setMobileOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            {content}
          </aside>
        </div>
      )}

      {/* Desktop */}
      <aside className="hidden h-screen w-64 shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:sticky lg:top-0 lg:block">
        {content}
      </aside>
    </>
  )
}
