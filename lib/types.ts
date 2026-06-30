export interface TripPlanRequest {
  city: string;
  numberOfDays: number;
  budget: 'Budget Friendly' | 'Moderate' | 'Luxury';
  travelers: 'Just Me' | 'A Couple' | 'Family' | 'Friends';
}

export interface TripPlanResponse {
  tripOverview: string;
  totalEstimatedCostRange: string;
  itinerary: Array<{
    day: number;
    theme: string;
    activities: Array<{
      time: string;
      placeName: string;
      description: string;
      costEstimate: string;
    }>;
  }>;
}

export interface Notification {
  id: string;
  destination: string;
  generatedAt: string;
  days: number;
}
