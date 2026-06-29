"use client"

import * as React from "react"
import Image from "next/image"
import { MoreHorizontal, Search, Eye, Trash2, FileEdit } from "lucide-react"
import { Topbar } from "@/components/dashboard/topbar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { formatBudget, formatTravelType, type Trip } from "@/lib/dummy-data"
import { toast } from "sonner"
import Link from "next/link"

export default function AdminTripsPage() {
  const [query, setQuery] = React.useState("")
  const [trips, setTrips] = React.useState<Trip[]>([])

  React.useEffect(() => {
    fetch("/api/trips")
      .then((res) => res.json() as Promise<Trip[]>)
      .then((data) => setTrips(data))
      .catch((err) => console.error("Failed to fetch trips:", err))
  }, [])

  const filtered = trips.filter(
    (t) =>
      t.destination.toLowerCase().includes(query.toLowerCase()) ||
      t.country.toLowerCase().includes(query.toLowerCase()),
  )

  function remove(id: string) {
    setTrips((arr) => arr.filter((t) => t.id !== id))
    toast.success("Trip deleted")
  }

  return (
    <>
      <Topbar title="Trips" subtitle={`${trips.length} total · review and moderate user itineraries.`} />

      <div className="flex-1 px-4 py-8 md:px-8">
        <div className="rounded-3xl border border-border bg-card text-card-foreground">
          <div className="flex flex-wrap items-center gap-3 border-b border-border p-4 md:p-5">
            <div className="relative flex-1 md:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations…"
                className="rounded-full pl-9"
              />
            </div>
            <Button variant="outline" className="rounded-full bg-transparent">
              Export CSV
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Destination</TableHead>
                  <TableHead className="hidden md:table-cell">Days</TableHead>
                  <TableHead className="hidden sm:table-cell">Budget</TableHead>
                  <TableHead className="hidden lg:table-cell">Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={t.image || "/placeholder.svg"}
                            alt=""
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </span>
                        <div>
                          <p className="font-medium leading-tight">{t.destination}</p>
                          <p className="text-xs text-muted-foreground">{t.country}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{t.days}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {formatBudget(t.budget)} · ${t.budgetUsd.toLocaleString()}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{formatTravelType(t.travelType)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          t.status === "upcoming"
                            ? "border-primary/20 bg-primary/10 capitalize text-primary"
                            : t.status === "completed"
                              ? "border-accent/40 bg-accent/30 capitalize text-accent-foreground"
                              : "border-border bg-muted capitalize text-muted-foreground"
                        }
                      >
                        {t.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" aria-label={`Actions for ${t.destination}`}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/trips/${t.id}`}>
                              <Eye className="h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info("Edit coming soon")}>
                            <FileEdit className="h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => remove(t.id)} className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                            Delete trip
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="py-12 text-center text-sm text-muted-foreground">
                      No trips match &ldquo;{query}&rdquo;.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}
