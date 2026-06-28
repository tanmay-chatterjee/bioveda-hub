import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type BadgeVariant = 'green' | 'gold' | 'blue' | 'neutral';

const badgeVariants: Record<BadgeVariant, string> = {
  green: 'bg-primary-500/10 text-primary-400 border border-primary-500/20',
  gold: 'bg-accent-500/10 text-accent-400 border border-accent-500/20',
  blue: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  neutral: 'bg-surface-200 text-text-muted border border-surface-300',
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = 'green', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        badgeVariants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
