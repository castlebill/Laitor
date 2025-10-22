'use client';

import { AppShell } from '@/components/layout/AppShell';
import { useUser } from '@/firebase';
import { redirect } from 'next/navigation';
import React from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();

  if (isUserLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    redirect('/login');
  }

  return <AppShell>{children}</AppShell>;
}
