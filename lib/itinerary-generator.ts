import { generateSmartBudgetBreakdown } from "./destination-data";
import { TripPlanRequest, TripPlanResponse } from "./types";

export function generateTripPrompt(data: TripPlanRequest): string {
  return `
    You are an expert AI Travel Planner. Generate a highly personalized travel itinerary based on these strict constraints:

    - Destination: ${data.city}
    - Duration: ${data.numberOfDays} days
    - Budget Level: ${data.budget} (Crucial: Select activities, dining, and transit that strictly map to this budget tier).
    - Group Type: ${data.travelers} (Crucial: The pace and type of activities must fit this demographic. For example, 'Family' should include kid-friendly spots, 'Just Me' should focus on solo exploration/backpacking safety).

    Provide the response strictly as a JSON object matching this structure:
    {
      "tripOverview": "A brief summary of the vacation vibe tailored to the budget and group type.",
      "totalEstimatedCostRange": "A realistic estimation string matching the budget tier.",
      "itinerary": [
        {
          "day": 1,
          "theme": "Theme of the day",
          "activities": [
            {
              "time": "e.g., 09:00 AM",
              "placeName": "Name of the landmark or spot",
              "description": "Short explanation of what to do there.",
              "costEstimate": "Free, $, $$, or $$$ matching the budget tier"
            }
          ]
        }
      ]
    }

    Return ONLY raw JSON. Do not include markdown formatting like \`\`\`json.
  `;
}

export function transformTripPlanToItinerary(plan: TripPlanRequest, response: TripPlanResponse): any {
  const totalBudget = parseEstimatedCost(response.totalEstimatedCostRange);
  const dailyBudget = Math.round(totalBudget / plan.numberOfDays);

  return {
    title: `${plan.numberOfDays}-Day ${plan.city} Trip`,
    overview: response.tripOverview,
    totalBudget,
    dailyBudget,
    days: response.itinerary.map((day) => ({
      day: day.day,
      title: `Day ${day.day}: ${day.theme}`,
      theme: day.theme,
      activities: day.activities.map((activity) => ({
        time: activity.time,
        activity: activity.placeName,
        description: activity.description,
        estimatedCost: parseCostEstimate(activity.costEstimate),
      })),
    })),
    accommodation: [],
    transportation: [],
    costBreakdown: {
      accommodation: Math.round(totalBudget * 0.4),
      food: Math.round(totalBudget * 0.25),
      activities: Math.round(totalBudget * 0.2),
      transportation: Math.round(totalBudget * 0.1),
      other: Math.round(totalBudget * 0.05),
    },
    tips: [],
  };
}

function parseEstimatedCost(range: string): number {
  const match = range.match(/\$?(\d[\d,]*)/);
  if (match) return parseInt(match[1].replace(/,/g, ""), 10);
  return 1000;
}

function parseCostEstimate(estimate: string): number {
  const trimmed = estimate.trim().toLowerCase();
  if (trimmed === "free" || trimmed === "$") return 0;
  if (trimmed === "$$") return 50;
  if (trimmed === "$$$") return 150;
  const match = estimate.match(/\d+/);
  if (match) return parseInt(match[0], 10);
  return 30;
}

