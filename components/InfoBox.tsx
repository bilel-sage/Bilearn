'use client';

import { Lightbulb } from 'lucide-react';

interface InfoBoxProps {
  title?: string;
  children: React.ReactNode;
}

export default function InfoBox({ title = 'Le savais-tu ?', children }: InfoBoxProps) {
  return (
    <div className="info-callout my-6 rounded-xl border border-blue-400/30 dark:border-blue-400/20 bg-blue-50/50 dark:bg-blue-950/20 p-5 relative overflow-hidden">
      {/* Subtle glow border effect */}
      <div className="absolute inset-0 rounded-xl pointer-events-none" style={{
        boxShadow: 'inset 0 0 20px rgba(96, 165, 250, 0.08), 0 0 15px rgba(96, 165, 250, 0.05)'
      }} />

      <div className="relative flex gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-9 h-9 rounded-lg bg-blue-500/15 dark:bg-blue-400/15 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-blue-500 dark:text-blue-400" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-blue-700 dark:text-blue-300 text-sm uppercase tracking-wide mb-2">
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
