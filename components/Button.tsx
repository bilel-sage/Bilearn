'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  icon?: ReactNode;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  glow = false,
  icon,
  className,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 relative overflow-hidden';

  const variantClasses = {
    primary: 'bg-light-primary dark:bg-dark-primary text-white hover:bg-light-primary-dark dark:hover:bg-dark-primary-glow',
    secondary: 'bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text border border-light-border dark:border-dark-border hover:bg-light-primary/10 dark:hover:bg-dark-primary/10',
    outline: 'bg-transparent text-light-primary dark:text-dark-primary border-2 border-light-primary dark:border-dark-primary hover:bg-light-primary dark:hover:bg-dark-primary hover:text-white',
    ghost: 'bg-transparent text-light-text dark:text-dark-text hover:bg-light-surface dark:hover:bg-dark-surface',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const glowClasses = glow ? 'shadow-glow-sm dark:shadow-glow-green-sm hover:shadow-glow-md dark:hover:shadow-glow-green-md' : '';

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        glowClasses,
        className
      )}
      {...props}
    >
      {/* Ripple effect on hover */}
      <motion.span
        className="absolute inset-0 bg-white dark:bg-dark-primary"
        initial={{ scale: 0, opacity: 0.5 }}
        whileHover={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.6 }}
      />
      
      {icon && <span className="mr-2">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
