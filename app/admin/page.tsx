"use client"

import { Users, Globe2, Sparkles, Calendar } from "lucide-react"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, PieChart, Pie, Cell } from "recharts"
import { Topbar } from "@/components/dashboard/topbar"
import { adminAnalytics, dummyTrips } from "@/lib/dummy-data"
import { TripCard } from "@/components/dashboard/trip-card"

const stats = [
  { label: "Total users", value: adminAnalytics.totalUsers.toLocaleString(), icon: Users, hint: "+342 this week" },
  { label: "Trips created", value: adminAnalytics.totalTrips.toLocaleString(), icon: Globe2, hint: "+1,842 this week" },
  { label: "AI generations", value: "84,012", icon: Sparkles, hint: "All-time" },
  { label: "Avg trip days", value: adminAnalytics.avgTripDays.toString(), icon: Calendar, hint: "Stable" },
]

const usersConfig = {
  users: { label: "Signups", color: "var(--chart-1)" },
} satisfies ChartConfig

const typesConfig = {
  Solo: { label: "Solo", color: "var(--chart-1)" },
  Couple: { label: "Couple", color: "var(--chart-2)" },
  Family: { label: "Family", color: "var(--chart-3)" },
  Friends: { label: "Friends", color: "var(--chart-4)" },
} satisfies ChartConfig

const pieColors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"]

export default function AdminPage() {
  return (
    <>
      <Topbar title="Admin Overview" subtitle="A quick pulse on Maro usage and growth." />
      <div className="flex-1 space-y-8 px-4 py-8 md:px-8">
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

        {/* Charts */}
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-3xl border border-border bg-card p-6 lg:col-span-2">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Weekly signups</p>
                <p className="mt-1 font-serif text-2xl tracking-tight">2,010 new users</p>
              </div>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">+18%</span>
            </div>
            <ChartContainer config={usersConfig} className="mt-5 h-64 w-full">
              <AreaChart data={adminAnalytics.weeklySignups} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-users)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-users)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="var(--color-users)"
                  strokeWidth={2}
                  fill="url(#fillUsers)"
                />
              </AreaChart>
            </ChartContainer>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Trips by traveler type</p>
            <p className="mt-1 font-serif text-2xl tracking-tight">38,291 trips</p>
            <ChartContainer config={typesConfig} className="mt-5 h-64 w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="type" />} />
                <Pie
                  data={adminAnalytics.tripsByType}
                  dataKey="count"
                  nameKey="type"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {adminAnalytics.tripsByType.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <ul className="mt-3 space-y-1.5 text-sm">
              {adminAnalytics.tripsByType.map((t, i) => (
                <li key={t.type} className="flex items-center gap-2">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ background: pieColors[i % pieColors.length] }}
                  />
                  <span className="flex-1">{t.type}</span>
                  <span className="text-muted-foreground">{t.count.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recent trips */}
        <section>
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="font-serif text-2xl tracking-tight md:text-3xl">Recent trips</h2>
              <p className="mt-1 text-sm text-muted-foreground">Latest itineraries generated across the platform.</p>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {dummyTrips.slice(0, 3).map((t) => (
              <TripCard key={t.id} trip={t} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
