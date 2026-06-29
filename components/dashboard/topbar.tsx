"use client"

import Image from "next/image"
import { Bell, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import * as React from "react"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { useNotifications } from "@/components/notifications-provider"

export function Topbar({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  const router = useRouter()
  const [profileOpen, setProfileOpen] = React.useState(false)
  const [notifOpen, setNotifOpen] = React.useState(false)
  const { notifications, clearAll } = useNotifications()

  function handleLogout() {
    setProfileOpen(false)
    router.replace("/")
  }

  return (
    <div className="flex flex-col gap-4 border-b border-border bg-background/80 px-4 py-5 backdrop-blur md:px-8 md:py-6">
      <div className="flex items-center justify-between gap-3">
        <div className="ml-auto flex items-center gap-1.5">
          <ThemeToggle />
          <Popover open={notifOpen} onOpenChange={setNotifOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
                <Bell className="h-[1.1rem] w-[1.1rem]" />
                {notifications.length > 0 && (
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="flex items-center justify-between border-b border-border p-3">
                <p className="text-sm font-semibold">Notifications</p>
                {notifications.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto px-2 py-1 text-xs text-muted-foreground"
                    onClick={clearAll}
                  >
                    Clear all
                  </Button>
                )}
              </div>
              <ScrollArea className="h-80">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">No notifications yet</div>
                ) : (
                  <div className="p-2">
                    {notifications.map((n) => {
                      const timeAgo = formatDistanceToNow(new Date(n.generatedAt), { addSuffix: true })
                      return (
                        <div
                          key={n.id}
                          className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{n.destination}</p>
                            <p className="text-xs text-muted-foreground">
                              {n.days}-day trip generated · {timeAgo}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </ScrollArea>
            </PopoverContent>
          </Popover>
          <div className="relative">
            <button
              onClick={() => setProfileOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-1.5 py-1 pr-3 text-sm hover:bg-muted"
            >
              <span className="relative h-7 w-7 overflow-hidden rounded-full">
                <Image src="/images/avatar-1.jpg" alt="Amelia Hart" fill sizes="28px" className="object-cover" />
              </span>
              <span className="hidden font-medium sm:inline">Amelia</span>
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
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl tracking-tight md:text-4xl">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground md:text-base">{subtitle}</p>}
        </div>
        {action}
      </div>
    </div>
  )
}
