'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TableOfContents from './TableOfContents';

const SECTIONS_PER_PAGE = 5;

interface ArticleContentProps {
  children: React.ReactNode;
}

export default function ArticleContent({ children }: ArticleContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isPaginated, setIsPaginated] = useState(false);

  // On mount, detect h2 sections and group into pages
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const allChildren = Array.from(container.children) as HTMLElement[];
    const sections: HTMLElement[][] = [];
    let currentSection: HTMLElement[] = [];

    // Group elements by h2 boundaries
    allChildren.forEach((el) => {
      if (el.tagName === 'H2') {
        if (currentSection.length > 0) {
          sections.push(currentSection);
        }
        currentSection = [el];
      } else {
        currentSection.push(el);
      }
    });
    if (currentSection.length > 0) {
      sections.push(currentSection);
    }

    // Only paginate if there are many h2 sections
    if (sections.length > SECTIONS_PER_PAGE) {
      setIsPaginated(true);

      // Group sections into pages
      const pages: HTMLElement[][] = [];
      for (let i = 0; i < sections.length; i += SECTIONS_PER_PAGE) {
        const pageElements = sections.slice(i, i + SECTIONS_PER_PAGE).flat();
        pages.push(pageElements);
      }

      setTotalPages(pages.length);

      // Tag all elements with data-page
      pages.forEach((pageEls, pageIndex) => {
        pageEls.forEach((el) => {
          el.setAttribute('data-page', String(pageIndex));
        });
      });

      // Show only first page
      applyPageVisibility(allChildren, 0);
    }
  }, []);

  const applyPageVisibility = (allElements: HTMLElement[], page: number) => {
    allElements.forEach((el) => {
      const elPage = el.getAttribute('data-page');
      if (elPage !== null) {
        el.style.display = parseInt(elPage) === page ? '' : 'none';
      }
    });
  };

  const goToPage = useCallback((page: number) => {
    const container = contentRef.current;
    if (!container) return;

    const allChildren = Array.from(container.children) as HTMLElement[];
    applyPageVisibility(allChildren, page);
    setCurrentPage(page);

    // Scroll to top of article content
    const articleTop = container.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: articleTop, behavior: 'smooth' });
  }, []);

  return (
    <div className="flex gap-0 lg:gap-10 mx-auto max-w-[1100px]">
      {/* Sidebar TOC - sticky, stretches full article height so sticky works */}
      <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0 self-stretch">
        <div className="sticky top-28 pr-6 border-r border-[var(--border)]">
          <TableOfContents
            currentPage={currentPage}
            totalPages={isPaginated ? totalPages : undefined}
            onPageChange={goToPage}
          />
        </div>
      </aside>

      {/* Article body */}
      <div className="flex-1 min-w-0">
        <div className="prose prose-lg max-w-none" ref={contentRef}>
          {children}
        </div>

        {/* Pagination controls */}
        {isPaginated && (
          <div className="flex items-center justify-between mt-12 pt-6 border-t border-[var(--border)]">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 0}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all
                ${currentPage === 0
                  ? 'opacity-30 cursor-not-allowed text-[var(--text-secondary)]'
                  : 'bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
                }
              `}
            >
              <ChevronLeft className="w-4 h-4" />
              Precedent
            </button>

            <span className="text-sm text-[var(--text-secondary)] font-medium">
              {currentPage + 1} / {totalPages}
            </span>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all
                ${currentPage === totalPages - 1
                  ? 'opacity-30 cursor-not-allowed text-[var(--text-secondary)]'
                  : 'bg-[var(--primary)] text-white dark:text-black hover:opacity-90'
                }
              `}
            >
              Suivant
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Mobile TOC (floating button + drawer) */}
        <div className="lg:hidden">
          <TableOfContents
            currentPage={currentPage}
            totalPages={isPaginated ? totalPages : undefined}
            onPageChange={goToPage}
          />
        </div>
      </div>
    </div>
  );
}