export function generateDetailedPrompt(
  destination: string,
  budget: "low" | "medium" | "luxury",
  days: number,
  interests: string[],
  travelers: number = 1,
  travelCompanion?: string
): string {
  const budgetBreakdown = generateSmartBudgetBreakdown(budget, days, destination, travelers);

  let prompt = `Generate a highly detailed and realistic ${days}-day trip itinerary for ${destination}.

**Trip Details:**
- Budget level: ${budget}
- Daily budget per person: $${Math.round(budgetBreakdown.dailyPerPerson)}
- Total budget: $${Math.round(budgetBreakdown.totalBudget)}
- Number of travelers: ${travelers}
- Travel companion type: ${travelCompanion || "solo"}
- Interests: ${interests.join(", ")}

`;

  prompt += `**Important Requirements:**
1. Each day must have UNIQUE activities - no repeating activities or "sunset viewing" every day
2. Include SPECIFIC, REAL locations and attractions (actual landmark names, museums, neighborhoods)
3. Times must be realistic and varied (not always 09:00 AM to 06:00 PM) - include early mornings, late nights, midday options
4. Activities must match the interests provided: ${interests.join(", ")}
5. Budget breakdown should be realistic for the destination and tier
6. Suggest SPECIFIC restaurant names, neighborhoods, or types, not just "local restaurant"
7. Each activity should have a realistic estimated cost appropriate for ${budget} budget
8. Include practical tips like opening hours, booking requirements, best time to visit
9. Research real attractions in ${destination} - use actual place names, not generic descriptions
10. Generate authentic, destination-specific content that could not work for other cities

**Response Format (VALID JSON ONLY - no markdown):**
{
  "title": "X-Day [Destination] Trip",
  "overview": "2-3 sentence description matching interests and destination characteristics",
  "totalBudget": ${Math.round(budgetBreakdown.totalBudget)},
  "dailyBudget": ${Math.round(budgetBreakdown.dailyPerPerson)},
  "days": [
    {
      "day": 1,
      "title": "Day 1 Theme (e.g., 'Arrival & Historic Centers')",
      "theme": "Specific theme or focus area",
      "activities": [
        {
          "time": "09:00 AM",
          "activity": "Specific real attraction or activity name",
          "description": "Detailed 1-2 sentence description with context and what to expect",
          "estimatedCost": 45
        }
      ]
    }
  ],
  "accommodation": [
    {
      "name": "Specific real hotel or neighborhood name",
      "type": "Hotel/Hostel/Airbnb/etc",
      "price": 85,
      "rating": "4.5/5",
      "description": "Why it's good and what area/neighborhood it's in"
    }
  ],
  "transportation": [
    {
      "type": "Specific transport type",
      "cost": 15,
      "description": "When and why you'd use this (e.g., metro from airport to city center)"
    }
  ],
  "costBreakdown": {
    "accommodation": ${Math.round(budgetBreakdown.accommodation)},
    "food": ${Math.round(budgetBreakdown.food)},
    "activities": ${Math.round(budgetBreakdown.activities)},
    "transportation": ${Math.round(budgetBreakdown.transportation)},
    "other": ${Math.round(budgetBreakdown.other)}
  },
  "tips": [
    "Specific, actionable tip 1 for ${destination} with local context",
    "Specific, actionable tip 2",
    "Specific, actionable tip 3",
    "Specific, actionable tip 4",
    "Specific, actionable tip 5"
  ]
}

**Critical:** Generate content SPECIFIC to ${destination}. Include real place names, neighborhoods, attractions that actually exist there. Every day should be different with varied times and activities.`;

  return prompt;
}

