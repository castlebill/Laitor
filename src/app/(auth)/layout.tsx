import { Car } from 'lucide-react';
import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <Car className="h-7 w-7" />
                </div>
                <h1 className="text-3xl font-headline font-bold text-primary">OneStop</h1>
            </div>
        </div>
        {children}
      </div>
    </div>
  );
}
