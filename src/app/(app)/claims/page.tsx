import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { userClaims } from '@/lib/data';
import type { Claim } from '@/lib/types';
import { NewClaimDialog } from '@/components/claims/NewClaimDialog';

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
              {userClaims.map(claim => (
                <TableRow key={claim.id}>
                  <TableCell className="font-mono text-xs">{claim.claimNumber}</TableCell>
                  <TableCell className="font-medium">{claim.policy.policyNumber}</TableCell>
                  <TableCell>{new Date(claim.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(claim.status)}>{claim.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {/* Placeholder for future action */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
