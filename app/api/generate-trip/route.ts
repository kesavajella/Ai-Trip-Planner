import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { generateDetailedPrompt, generateFallbackItinerary, generateTripPrompt, transformTripPlanToItinerary } from "@/lib/itinerary-generator";
import { TripPlanRequest, TripPlanResponse } from "@/lib/types";

const MODEL = "gemini-2.5-flash";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { destination, budget, days, interests, travelCompanion, city, travelers, budgetTier, numberOfDays } = body;

    const isNewFormat = !!city && !!budget;

    let inputForPrompt: TripPlanRequest;

    if (isNewFormat) {
      inputForPrompt = {
        city,
        numberOfDays: numberOfDays ?? days ?? 5,
        budget: budget as TripPlanRequest["budget"],
        travelers: travelers as TripPlanRequest["travelers"],
      };
    } else {
      inputForPrompt = {
        city: destination || "",
        numberOfDays: days,
        budget: (budget === "low" ? "Cheap" : budget === "medium" ? "Moderate" : "Luxury") as TripPlanRequest["budget"],
        travelers: (travelCompanion === "solo" ? "Just Me" : travelCompanion === "couple" ? "A Couple" : travelCompanion === "family" ? "Family" : "Friends") as TripPlanRequest["travelers"],
      };
    }

    console.log("[v0-itinerary] === GENERATION REQUEST START ===");
    console.log("[v0-itinerary] Input:", {
      destination: inputForPrompt.city,
      budget: inputForPrompt.budget,
      days: inputForPrompt.numberOfDays,
      travelers: inputForPrompt.travelers,
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
    });

    if (!inputForPrompt.city || !inputForPrompt.budget) {
      return NextResponse.json(
        { error: "Missing required fields: city, budget" },
        { status: 400 }
      );
    }

    const validBudgets = ["Cheap", "Moderate", "Luxury"];
    if (!validBudgets.includes(inputForPrompt.budget)) {
      return NextResponse.json(
        { error: "Budget must be: Cheap, Moderate, or Luxury" },
        { status: 400 }
      );
    }

    if (inputForPrompt.numberOfDays < 1 || inputForPrompt.numberOfDays > 30) {
      return NextResponse.json({ error: "Days must be between 1 and 30" }, { status: 400 });
    }

    const prompt = generateTripPrompt(inputForPrompt);

    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not set");
      }

      console.log("[v0-itinerary] Calling Gemini API:", MODEL);

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: MODEL,
        generationConfig: {
          temperature: 0.9,
          responseMimeType: "application/json",
        },
      });

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      let parsedResponse: TripPlanResponse;
      try {
        parsedResponse = JSON.parse(text);
      } catch {
        const cleaned = text.replace(/```json\s*/gi, "").replace(/```/g, "").trim();
        parsedResponse = JSON.parse(cleaned);
      }

      const itinerary = transformTripPlanToItinerary(inputForPrompt, parsedResponse);

      if (!itinerary?.days || !Array.isArray(itinerary.days) || itinerary.days.length === 0) {
        throw new Error("AI generated invalid itinerary structure");
      }

      console.log("[v0-itinerary] === GENERATION SUCCESS ===", itinerary.days.length, "days");
      return NextResponse.json(itinerary);
    } catch (apiError) {
      console.error("[v0-itinerary] AI generation error, using fallback:", apiError);

      const fallbackItinerary = generateFallbackItinerary(
        inputForPrompt.city,
        inputForPrompt.budget === "Cheap" ? "low" : inputForPrompt.budget === "Luxury" ? "luxury" : "medium",
        inputForPrompt.numberOfDays,
        interests || [],
        inputForPrompt.travelers
      );
      return NextResponse.json(fallbackItinerary);
    }
  } catch (error) {
    console.error("[v0-itinerary] === GENERATION ERROR ===", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate trip itinerary" },
      { status: 500 }
    );
  }
}
