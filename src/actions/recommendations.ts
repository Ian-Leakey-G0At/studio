"use server";

import { getPersonalizedToolRecommendations } from "@/ai/flows/personalized-tool-recommendations";
import type { PersonalizedToolRecommendationsInput } from "@/ai/flows/personalized-tool-recommendations";

export async function getRecommendationsAction(
  input: PersonalizedToolRecommendationsInput
) {
  try {
    const recommendations = await getPersonalizedToolRecommendations(input);
    return { success: true, data: recommendations };
  } catch (error) {
    console.error("Error getting recommendations:", error);
    return { success: false, error: "Failed to get recommendations." };
  }
}
