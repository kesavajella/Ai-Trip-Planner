// Real destination-specific data for AI-powered trip generation
export const destinationDatabase: Record<string, {
  attractions: string[]
  restaurants: string[]
  hotels: { name: string; type: string; pricePerNight: { low: number; medium: number; luxury: number } }[]
  transport: { type: string; avgCost: number }[]
  costMultiplier: Record<string, number> // low, medium, luxury multipliers
  timezone: string
  bestTime: string
  visaInfo?: string
}> = {
  "Santorini, Greece": {
    attractions: [
      "Oia - stunning sunset views and white-washed buildings",
      "Akrotiri - ancient Minoan city ruins",
      "Red Beach - unique red volcanic sand",
      "Fira - capital town with cliff-side views",
      "Santo Winery - local wine tasting",
      "Kamari Beach - black sand beach and water sports",
      "Perissa Beach - black sand beach with tavernas",
      "Volcanic crater boat tour",
      "Thirassia Island day trip",
      "Amoudi Bay - fishing village and fresh seafood"
    ],
    restaurants: [
      "Fava Restaurant (Oia) - Mediterranean cuisine with sunset views",
      "Ammoudi Fish Taverna - fresh caught fish",
      "1800-Floga (Fira) - traditional Greek with views",
      "Selene - fine dining, modern Greek",
      "Thalami - seafood specialties",
      "Chromata - casual Greek fare, great prices",
      "Koukoumavlos - upscale traditional"
    ],
    hotels: [
      {
        name: "Astra Suites",
        type: "Luxury Resort",
        pricePerNight: { low: 250, medium: 350, luxury: 500 }
      },
      {
        name: "Vedema Resort",
        type: "Luxury Resort",
        pricePerNight: { low: 200, medium: 300, luxury: 450 }
      },
      {
        name: "San Antonio Rooms",
        type: "Boutique Hotel",
        pricePerNight: { low: 80, medium: 120, luxury: 200 }
      },
      {
        name: "Canaves Oia Suites",
        type: "Cave Hotel",
        pricePerNight: { low: 150, medium: 250, luxury: 400 }
      },
      {
        name: "Santorini Secret",
        type: "Guesthouse",
        pricePerNight: { low: 45, medium: 75, luxury: 120 }
      }
    ],
    transport: [
      { type: "Airport Transfer Taxi", avgCost: 35 },
      { type: "Local Bus (daily pass)", avgCost: 10 },
      { type: "Ferry to Thirassia Island", avgCost: 30 },
      { type: "Car Rental (per day)", avgCost: 40 },
      { type: "ATV Rental (per day)", avgCost: 25 }
    ],
    costMultiplier: { low: 0.8, medium: 1, luxury: 1.8 },
    timezone: "EEST",
    bestTime: "April-May, September-October",
    visaInfo: "EU citizens no visa needed. US/Canada/Australia: 90 days visa-free"
  },

  "Bali, Indonesia": {
    attractions: [
      "Ubud Monkey Forest - sacred forest with free-roaming monkeys",
      "Tegallalang Rice Terraces - iconic emerald green rice paddies",
      "Tanah Lot Temple - sea temple with dramatic sunset",
      "Sacred Monkey Forest Sanctuary - spiritual and natural wonder",
      "Gili Islands - day trip for snorkeling",
      "Mount Batur sunrise hike - volcanic peak trek",
      "Uluwatu Temple - clifftop temple with ocean views",
      "Seminyak Beach - trendy beach town",
      "Sanur Beach - calm waters and local vibe",
      "Ubud Palace & Arts Market"
    ],
    restaurants: [
      "Warung Bodag Maliah - traditional Balinese, rice field views",
      "Nasi Campur Sopa - authentic cheap local eats",
      "Warung Pulau Kelapa - seafood on beach",
      "Warung Biah - hidden local gem",
      "Karsa Kafe - traditional indoor-outdoor Balinese",
      "Mozaic Beach Club - fine dining, multi-course",
      "Locavore - farm-to-table fine dining",
      "Nyang Nyang Cafe - sunset views, casual"
    ],
    hotels: [
      {
        name: "Four Seasons Resort Bali",
        type: "Luxury Resort",
        pricePerNight: { low: 400, medium: 550, luxury: 800 }
      },
      {
        name: "Mandapa Ritz-Carlton",
        type: "Luxury Resort",
        pricePerNight: { low: 350, medium: 500, luxury: 750 }
      },
      {
        name: "Alila Ubud",
        type: "Boutique Hotel",
        pricePerNight: { low: 120, medium: 180, luxury: 280 }
      },
      {
        name: "The Kayon Jungle Resort",
        type: "Jungle Resort",
        pricePerNight: { low: 100, medium: 150, luxury: 250 }
      },
      {
        name: "Sayan Guest House",
        type: "Guesthouse",
        pricePerNight: { low: 25, medium: 40, luxury: 80 }
      }
    ],
    transport: [
      { type: "Airport Transfer", avgCost: 15 },
      { type: "Local Motorbike Taxi", avgCost: 2 },
      { type: "Car Rental with Driver (daily)", avgCost: 30 },
      { type: "Scooter Rental (daily)", avgCost: 8 },
      { type: "Ferry to Gili Islands", avgCost: 35 }
    ],
    costMultiplier: { low: 0.6, medium: 1, luxury: 1.6 },
    timezone: "WITA",
    bestTime: "April-October (dry season)",
    visaInfo: "Most nationalities get 30-day visa on arrival or visa-free entry"
  },

  "Tokyo, Japan": {
    attractions: [
      "Shibuya Crossing - world's busiest pedestrian crossing",
      "Senso-ji Temple - Tokyo's oldest temple",
      "Tokyo Skytree - world's tallest tower with observation decks",
      "Meiji Shrine - peaceful shrine in forested area",
      "Harajuku - trendy fashion and culture district",
      "Tsukiji Outer Market - fresh seafood and street food",
      "Imperial Palace - historic royal residence",
      "Akihabara - electronics and gaming district",
      "Shinjuku - neon-lit entertainment district",
      "Asakusa - traditional Tokyo culture"
    ],
    restaurants: [
      "Tsukiji Outer Market stalls - fresh sushi and seafood",
      "Omoide Yokocho - alley of tiny yakitori joints",
      "Nabezo - hot pot restaurants",
      "Gonpachi Nishi-Azabu - izakaya (Japanese pub)",
      "Mizutaki - chicken hot pot specialty",
      "Hakone Ekiden - casual noodle shops everywhere",
      "Sukiyabashi Jiro - world-famous sushi (hard to book)",
      "Ichiran - tonkotsu ramen chain"
    ],
    hotels: [
      {
        name: "The Peninsula Tokyo",
        type: "Luxury Hotel",
        pricePerNight: { low: 300, medium: 450, luxury: 650 }
      },
      {
        name: "Mandarin Oriental Tokyo",
        type: "Luxury Hotel",
        pricePerNight: { low: 350, medium: 500, luxury: 700 }
      },
      {
        name: "Hotel New Otani",
        type: "Business Hotel",
        pricePerNight: { low: 100, medium: 150, luxury: 250 }
      },
      {
        name: "Hotel Gracery Shinjuku",
        type: "Mid-range Hotel",
        pricePerNight: { low: 70, medium: 120, luxury: 180 }
      },
      {
        name: "Sakura Hotel Hatagaya",
        type: "Hostel/Budget",
        pricePerNight: { low: 30, medium: 50, luxury: 100 }
      }
    ],
    transport: [
      { type: "Airport Express Train", avgCost: 30 },
      { type: "IC Card (daily travel)", avgCost: 15 },
      { type: "Taxi (short distance)", avgCost: 10 },
      { type: "Day Pass - unlimited subway", avgCost: 12 },
      { type: "Shinkansen to nearby cities", avgCost: 100 }
    ],
    costMultiplier: { low: 1, medium: 1.2, luxury: 1.8 },
    timezone: "JST",
    bestTime: "March-May, September-November",
    visaInfo: "US/EU/Canada/Australia: 90 days visa-free"
  },

  "Delhi, India": {
    attractions: [
      "Red Fort - UNESCO world heritage fortress",
      "Chandni Chowk - bustling ancient market street",
      "Jama Masjid - India's largest mosque",
      "India Gate - iconic war memorial",
      "Rashtrapati Bhavan - presidential residence",
      "National Museum - Indian art and history",
      "Humayun's Tomb - Mughal architecture masterpiece",
      "Qutub Minar - ancient minaret tower",
      "Lodhi Garden - peaceful garden with ruins",
      "Dilli Haat - open-air craft market"
    ],
    restaurants: [
      "Parikrama - rotating rooftop fine dining",
      "Karim's - legendary Mughlai restaurant since 1913",
      "Paranthe Wali Gali - street of paratha shops",
      "Nizam's Kathi Kabab - famous kebabs",
      "Rajdhani - traditional Rajasthani thali",
      "Bukhara - tandoori specialists",
      "Gulati - North Indian classics",
      "Chatni Vihar - street food chain"
    ],
    hotels: [
      {
        name: "ITC Maurya",
        type: "Luxury Hotel",
        pricePerNight: { low: 180, medium: 250, luxury: 380 }
      },
      {
        name: "The Claridges",
        type: "Luxury Hotel",
        pricePerNight: { low: 150, medium: 220, luxury: 340 }
      },
      {
        name: "Hotel Diplomat",
        type: "Mid-range Hotel",
        pricePerNight: { low: 50, medium: 80, luxury: 120 }
      },
      {
        name: "Hotel Aman",
        type: "Budget Hotel",
        pricePerNight: { low: 25, medium: 40, luxury: 70 }
      },
      {
        name: "Backpacker Panda",
        type: "Hostel",
        pricePerNight: { low: 10, medium: 15, luxury: 30 }
      }
    ],
    transport: [
      { type: "Airport Transfer", avgCost: 15 },
      { type: "Metro Card (daily)", avgCost: 3 },
      { type: "Auto-rickshaw ride", avgCost: 2 },
      { type: "Taxi/Uber ride", avgCost: 5 },
      { type: "Day sightseeing tour", avgCost: 20 }
    ],
    costMultiplier: { low: 0.4, medium: 1, luxury: 1.5 },
    timezone: "IST",
    bestTime: "October-March (winter)",
    visaInfo: "Most nationalities need visa. US: e-visa available. EU: need visa from embassy"
  },

  "Paris, France": {
    attractions: [
      "Eiffel Tower - iconic iron monument",
      "Louvre Museum - world's largest art museum",
      "Notre-Dame Cathedral - Gothic masterpiece (currently under restoration)",
      "Arc de Triomphe - war memorial monument",
      "Sacré-Cœur Basilica - white dome on Montmartre hill",
      "Champs-Élysées - famous avenue with shops",
      "Versailles Palace - royal palace and gardens day trip",
      "Musée d'Orsay - Impressionist art museum",
      "Montmartre - bohemian district with artist heritage",
      "Cathédrale de Chartres - stunning Gothic cathedral, day trip"
    ],
    restaurants: [
      "Le Petit Pontoise - classic French bistro",
      "Café de Flore - historic cafe, high prices but iconic",
      "L'As du Fallafel - falafel on Rue des Rosiers",
      "Merci - trendy cafe in concept store",
      "Ladurée - famous macarons and tea",
      "Bouchon Aillerie - French classics, reasonable",
      "L'Ami Jean - cozy bistro, local favorite",
      "Street crepes - €3-5 throughout the city"
    ],
    hotels: [
      {
        name: "Le Meurice",
        type: "Luxury Hotel",
        pricePerNight: { low: 400, medium: 600, luxury: 900 }
      },
      {
        name: "Hotel Ritz Paris",
        type: "Luxury Hotel",
        pricePerNight: { low: 450, medium: 700, luxury: 1000 }
      },
      {
        name: "Hotel Des Invalides",
        type: "Mid-range Hotel",
        pricePerNight: { low: 100, medium: 160, luxury: 250 }
      },
      {
        name: "Hotel Le Marais",
        type: "Boutique Hotel",
        pricePerNight: { low: 80, medium: 130, luxury: 200 }
      },
      {
        name: "Generator Paris",
        type: "Hostel/Budget",
        pricePerNight: { low: 30, medium: 50, luxury: 100 }
      }
    ],
    transport: [
      { type: "CDG Airport Express", avgCost: 12 },
      { type: "Paris Metro 10-ticket pack", avgCost: 17 },
      { type: "Taxi ride", avgCost: 15 },
      { type: "Velib (bike rental)", avgCost: 5 },
      { type: "Train to Versailles", avgCost: 5 }
    ],
    costMultiplier: { low: 1.2, medium: 1, luxury: 1.8 },
    timezone: "CET",
    bestTime: "April-June, September-October",
    visaInfo: "Schengen visa required for most non-EU countries"
  },

  "Barcelona, Spain": {
    attractions: [
      "Sagrada Familia - Gaudí's unfinished basilica masterpiece",
      "Park Güell - colorful mosaic park with city views",
      "Gothic Quarter - medieval narrow streets and architecture",
      "Casa Batlló - Gaudí's surreal apartment building",
      "La Rambla - famous tree-lined pedestrian avenue",
      "Barcelona Cathedral - Gothic cathedral in city center",
      "Montjuïc - hill with museums, castle, and gardens",
      "Picasso Museum - extensive Picasso collection",
      "Tibidabo - amusement park with views",
      "Bunkers del Carmel - hidden rooftop views"
    ],
    restaurants: [
      "Cervecería Catalana - tapas and vermouth",
      "El Xampanyet - historic vermouth bar",
      "La Boqueria Market - fresh seafood and produce",
      "Cinc Sentits - Michelin-starred modern Catalan",
      "Quimet & Quimet - legendary montaditos",
      "Can Culleretes - oldest restaurant in Barcelona (1786)",
      "Els Pescadors - upscale seafood",
      "Street pinchos - €2-4 in Gothic Quarter"
    ],
    hotels: [
      {
        name: "Hotel Arts Barcelona",
        type: "Luxury Hotel",
        pricePerNight: { low: 280, medium: 400, luxury: 600 }
      },
      {
        name: "Mandarin Oriental Barcelona",
        type: "Luxury Hotel",
        pricePerNight: { low: 300, medium: 450, luxury: 650 }
      },
      {
        name: "Mercer Hotel Barcelona",
        type: "Boutique Hotel",
        pricePerNight: { low: 120, medium: 180, luxury: 300 }
      },
      {
        name: "Hotel Neri",
        type: "Mid-range Hotel",
        pricePerNight: { low: 80, medium: 130, luxury: 200 }
      },
      {
        name: "Hostel Camino",
        type: "Hostel/Budget",
        pricePerNight: { low: 25, medium: 45, luxury: 90 }
      }
    ],
    transport: [
      { type: "Airport Bus/Train", avgCost: 6 },
      { type: "T-Casual 10-ticket card", avgCost: 11 },
      { type: "Taxi", avgCost: 12 },
      { type: "City tour bus (hop-on)", avgCost: 25 },
      { type: "Train to Montserrat", avgCost: 8 }
    ],
    costMultiplier: { low: 0.9, medium: 1, luxury: 1.7 },
    timezone: "CET",
    bestTime: "April-May, September-October",
    visaInfo: "Schengen visa required for most non-EU countries"
  }
};

