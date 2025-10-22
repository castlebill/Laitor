import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Policy } from '@/lib/types';
import { Car, FileText, HeartPulse, Home } from 'lucide-react';

const ICONS: Record<string, React.ReactNode> = {
    motor: <Car className="h-6 w-6" />,
    health: <HeartPulse className="h-6 w-6" />,
    property: <Home className="h-6 w-6" />,
    life: <FileText className="h-6 w-6" />,
}

export function PolicyCard({ policy }: { policy: Policy }) {

  const getStatusVariant = (status: Policy['status']): 'default' | 'secondary' | 'destructive' => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Expired':
        return 'destructive';
      case 'Pending':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="bg-primary/10 text-primary p-3 rounded-lg">
            {ICONS[policy.plan.type]}
        </div>
        <div>
            <CardTitle className="font-headline text-xl">{policy.plan.provider} - {policy.plan.name}</CardTitle>
            <CardDescription>{policy.policyNumber}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Status</span>
            <Badge variant={getStatusVariant(policy.status)}>{policy.status}</Badge>
        </div>
        <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Expires On</span>
            <span className="font-medium">{new Date(policy.endDate).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Premium</span>
            <span className="font-medium">KES {policy.plan.price.toLocaleString()}</span>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" className="w-full">View Details</Button>
        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Renew Now</Button>
      </CardFooter>
    </Card>
  );
}
