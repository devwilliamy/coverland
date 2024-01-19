import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coverland Car Covers',
  description: 'The ultimate marketplace for car protection',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
