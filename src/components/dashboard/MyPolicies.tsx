'use client';

import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { PolicyCard } from './PolicyCard';
import type { Policy } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';

export function MyPolicies() {
  const { firestore, user } = useFirebase();

  const policiesQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(collection(firestore, 'users', user.uid, 'policies'), where('status', '==', 'Active'));
  }, [firestore, user]);

  const { data: activePolicies, isLoading } = useCollection<Policy>(policiesQuery);

  return (
    <section>
      <h2 className="text-2xl font-headline mb-4">My Active Policies</h2>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : activePolicies && activePolicies.length > 0 ? (
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