export function getDestinationInfo(destination: string) {
  // Try exact match first
  if (destinationDatabase[destination]) {
    return destinationDatabase[destination];
  }

  // Try partial match
  const partial = Object.keys(destinationDatabase).find(
    key => destination.toLowerCase().includes(key.toLowerCase()) || 
            key.toLowerCase().includes(destination.toLowerCase())
  );

  if (partial) {
    return destinationDatabase[partial];
  }

  // Return null for unknown destinations - this is no longer an error
  // The itinerary generator will use fallback generation for any destination
  return null;
}

export function generateSmartBudgetBreakdown(
  budget: "low" | "medium" | "luxury",
  days: number,
  destination: string,
  travelers: number = 1
) {
  const destInfo = getDestinationInfo(destination);
  // Use destination-specific multiplier if available, otherwise use smart defaults
  let multiplier = destInfo?.costMultiplier[budget] ?? 1;
  
  // For unknown destinations, estimate multiplier based on common knowledge
  if (!destInfo) {
    // This is optional - helps with realistic budgets for unknown destinations
    // Default is 1x, which works for most mid-range destinations
    multiplier = 1;
  }

  // Base daily costs per person (in USD)
  const baseCosts: Record<string, Record<string, number>> = {
    low: {
      accommodation: 40,
      food: 20,
      activities: 20,
      transport: 10,
      other: 10,
    },
    medium: {
      accommodation: 100,
      food: 50,
      activities: 40,
      transport: 20,
      other: 20,
    },
    luxury: {
      accommodation: 250,
      food: 150,
      activities: 100,
      transport: 50,
      other: 50,
    },
  };

  const costs = baseCosts[budget];
  const adjusted = Object.fromEntries(
    Object.entries(costs).map(([key, val]) => [key, Math.round(val * multiplier)])
  );

  return {
    accommodation: adjusted.accommodation * days * travelers,
    food: adjusted.food * days * travelers,
    activities: adjusted.activities * days * travelers,
    transportation: adjusted.transport * days * travelers,
    other: adjusted.other * days * travelers,
    dailyPerPerson: Object.values(adjusted).reduce((a, b) => a + b, 0),
    totalBudget: days * travelers * Object.values(adjusted).reduce((a, b) => a + b, 0),
  };
}

