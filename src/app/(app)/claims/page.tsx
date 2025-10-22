'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Claim, Policy } from '@/lib/types';
import { NewClaimDialog } from '@/components/claims/NewClaimDialog';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection, collectionGroup, query, where } from 'firebase/firestore';

const getStatusVariant = (status: Claim['status']) => {
  switch (status) {
    case 'Approved':
      return 'default';
    case 'Processing':
      return 'secondary';
    case 'Rejected':
      return 'destructive';
    default:
      return 'outline';
  }
};

export default function ClaimsPage() {
  const { firestore, user } = useFirebase();

  const claimsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(collectionGroup(firestore, 'claims'), where('userId', '==', user.uid));
  }, [firestore, user]);

  const { data: userClaims, isLoading: isLoadingClaims } = useCollection<Claim>(claimsQuery);

  const policiesQuery = useMemoFirebase(() => {
    if (!firestore || !user ) return null;
    return query(collection(firestore, `users/${user.uid}/policies`));
  }, [firestore, user]);

  const { data: userPolicies, isLoading: isLoadingPolicies } = useCollection<Policy>(policiesQuery);

  const claimsWithPolicy = useMemoFirebase(() => {
    if (!userClaims || !userPolicies) return [];
    return userClaims.map(claim => {
      const policy = userPolicies.find(p => p.id === claim.policyId);
      return {
        ...claim,
        policy,
      };
    });
  }, [userClaims, userPolicies]);

  const isLoading = isLoadingClaims || isLoadingPolicies;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Claims Center</h1>
          <p className="text-muted-foreground">Manage and track all your insurance claims.</p>
        </div>
        <NewClaimDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Claims History</CardTitle>
          <CardDescription>A record of all your submitted claims.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Claim ID</TableHead>
                <TableHead>Policy Number</TableHead>
                <TableHead>Date Filed</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && <TableRow><TableCell colSpan={5} className="text-center">Loading claims...</TableCell></TableRow>}
              {!isLoading && claimsWithPolicy && claimsWithPolicy.map(claim => (
                <TableRow key={claim.id}>
                  <TableCell className="font-mono text-xs">{claim.claimNumber}</TableCell>
                  <TableCell className="font-medium">{claim.policy?.policyNumber}</TableCell>
                  <TableCell>{new Date(claim.dateFiled).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(claim.status as any)}>{claim.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {/* Placeholder for future action */}
                  </TableCell>
                </TableRow>
              ))}
               {!isLoading && (!claimsWithPolicy || claimsWithPolicy.length === 0) && <TableRow><TableCell colSpan={5} className="text-center">No claims found.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
