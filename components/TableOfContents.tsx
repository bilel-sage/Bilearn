'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { List, X, ChevronRight, ChevronDown } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export default function TableOfContents({ currentPage, totalPages, onPageChange }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scanTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Extract headings from the visible article DOM
  const scanHeadings = useCallback(() => {
    const article = document.querySelector('.prose');
    if (!article) return;

    const elements = article.querySelectorAll('h2, h3, h4');
    const items: TocItem[] = [];

    elements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      // Skip hidden elements (paginated out)
      if (htmlEl.offsetParent === null && htmlEl.style.display === 'none') return;
      // Check if parent section is hidden
      const section = htmlEl.closest('[data-section]');
      if (section && (section as HTMLElement).style.display === 'none') return;

      if (!el.id) {
        el.id = el.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || '';
      }
      items.push({
        id: el.id,
        text: el.textContent || '',
        level: parseInt(el.tagName[1]),
      });
    });

    setHeadings(items);
  }, []);

  // Scan headings on mount and when page changes
  useEffect(() => {
    // Small delay to let DOM update after pagination
    scanTimeoutRef.current = setTimeout(scanHeadings, 100);
    return () => {
      if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
    };
  }, [scanHeadings, currentPage]);

  // Track active heading with IntersectionObserver
  useEffect(() => {
    if (headings.length === 0) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const callback: IntersectionObserverCallback = (entries) => {
      const visibleEntries = entries.filter((e) => e.isIntersecting);
      if (visibleEntries.length > 0) {
        const sorted = visibleEntries.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        );
        setActiveId(sorted[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: '-100px 0px -60% 0px',
      threshold: 0,
    });

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [headings]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setMobileOpen(false);
    }
  }, []);

  if (headings.length === 0) return null;

  const hasPagination = totalPages && totalPages > 1;

  const tocContent = (
    <div>
      {/* Page indicator */}
      {hasPagination && (
        <div className="flex items-center gap-1 px-3 mb-3 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => onPageChange?.(i)}
              className={`
                w-7 h-7 rounded-md text-xs font-semibold transition-all duration-200
                ${i === currentPage
                  ? 'bg-[var(--primary)] text-white dark:text-black'
                  : 'bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text)] border border-[var(--border)]'
                }
              `}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <nav aria-label="Sommaire de l'article">
        <ul className="space-y-0.5">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            const indent = heading.level === 2 ? '' : heading.level === 3 ? 'pl-4' : 'pl-7';

            return (
              <li key={heading.id}>
                <button
                  onClick={() => scrollTo(heading.id)}
                  className={`
                    w-full text-left py-1.5 px-3 rounded-md text-[13px] leading-snug
                    transition-all duration-200 block
                    ${indent}
                    ${isActive
                      ? 'text-[var(--primary)] font-semibold bg-[var(--primary)]/10 border-l-2 border-[var(--primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
                    }
                  `}
                >
                  {heading.text}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop: rendered inside the sticky sidebar from page layout */}
      <div className="hidden lg:block">
        {/* Header with collapse toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 mb-1 text-sm font-semibold text-[var(--text)] hover:text-[var(--primary)] transition-colors w-full"
        >
          {isOpen ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
          <span>Sommaire</span>
        </button>

        {isOpen && (
          <div className="overflow-y-auto max-h-[calc(100vh-12rem)] pr-1 toc-scroll">
            {tocContent}
          </div>
        )}
      </div>

      {/* Mobile floating button + drawer */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Ouvrir le sommaire"
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[var(--primary)] text-white dark:text-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          <List className="w-5 h-5" />
        </button>

        {mobileOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          >
            <div
              className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-[var(--bg)] border-l border-[var(--border)] p-6 overflow-y-auto shadow-2xl animate-slide-in-right"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-[var(--text)]">Sommaire</h2>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-md flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface)] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {tocContent}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