export const tripPlanCities: string[] = Array.from(new Set<string>([
  ...Object.keys(destinationDatabase).map((k) => k.split(",")[0].trim()),
  "New York",
  "London",
  "Rome",
  "Barcelona",
  "Amsterdam",
  "Berlin",
  "Vienna",
  "Prague",
  "Budapest",
  "Istanbul",
  "Dubai",
  "Singapore",
  "Sydney",
  "Melbourne",
  "Tokyo",
  "Kyoto",
  "Seoul",
  "Bangkok",
  "Hanoi",
  "Ho Chi Minh City",
  "Kuala Lumpur",
  "Mumbai",
  "Delhi",
  "Agra",
  "Jaipur",
  "Goa",
  "Nairobi",
  "Cairo",
  "Marrakech",
  "Cape Town",
  "Rio de Janeiro",
  "Buenos Aires",
  "Lima",
  "Mexico City",
  "Cancun",
  "Havana",
  "Vancouver",
  "Toronto",
  "Reykjavik",
  "Bali",
  "Maldives",
  "Santorini",
  "Paris",
  "Venice",
  "Florence",
  "Milan",
  "Lisbon",
  "Athens",
  "Madrid",
  "Zurich",
  "Munich",
  "Copenhagen",
  "Stockholm",
  "Oslo",
  "Helsinki",
  "Warsaw",
  "Krakow",
  "Dublin",
  "Edinburgh",
  "Brussels",
  "Lyon",
  "Nice",
  "Bordeaux",
  "Porto",
  "Seville",
  "Valencia",
  "Naples",
  "Sicily",
  "Crete",
  "Mykonos",
]));
