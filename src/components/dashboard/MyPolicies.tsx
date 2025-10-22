import { userPolicies } from '@/lib/data';
import { PolicyCard } from './PolicyCard';

export function MyPolicies() {
  const activePolicies = userPolicies.filter(p => p.status === 'Active');

  return (
    <section>
      <h2 className="text-2xl font-headline mb-4">My Active Policies</h2>
      {activePolicies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activePolicies.map(policy => (
            <PolicyCard key={policy.id} policy={policy} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">You have no active policies.</p>
      )}
    </section>
  );
}
