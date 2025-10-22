'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getRecommendations } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Bot, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const initialState = {
  message: '',
  data: null,
  errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Generating...' : 'Get Recommendations'}
      {!pending && <Sparkles className="ml-2 h-4 w-4" />}
    </Button>
  );
}

export function RecommendationSection() {
  const [state, formAction] = useFormState(getRecommendations, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Find Your Perfect Plan</CardTitle>
        <CardDescription>Tell us your needs, and our AI will find the best options for you.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="insuranceType">Type of Insurance</Label>
              <Select name="insuranceType" required>
                <SelectTrigger id="insuranceType">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="motor">Motor</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="property">Property</SelectItem>
                  <SelectItem value="life">Life</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="userDetails">Describe Your Needs</Label>
            <Textarea
              id="userDetails"
              name="userDetails"
              placeholder="e.g., 'I am a 30-year-old male, non-smoker, looking for health insurance with good hospital coverage and dental benefits. My budget is around 15,000 KES per year.'"
              rows={5}
              required
            />
            {state.errors?.userDetails && <p className="text-sm font-medium text-destructive">{state.errors.userDetails[0]}</p>}
          </div>
          <SubmitButton />
        </form>

        <div className="mt-6">
            {state.message === 'An error occurred while generating recommendations.' && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{state.message}</AlertDescription>
                </Alert>
            )}
            {state.data && (
                <Card className="bg-primary/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline">
                            <Bot className="text-primary"/>
                            Personalized Recommendations
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: state.data.replace(/\n/g, '<br />') }} />
                    </CardContent>
                </Card>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
