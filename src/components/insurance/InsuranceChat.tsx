'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { handleInsuranceQuery } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Bot, Send, User } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Badge } from '../ui/badge';

const initialState = {
  message: '',
  data: null,
  errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="icon">
      {pending ? <Bot className="animate-spin h-5 w-5" /> : <Send className="h-5 w-5" />}
      <span className="sr-only">Send Message</span>
    </Button>
  );
}

export function InsuranceChat() {
  const [state, formAction] = useFormState(handleInsuranceQuery, initialState);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Bot className="text-primary" />
          Your Personal Insurance Advisor
        </CardTitle>
        <CardDescription>How can I help you today? Let me know if you want to buy, renew, compare, or claim.</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent>
          <div className="relative">
            <Textarea
              name="query"
              placeholder="e.g., 'I need to renew my car insurance for KDC 874N before the month ends.'"
              className="pr-12"
              rows={3}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <SubmitButton />
            </div>
          </div>
        </CardContent>
      </form>
      <CardFooter className="flex flex-col items-start gap-4">
        {state.errors?.query && <p className="text-sm font-medium text-destructive">{state.errors.query[0]}</p>}
        {state.message === 'An error occurred while processing your request.' && (
           <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}
        {state.data && (
          <div className="w-full space-y-4">
             <div className="flex items-start gap-3">
                <div className="p-2 bg-muted rounded-full"><User size={20} /></div>
                <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm">{state.data.text}</p>
                </div>
            </div>
            <div className="flex items-start gap-3">
                <div className="p-2 bg-primary text-primary-foreground rounded-full"><Bot size={20} /></div>
                <div className="bg-primary text-primary-foreground p-4 rounded-lg w-full">
                <h3 className="font-semibold mb-2">Here's what I understood:</h3>
                <div className="flex flex-wrap gap-2 text-sm">
                    <p><strong>Intent:</strong> <Badge variant="secondary" className="capitalize">{state.data.intent}</Badge></p>
                    <p><strong>Type:</strong> <Badge variant="secondary" className="capitalize">{state.data.insuranceType}</Badge></p>
                </div>
                {Object.keys(state.data.extractedInfo).length > 0 && (
                    <div className="mt-2">
                    <h4 className="font-semibold">Extracted Details:</h4>
                    <ul className="list-disc list-inside text-sm">
                        {Object.entries(state.data.extractedInfo).map(([key, value]) => (
                        <li key={key}><span className="capitalize">{key}:</span> {value}</li>
                        ))}
                    </ul>
                    </div>
                )}
                </div>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
