'use server';

/**
 * @fileOverview Understands the user's intent (buy, renew, claim, compare) and the type of insurance they need.
 *
 * - insuranceIntentUnderstanding - A function that handles the intent understanding process.
 * - InsuranceIntentUnderstandingInput - The input type for the insuranceIntentUnderstanding function.
 * - InsuranceIntentUnderstandingOutput - The return type for the insuranceIntentUnderstanding function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InsuranceIntentUnderstandingInputSchema = z.object({
  text: z
    .string()
    .describe("The user's input text expressing their insurance needs."),
});
export type InsuranceIntentUnderstandingInput = z.infer<
  typeof InsuranceIntentUnderstandingInputSchema
>;

const InsuranceIntentUnderstandingOutputSchema = z.object({
  intent: z
    .enum(['buy', 'renew', 'claim', 'compare'])
    .describe('The identified intent of the user.'),
  insuranceType: z
    .enum(['motor', 'health', 'property', 'life'])
    .describe('The type of insurance the user is interested in.'),
  extractedInfo: z
    .record(z.string())
    .describe('Additional information extracted from the user text.'),
});
export type InsuranceIntentUnderstandingOutput = z.infer<
  typeof InsuranceIntentUnderstandingOutputSchema
>;

export async function insuranceIntentUnderstanding(
  input: InsuranceIntentUnderstandingInput
): Promise<InsuranceIntentUnderstandingOutput> {
  return insuranceIntentUnderstandingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'insuranceIntentUnderstandingPrompt',
  input: {schema: InsuranceIntentUnderstandingInputSchema},
  output: {schema: InsuranceIntentUnderstandingOutputSchema},
  prompt: `You are an AI assistant designed to understand user intents related to insurance.
  Your task is to analyze the user's text and determine their intent and the type of insurance they need.

  The possible intents are: buy, renew, claim, compare
  The possible insurance types are: motor, health, property, life

  Analyze the following text:
  {{text}}

  Return a JSON object with the intent, insuranceType, and any extractedInfo from the text. The extractedInfo should be a record of string to string key/value pairs.
  `,
});

const insuranceIntentUnderstandingFlow = ai.defineFlow(
  {
    name: 'insuranceIntentUnderstandingFlow',
    inputSchema: InsuranceIntentUnderstandingInputSchema,
    outputSchema: InsuranceIntentUnderstandingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
