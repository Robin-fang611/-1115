import clsx from 'clsx';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function Card({ children, className, hoverEffect = true }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300',
        hoverEffect && 'hover:shadow-md hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  );
}
