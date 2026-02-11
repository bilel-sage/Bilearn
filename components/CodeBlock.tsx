'use client';

import { useState, useRef } from 'react';
import { Clipboard, Check } from 'lucide-react';

export default function CodeBlock({ children, ...props }: any) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    const code = preRef.current?.querySelector('code')?.textContent || preRef.current?.textContent || '';
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="code-block-container group relative">
      <button
        onClick={handleCopy}
        aria-label={copied ? 'Copié !' : 'Copier le code'}
        className={`
          absolute top-3 right-3 z-10
          flex items-center gap-1.5
          px-2.5 py-1.5
          rounded-md
          text-xs font-medium font-mono
          transition-all duration-200
          focus:outline-none
          ${copied
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : 'bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:text-[var(--primary)] hover:border-[var(--primary)]'
          }
        `}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span>Copié</span>
          </>
        ) : (
          <>
            <Clipboard className="w-3.5 h-3.5" />
            <span>Copier</span>
          </>
        )}
      </button>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  );
}
