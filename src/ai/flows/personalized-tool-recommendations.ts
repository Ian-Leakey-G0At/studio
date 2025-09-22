'use server';
/**
 * @fileOverview A Genkit flow to provide personalized financial tool recommendations based on a user's course history.
 *
 * - getPersonalizedToolRecommendations - A function that initiates the recommendation process.
 * - PersonalizedToolRecommendationsInput - The input type for the getPersonalizedToolRecommendations function.
 * - PersonalizedToolRecommendationsOutput - The return type for the getPersonalizedToolRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedToolRecommendationsInputSchema = z.object({
  courseHistory: z
    .string()
    .describe('A comma-separated list of course titles the user has completed.'),
  financialGoals: z
    .string()
    .describe('A description of the user\'s financial goals.'),
});
export type PersonalizedToolRecommendationsInput = z.infer<
  typeof PersonalizedToolRecommendationsInputSchema
>;

const PersonalizedToolRecommendationsOutputSchema = z.object({
  toolRecommendations: z
    .string()
    .describe(
      'A list of personalized financial tool recommendations based on the user\'s course history and financial goals.'
    ),
});
export type PersonalizedToolRecommendationsOutput = z.infer<
  typeof PersonalizedToolRecommendationsOutputSchema
>;

export async function getPersonalizedToolRecommendations(
  input: PersonalizedToolRecommendationsInput
): Promise<PersonalizedToolRecommendationsOutput> {
  return personalizedToolRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedToolRecommendationsPrompt',
  input: {schema: PersonalizedToolRecommendationsInputSchema},
  output: {schema: PersonalizedToolRecommendationsOutputSchema},
  prompt: `You are a financial advisor who specializes in recommending tools to help users achieve their financial goals.

  Based on the user\'s course history and financial goals, recommend a list of financial tools that the user can use.

  Course History: {{{courseHistory}}}
  Financial Goals: {{{financialGoals}}}

  Tool Recommendations:`,
});

const personalizedToolRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedToolRecommendationsFlow',
    inputSchema: PersonalizedToolRecommendationsInputSchema,
    outputSchema: PersonalizedToolRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
