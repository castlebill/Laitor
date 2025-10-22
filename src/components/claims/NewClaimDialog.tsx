'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { addDocumentNonBlocking, useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import type { Policy } from '@/lib/types';

export function NewClaimDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { firestore, user } = useFirebase();

  const policiesQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, 'users', user.uid, 'policies'), where('status', '==', 'Active'));
  }, [firestore, user]);

  const { data: userPolicies, isLoading } = useCollection<Policy>(policiesQuery);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const policyId = formData.get('policy') as string;
    const incidentDate = formData.get('incident-date') as string;
    const description = formData.get('description') as string;

    if (!user || !firestore) return;

    const newClaim = {
      policyId,
      userId: user.uid,
      claimNumber: `CLM-${Date.now()}`,
      dateFiled: incidentDate,
      description,
      status: 'Processing',
      amount: 0, // Default amount
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const claimsCollection = collection(firestore, `users/${user.uid}/policies/${policyId}/claims`);
    addDocumentNonBlocking(claimsCollection, newClaim);

    toast({
      title: "Claim Submitted",
      description: "Your new claim has been filed successfully. You can track its status on this page.",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>File a New Claim</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-headline">File a New Claim</DialogTitle>
            <DialogDescription>
              Please fill out the details below. We'll process your claim as quickly as possible.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="policy" className="text-right">
                Policy
              </Label>
              <Select name="policy" required>
                <SelectTrigger id="policy" className="col-span-3">
                  <SelectValue placeholder="Select a policy" />
                </SelectTrigger>
                <SelectContent>
                  {isLoading ? (
                    <SelectItem value="loading" disabled>Loading policies...</SelectItem>
                  ) : (
                    userPolicies?.map(policy => (
                      <SelectItem key={policy.id} value={policy.id}>{policy.policyNumber}</SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="incident-date" className="text-right">
                Incident Date
              </Label>
              <Input id="incident-date" name="incident-date" type="date" required className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right mt-2">
                Description
              </Label>
              <Textarea id="description" name="description" placeholder="Describe the incident..." required className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit Claim</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
