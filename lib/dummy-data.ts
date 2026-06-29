export type TravelType = "solo" | "family" | "friends" | "couple"
export type BudgetTier = "low" | "medium" | "luxury"

export type Trip = {
  id: string
  destination: string
  country: string
  image: string
  days: number
  budget: BudgetTier
  budgetUsd: number
  travelType: TravelType
  interests: string[]
  startDate: string
  status: "upcoming" | "draft" | "completed"
}

export type ItineraryItem = {
  time: string
  title: string
  description: string
  category: "sight" | "food" | "transport" | "stay" | "activity"
  cost: number
}

export type ItineraryDay = {
  day: number
  title: string
  summary: string
  items: ItineraryItem[]
}

export type Hotel = {
  name: string
  area: string
  rating: number
  pricePerNight: number
  perks: string[]
}

export type CostBreakdown = {
  category: string
  amount: number
}

export type GeneratedItinerary = {
  destination: string
  days: ItineraryDay[]
  totalCost: number
  hotels: Hotel[]
  transport: { mode: string; note: string; cost: number }[]
  costBreakdown: CostBreakdown[]
}

export const dummyTrips: Trip[] = [
  {
    id: "trip-1",
    destination: "Santorini",
    country: "Greece",
    image: "/images/hero-travel.jpg",
    days: 7,
    budget: "luxury",
    budgetUsd: 4200,
    travelType: "couple",
    interests: ["Food", "Culture", "Nature"],
    startDate: "May 12, 2026",
    status: "upcoming",
  },
  {
    id: "trip-2",
    destination: "Ubud",
    country: "Bali, Indonesia",
    image: "/images/dest-bali.jpg",
    days: 10,
    budget: "medium",
    budgetUsd: 1800,
    travelType: "solo",
    interests: ["Nature", "Adventure", "Culture"],
    startDate: "Jun 03, 2026",
    status: "upcoming",
  },
  {
    id: "trip-3",
    destination: "Tokyo",
    country: "Japan",
    image: "/images/dest-tokyo.jpg",
    days: 6,
    budget: "medium",
    budgetUsd: 2400,
    travelType: "friends",
    interests: ["Food", "Nightlife", "Culture"],
    startDate: "Jul 21, 2026",
    status: "draft",
  },
  {
    id: "trip-4",
    destination: "Reykjavík",
    country: "Iceland",
    image: "/images/dest-iceland.jpg",
    days: 5,
    budget: "luxury",
    budgetUsd: 3600,
    travelType: "family",
    interests: ["Adventure", "Nature"],
    startDate: "Sep 08, 2026",
    status: "draft",
  },
  {
    id: "trip-5",
    destination: "Paris",
    country: "France",
    image: "/images/dest-paris.jpg",
    days: 4,
    budget: "medium",
    budgetUsd: 1600,
    travelType: "couple",
    interests: ["Food", "Culture"],
    startDate: "Mar 02, 2026",
    status: "completed",
  },
]

