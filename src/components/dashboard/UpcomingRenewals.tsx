import { userPolicies } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, CalendarClock } from 'lucide-react';
import { Button } from '../ui/button';

export function UpcomingRenewals() {
  const now = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(now.getDate() + 30);

  const upcomingRenewals = userPolicies.filter(policy => {
    const endDate = new Date(policy.endDate);
    return policy.status === 'Active' && endDate > now && endDate <= thirtyDaysFromNow;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <CalendarClock className="text-accent" />
          Upcoming Renewals
        </CardTitle>
        <CardDescription>Policies expiring in the next 30 days.</CardDescription>
      </CardHeader>
      <CardContent>
        {upcomingRenewals.length > 0 ? (
          <ul className="space-y-4">
            {upcomingRenewals.map(policy => {
              const diffTime = Math.abs(new Date(policy.endDate).getTime() - now.getTime());
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              return (
                <li key={policy.id} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-accent" />
                    <div>
                      <p className="font-semibold">{policy.plan.provider} - {policy.plan.name}</p>
                      <p className="text-sm text-muted-foreground">Expires in {diffDays} {diffDays === 1 ? 'day' : 'days'}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="secondary">Renew</Button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No policies are due for renewal soon.</p>
        )}
      </CardContent>
    </Card>
  );
}
