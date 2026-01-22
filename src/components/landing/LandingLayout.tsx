import type { ReactNode } from 'react';

export const LandingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="space-y-24 pb-16">
      {children}
    </div>
  );
};
