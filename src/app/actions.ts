'use server';

import { insuranceIntentUnderstanding } from '@/ai/flows/insurance-intent-understanding';
import { generatePersonalizedRecommendations } from '@/ai/flows/personalized-insurance-recommendations';
import { Plan } from '@/lib/types';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';
import { getSdks } from '@/firebase';
import { z } from 'zod';

const insuranceQuerySchema = z.object({
  query: z.string().min(10, "Please describe your needs in a bit more detail."),
});

export async function handleInsuranceQuery(prevState: any, formData: FormData) {
  const validatedFields = insuranceQuerySchema.safeParse({
    query: formData.get('query'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await insuranceIntentUnderstanding({ text: validatedFields.data.query });
    return {
      message: 'Success',
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An error occurred while processing your request.',
    };
  }
}

const recommendationSchema = z.object({
  insuranceType: z.enum(['motor', 'health', 'property', 'life']),
  userDetails: z.string().min(10, "Please provide more details about your needs."),
});

async function getPlans(insuranceType: string): Promise<Plan[]> {
    const { firestore } = getSdks(initializeApp(firebaseConfig));
    const plansCollection = collection(firestore, 'plans');
    const plansSnapshot = await getDocs(plansCollection);
    const allPlans: Plan[] = [];
    plansSnapshot.forEach(doc => allPlans.push({ id: doc.id, ...doc.data() } as Plan));
    return allPlans.filter(plan => plan.type === insuranceType);
}

export async function getRecommendations(prevState: any, formData: FormData) {
  const validatedFields = recommendationSchema.safeParse({
    insuranceType: formData.get('insuranceType'),
    userDetails: formData.get('userDetails'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { insuranceType, userDetails } = validatedFields.data;
  const availablePlans = await getPlans(insuranceType);
  
  if (!availablePlans || availablePlans.length === 0) {
    return { message: `No plans available for ${insuranceType}.` };
  }

  try {
    const result = await generatePersonalizedRecommendations({
      insuranceType,
      userDetails,
      availablePlans: JSON.stringify(availablePlans, null, 2),
    });
    return {
      message: 'Success',
      data: result.recommendations,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An error occurred while generating recommendations.',
    };
  }
}