export function generateFallbackItinerary(
  destination: string,
  budget: "low" | "medium" | "luxury",
  days: number,
  interests: string[],
  travelCompanion?: string
) {
  const budgetBreakdown = generateSmartBudgetBreakdown(budget, days, destination, 1);

  // Generate realistic itinerary for ANY destination without needing a database
  // This uses intelligent scheduling patterns that work for most destinations

  // Varied activity times to prevent repetition
  const timePatterns = [
    [
      { time: "08:00 AM", theme: "Morning activity" },
      { time: "11:30 AM", theme: "Mid-morning exploration" },
      { time: "03:00 PM", theme: "Afternoon experience" },
      { time: "07:00 PM", theme: "Evening dining" },
    ],
    [
      { time: "07:00 AM", theme: "Early morning start" },
      { time: "12:00 PM", theme: "Lunch & local culture" },
      { time: "04:00 PM", theme: "Late afternoon activity" },
    ],
    [
      { time: "09:30 AM", theme: "Late morning start" },
      { time: "01:00 PM", theme: "Lunch experience" },
      { time: "06:00 PM", theme: "Sunset activity" },
      { time: "08:30 PM", theme: "Evening experience" },
    ],
    [
      { time: "06:00 AM", theme: "Pre-dawn/sunrise activity" },
      { time: "12:30 PM", theme: "Midday exploration" },
      { time: "05:00 PM", theme: "Late afternoon" },
    ],
    [
      { time: "10:00 AM", theme: "Morning exploration" },
      { time: "02:00 PM", theme: "Afternoon adventure" },
      { time: "07:30 PM", theme: "Evening entertainment" },
    ],
  ];

  // Generic activity templates that work for most destinations
  const activityTemplates = [
    "historic district exploration",
    "local market visit",
    "museum or cultural site",
    "nature or park activity",
    "neighborhood walking tour",
    "local cuisine experience",
    "shopping district",
    "photography spot",
    "adventure activity",
    "religious or spiritual site",
    "local transportation experience",
    "nightlife or entertainment",
    "street food tour",
    "public transportation journey",
    "garden or botanical site",
  ];

  const dailyItinerary = Array.from({ length: days }, (_, dayIdx) => {
    const dayNum = dayIdx + 1;
    const timePattern = timePatterns[dayIdx % timePatterns.length];
    
    const activities = timePattern.map((slot, idx) => {
      const activityIdx = (dayIdx * 3 + idx) % activityTemplates.length;
      const baseCost = [35, 50, 45, 40, 60, 25, 55, 30, 75, 20][idx % 10];
      const costAdjustment = budget === "luxury" ? 1.8 : budget === "medium" ? 1 : 0.6;

      return {
        time: slot.time,
        activity: `${destination}: ${activityTemplates[activityIdx]}`,
        description: `Experience ${activityTemplates[activityIdx]} in ${destination}. ${slot.theme}.`,
        estimatedCost: Math.round(baseCost * costAdjustment),
      };
    });

    return {
      day: dayNum,
      title: `Day ${dayNum}: ${interests[(dayIdx) % interests.length] || "Exploration"}`,
      theme: interests[(dayIdx) % interests.length] || "General Experience",
      activities,
    };
  });

  // Generate realistic accommodation suggestions
  const accommodationTypes = [
    { name: "Central Location Hotel", type: "Hotel", desc: "centrally located for easy access to attractions" },
    { name: "Local Neighborhood Airbnb", type: "Airbnb", desc: "authentic local experience in residential area" },
    { name: "Budget Hostel", type: "Hostel", desc: "budget-friendly with social atmosphere" },
    { name: "Boutique Inn", type: "Inn", desc: "charming local accommodation" },
    { name: "Business Hotel", type: "Hotel", desc: "comfortable and practical accommodation" },
  ];

  const selectedAccommodations = accommodationTypes.slice(0, 3).map((acc, idx) => {
    const priceMultiplier = budget === "luxury" ? 2.5 : budget === "medium" ? 1.2 : 0.7;
    const basePrice = 80;
    
    return {
      name: acc.name,
      type: acc.type,
      price: Math.round(basePrice * priceMultiplier),
      rating: (4 + Math.random() * 0.5).toFixed(1) + "/5",
      description: `${acc.type} option in ${destination}, ${acc.desc}.`,
    };
  });

  // Generic transport options that work everywhere
  const transportOptions = [
    { type: "Airport Transfer/Taxi", avgCost: budget === "luxury" ? 45 : 25 },
    { type: "Public Transportation (daily pass)", avgCost: budget === "luxury" ? 15 : 8 },
    { type: "Local Taxi/Rideshare", avgCost: budget === "luxury" ? 20 : 10 },
    { type: "Walking Tours", avgCost: 0 },
    { type: "Rental Bike", avgCost: 15 },
  ];

  const companionText = travelCompanion ? ` with ${travelCompanion} travel` : "";
  
  const tips = [
    `Book accommodations in advance to save ${budget === "luxury" ? "10-15%" : "20-30%"} on ${budget} options`,
    `Visit main attractions early in the morning to avoid crowds`,
    `Eat where locals eat - street food and local restaurants offer authentic experiences and better value`,
    `Use public transportation to experience local culture and save money on transport`,
    `Learn basic local phrases - locals appreciate visitors making an effort`,
    `Research opening hours and book tickets in advance for major attractions`,
    `Stay in neighborhoods slightly outside the tourist center for better rates and authentic experiences`,
  ];

  return {
    title: `${days}-Day ${destination} Trip`,
    overview: `Discover the best of ${destination} in ${days} days${companionText} with a focus on ${interests.join(", ")}. This itinerary offers a mix of iconic experiences, local culture, and authentic dining opportunities tailored to your ${budget} budget.`,
    totalBudget: Math.round(budgetBreakdown.totalBudget),
    dailyBudget: Math.round(budgetBreakdown.dailyPerPerson),
    days: dailyItinerary,
    accommodation: selectedAccommodations,
    transportation: transportOptions.map(t => ({
      type: t.type,
      cost: t.avgCost,
      description: `${t.type} in ${destination}: approximately $${t.avgCost} per use`,
    })),
    costBreakdown: {
      accommodation: Math.round(budgetBreakdown.accommodation),
      food: Math.round(budgetBreakdown.food),
      activities: Math.round(budgetBreakdown.activities),
      transportation: Math.round(budgetBreakdown.transportation),
      other: Math.round(budgetBreakdown.other),
    },
    tips,
  };
}
