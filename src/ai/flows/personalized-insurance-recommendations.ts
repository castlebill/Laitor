'use server';
/**
 * @fileOverview A flow for generating personalized insurance recommendations.
 *
 * - generatePersonalizedRecommendations - A function that generates personalized insurance recommendations.
 * - PersonalizedRecommendationsInput - The input type for the generatePersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the generatePersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  insuranceType: z
    .string()
    .describe('The type of insurance needed (e.g., motor, health, property, life).'),
  userDetails: z.string().describe('Details about the user, including their preferences.'),
  availablePlans: z
    .string()
    .describe('A list of available insurance plans with their details.'),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A list of personalized insurance recommendations, ranked by cost, value, and reliability.'
    ),
});
export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function generatePersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an insurance recommendation expert. Based on the user's needs, preferences, and available insurance plans, you will generate personalized insurance recommendations, ranked by cost, value, and reliability.\n\nInsurance Type: {{{insuranceType}}}\nUser Details: {{{userDetails}}}\nAvailable Plans: {{{availablePlans}}}\n\nProvide the recommendations in a clear and concise manner, explaining why each plan is a good fit for the user.\n`,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
