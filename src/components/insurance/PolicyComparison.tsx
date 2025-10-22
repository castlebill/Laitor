'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { allPlans } from '@/lib/data';
import type { Plan } from '@/lib/types';
import { Button } from '../ui/button';

function PlanTable({ plans }: { plans: Plan[] }) {
  if (!plans || plans.length === 0) {
    return <p className="text-muted-foreground p-4">No plans available for this category.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Provider</TableHead>
          <TableHead>Plan</TableHead>
          <TableHead>Key Coverage</TableHead>
          <TableHead className="text-right">Price (KES)</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {plans.map((plan) => (
          <TableRow key={plan.id}>
            <TableCell className="font-medium">{plan.provider}</TableCell>
            <TableCell>{plan.name}</TableCell>
            <TableCell className="text-muted-foreground text-xs">{plan.coverage.slice(0, 2).join(', ')}</TableCell>
            <TableCell className="text-right font-semibold">{plan.price.toLocaleString()}</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm">Select</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function PolicyComparison() {
  const insuranceTypes = Object.keys(allPlans);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Compare All Plans</CardTitle>
        <CardDescription>Browse all available insurance plans and find the one that suits you best.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={insuranceTypes[0]}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            {insuranceTypes.map(type => (
              <TabsTrigger key={type} value={type} className="capitalize">{type}</TabsTrigger>
            ))}
          </TabsList>
          {insuranceTypes.map(type => (
            <TabsContent key={type} value={type}>
              <div className="rounded-md border mt-4">
                <PlanTable plans={allPlans[type]} />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
