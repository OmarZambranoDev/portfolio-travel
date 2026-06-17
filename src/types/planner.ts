export type TravelStyle =
  | 'Adventure'
  | 'Cultural'
  | 'Relaxation'
  | 'Foodie'
  | 'Budget'
  | 'Luxury'
  | 'Sports & Events';

export type BudgetTier = 'Budget' | 'Mid-range' | 'Luxury';

export interface PlannerFormData {
  destination: string;
  destinationSlug: string;
  duration: number;
  travelStyle: TravelStyle;
  budget: BudgetTier;
}

export interface ItineraryResponse {
  destination: string;
  duration: number;
  travelStyle: TravelStyle;
  budget: BudgetTier;
  content: string;
}
