import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  glass?: boolean;
}

export function Card({ children, className, glass = true }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-surface-300',
        glass
          ? 'bg-surface-100/50 backdrop-blur-md'
          : 'bg-surface-100',
        className
      )}
    >
      {children}
    </div>
  );
}
