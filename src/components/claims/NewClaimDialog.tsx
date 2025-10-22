'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { userPolicies } from '@/lib/data';

export function NewClaimDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Mock form submission
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
              <Select required>
                <SelectTrigger id="policy" className="col-span-3">
                  <SelectValue placeholder="Select a policy" />
                </SelectTrigger>
                <SelectContent>
                  {userPolicies.filter(p => p.status === 'Active').map(policy => (
                     <SelectItem key={policy.id} value={policy.id}>{policy.policyNumber}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="incident-date" className="text-right">
                Incident Date
              </Label>
              <Input id="incident-date" type="date" required className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right mt-2">
                Description
              </Label>
              <Textarea id="description" placeholder="Describe the incident..." required className="col-span-3" />
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
