'use client';

import { AlertTriangle } from 'lucide-react';

interface WarningBoxProps {
  title?: string;
  children: React.ReactNode;
}

export default function WarningBox({ title = 'Attention', children }: WarningBoxProps) {
  return (
    <div className="warning-callout my-6 rounded-xl border border-amber-400/30 dark:border-amber-400/20 bg-amber-50/50 dark:bg-amber-950/20 p-5 relative overflow-hidden">
      {/* Subtle glow border effect */}
      <div className="absolute inset-0 rounded-xl pointer-events-none" style={{
        boxShadow: 'inset 0 0 20px rgba(251, 191, 36, 0.08), 0 0 15px rgba(251, 191, 36, 0.05)'
      }} />

      <div className="relative flex gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-9 h-9 rounded-lg bg-amber-500/15 dark:bg-amber-400/15 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-amber-500 dark:text-amber-400" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-amber-700 dark:text-amber-300 text-sm uppercase tracking-wide mb-2">
            {title}
          </p>
          <div className="text-[var(--text)] text-[0.95rem] leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:ml-4 [&>ul]:list-disc">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