export const dummyItinerary: GeneratedItinerary = {
  destination: "Santorini, Greece",
  totalCost: 4180,
  days: [
    {
      day: 1,
      title: "Arrival & Caldera Sunset",
      summary: "Settle in, taste the local sea breeze, and end with the iconic Oia sunset.",
      items: [
        {
          time: "10:30",
          title: "Arrive at JTR Airport",
          description: "Private transfer to your hotel in Imerovigli.",
          category: "transport",
          cost: 45,
        },
        {
          time: "13:00",
          title: "Lunch at Metaxi Mas",
          description: "Cliffside taverna with classic Greek mezze and ocean views.",
          category: "food",
          cost: 38,
        },
        {
          time: "17:30",
          title: "Sunset walk in Oia",
          description: "Wander the blue-domed alleys before catching the world-famous sunset.",
          category: "sight",
          cost: 0,
        },
        {
          time: "20:00",
          title: "Dinner at Ambrosia",
          description: "Romantic fine-dining terrace overlooking the caldera.",
          category: "food",
          cost: 95,
        },
      ],
    },
    {
      day: 2,
      title: "Volcano & Hot Springs",
      summary: "Catamaran cruise around the caldera with a stop at the volcanic hot springs.",
      items: [
        {
          time: "09:00",
          title: "Catamaran cruise",
          description: "Half-day sail with snorkel stops, BBQ lunch, and sunset views.",
          category: "activity",
          cost: 120,
        },
        {
          time: "13:00",
          title: "Lunch on board",
          description: "Greek BBQ with house wine prepared by the crew.",
          category: "food",
          cost: 0,
        },
        {
          time: "19:00",
          title: "Fira evening stroll",
          description: "Boutique shopping and gelato along the cliff path.",
          category: "sight",
          cost: 15,
        },
      ],
    },
    {
      day: 3,
      title: "Wine Country & Akrotiri",
      summary: "Step back 3,500 years and toast it off with assyrtiko at a local vineyard.",
      items: [
        {
          time: "10:00",
          title: "Akrotiri archaeological site",
          description: "The 'Pompeii of the Aegean' — guided 90-minute tour.",
          category: "sight",
          cost: 22,
        },
        {
          time: "12:30",
          title: "Red Beach hike",
          description: "Short hike to one of Santorini's most photographed beaches.",
          category: "activity",
          cost: 0,
        },
        {
          time: "15:00",
          title: "Santo Wines tasting",
          description: "Flight of 6 wines paired with local cheeses on the terrace.",
          category: "food",
          cost: 48,
        },
        {
          time: "20:30",
          title: "Dinner at Selene",
          description: "Modern Cycladic tasting menu with wine pairing.",
          category: "food",
          cost: 140,
        },
      ],
    },
    {
      day: 4,
      title: "Slow Day in Imerovigli",
      summary: "A relaxed pace — pool time, spa, and a private chef dinner.",
      items: [
        {
          time: "10:00",
          title: "Spa morning",
          description: "Couples massage and infinity pool access.",
          category: "activity",
          cost: 180,
        },
        {
          time: "14:00",
          title: "Lunch at home",
          description: "Light Mediterranean platter from a local deli.",
          category: "food",
          cost: 32,
        },
        {
          time: "20:00",
          title: "Private chef dinner",
          description: "5-course tasting served on your hotel terrace.",
          category: "food",
          cost: 220,
        },
      ],
    },
    {
      day: 5,
      title: "Departure",
      summary: "One last swim, a final coffee with a view, and onwards.",
      items: [
        {
          time: "09:00",
          title: "Breakfast on terrace",
          description: "Greek yogurt, honey, fresh figs, espresso.",
          category: "food",
          cost: 0,
        },
        {
          time: "11:30",
          title: "Transfer to airport",
          description: "Private car to JTR.",
          category: "transport",
          cost: 45,
        },
      ],
    },
  ],
  hotels: [
    {
      name: "Grace Hotel Santorini",
      area: "Imerovigli",
      rating: 4.9,
      pricePerNight: 620,
      perks: ["Caldera view", "Infinity pool", "Spa"],
    },
    {
      name: "Andronis Boutique",
      area: "Oia",
      rating: 4.8,
      pricePerNight: 540,
      perks: ["Private plunge pool", "Sunset terrace"],
    },
    {
      name: "Astra Suites",
      area: "Imerovigli",
      rating: 4.7,
      pricePerNight: 480,
      perks: ["Family rooms", "Breakfast included"],
    },
  ],
  transport: [
    { mode: "Flight (return)", note: "JFK ↔ JTR via Athens", cost: 980 },
    { mode: "Private transfer", note: "Airport ↔ Hotel both ways", cost: 90 },
    { mode: "ATV rental", note: "2 days for island exploration", cost: 110 },
  ],
  costBreakdown: [
    { category: "Flights", amount: 980 },
    { category: "Stay", amount: 2480 },
    { category: "Food", amount: 410 },
    { category: "Activities", amount: 220 },
    { category: "Transport", amount: 90 },
  ],
}

export const testimonials = [
  {
    name: "Amelia Hart",
    role: "Solo traveler",
    avatar: "/images/avatar-1.jpg",
    quote:
      "I planned a 10-day trip across Vietnam in under 5 minutes. Maro somehow knew I'd love the small coffee shops in Hanoi.",
  },
  {
    name: "Marcus Chen",
    role: "Family of 4",
    avatar: "/images/avatar-2.jpg",
    quote:
      "Budget optimization saved us $1,200 on our Iceland trip and the kid-friendly suggestions were genuinely thoughtful.",
  },
  {
    name: "Zara Okafor",
    role: "Friends getaway",
    avatar: "/images/avatar-3.jpg",
    quote:
      "The day-by-day pacing felt human, not robotic. Restaurants, nightlife, downtime — perfectly balanced.",
  },
]

export const adminUsers = [
  { id: "u1", name: "Amelia Hart", email: "amelia@example.com", trips: 4, joined: "Jan 2026", status: "active" },
  { id: "u2", name: "Marcus Chen", email: "marcus@example.com", trips: 7, joined: "Feb 2026", status: "active" },
  { id: "u3", name: "Zara Okafor", email: "zara@example.com", trips: 2, joined: "Feb 2026", status: "active" },
  { id: "u4", name: "Diego Alvarez", email: "diego@example.com", trips: 9, joined: "Mar 2026", status: "active" },
  { id: "u5", name: "Priya Sharma", email: "priya@example.com", trips: 1, joined: "Mar 2026", status: "suspended" },
  { id: "u6", name: "Tom Becker", email: "tom@example.com", trips: 3, joined: "Apr 2026", status: "active" },
]

export const adminAnalytics = {
  totalUsers: 12480,
  totalTrips: 38291,
  generatedThisWeek: 1842,
  avgTripDays: 6.4,
  weeklySignups: [
    { day: "Mon", users: 180 },
    { day: "Tue", users: 220 },
    { day: "Wed", users: 280 },
    { day: "Thu", users: 240 },
    { day: "Fri", users: 360 },
    { day: "Sat", users: 410 },
    { day: "Sun", users: 320 },
  ],
  tripsByType: [
    { type: "Solo", count: 9820 },
    { type: "Couple", count: 14210 },
    { type: "Family", count: 8900 },
    { type: "Friends", count: 5361 },
  ],
}

export function formatBudget(tier: BudgetTier) {
  return tier === "low" ? "Low" : tier === "medium" ? "Medium" : "Luxury"
}

export function formatTravelType(t: TravelType) {
  return t.charAt(0).toUpperCase() + t.slice(1)
}
