'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { PromptItem, PromptsPagination } from '@/types/backend';

interface PromptsSectionProps {
  brandName: string;
  brandDomain?: string;
  className?: string;
}

interface PromptsState {
  prompts: PromptItem[];
  pagination: PromptsPagination | null;
  isLoading: boolean;
  error: string | null;
}

const PROMPTS_PER_PAGE = 10;

const MARKDOWN_STYLES = "text-text-secondary text-[11px] leading-relaxed [&_h1]:text-xs [&_h1]:font-semibold [&_h1]:text-text-primary [&_h1]:mb-1 [&_h2]:text-[11px] [&_h2]:font-semibold [&_h2]:text-text-primary [&_h2]:mb-1 [&_h3]:text-[11px] [&_h3]:font-medium [&_h3]:text-text-primary [&_h3]:mb-1 [&_p]:mb-1.5 [&_ul]:pl-3 [&_ul]:mb-1.5 [&_ol]:pl-3 [&_ol]:mb-1.5 [&_li]:mb-0.5 [&_strong]:text-text-primary [&_a]:text-blue-400 [&_a]:underline [&_code]:text-[10px] [&_code]:bg-bg-surface [&_code]:px-1 [&_code]:rounded";

function AnswerBottomSheet({ prompt, isOpen, onClose }: { prompt: PromptItem; isOpen: boolean; onClose: () => void }) {
  const firstResponse = prompt.responses?.[0];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!firstResponse) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 transition-opacity duration-300',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 h-[50vh] bg-bg-elevated border-t border-subtle shadow-2xl transition-transform duration-300 ease-out flex flex-col',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{ borderTopLeftRadius: '25px', borderTopRightRadius: '25px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 flex-shrink-0">
          <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
            {firstResponse.llm_name}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-bg-surface border border-subtle text-text-muted hover:text-text-primary transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <p className="text-text-primary text-sm font-medium mb-3 leading-relaxed">
            {prompt.prompt}
          </p>
          <div className="border-t border-subtle pt-3">
            <div className={MARKDOWN_STYLES}>
              <ReactMarkdown>{firstResponse.answer}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnswerPopover({ prompt }: { prompt: PromptItem }) {
  const [isHoverVisible, setIsHoverVisible] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const firstResponse = prompt.responses?.[0];
  if (!firstResponse) return null;

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHoverVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsHoverVisible(false), 150);
  };

  return (
    <>
      {/* Desktop: hover popover */}
      <div
        className="relative flex-shrink-0 hidden sm:block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          type="button"
          className="px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-text-muted bg-bg-surface border border-subtle rounded-lg hover:text-text-primary hover:border-text-muted/20 transition-all duration-200"
        >
          View Ans
        </button>

        {isHoverVisible && (
          <div className="absolute bottom-full right-0 mb-2 z-50 w-[300px] max-h-60 overflow-y-auto bg-bg-elevated border border-subtle rounded-xl shadow-soft-tile-sm p-3">
            <span className="block text-[10px] font-medium uppercase tracking-wide text-text-muted mb-2">
              {firstResponse.llm_name}
            </span>
            <div className={MARKDOWN_STYLES}>
              <ReactMarkdown>{firstResponse.answer}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {/* Mobile: tap to open bottom sheet */}
      <div className="flex-shrink-0 sm:hidden">
        <button
          type="button"
          onClick={() => setIsSheetOpen(true)}
          className="px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-text-muted bg-bg-surface border border-subtle rounded-lg active:scale-[0.96] transition-all duration-200"
        >
          View Ans
        </button>
        <AnswerBottomSheet
          prompt={prompt}
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
        />
      </div>
    </>
  );
}

const PromptsSection: React.FC<PromptsSectionProps> = ({
  brandName,
  brandDomain,
  className,
}) => {
  const [state, setState] = useState<PromptsState>({
    prompts: [],
    pagination: null,
    isLoading: true,
    error: null,
  });

  const fetchPrompts = useCallback(
    async (page: number) => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        const params = new URLSearchParams();
        if (brandDomain) params.set('website', brandDomain);
        else params.set('brand_name', brandName);
        params.set('page', page.toString());
        params.set('per_page', PROMPTS_PER_PAGE.toString());

        const response = await fetch(`/api/prompts?${params.toString()}`);

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(
            errorData?.error || `Failed to fetch prompts (${response.status})`
          );
        }

        const data = await response.json();

        setState({
          prompts: data.prompts,
          pagination: data.pagination,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error:
            err instanceof Error ? err.message : 'Failed to load prompts',
        }));
      }
    },
    [brandName, brandDomain]
  );

  useEffect(() => {
    fetchPrompts(1);
  }, [fetchPrompts]);

  const handlePageChange = (page: number) => {
    fetchPrompts(page);
  };

  // Don't render section at all if brand not found (404)
  if (!state.isLoading && state.error?.includes('not found')) {
    return null;
  }

  return (
    <div className={cn('mb-10 sm:mb-16', className)}>
      {/* Section Title */}
      <div className="mb-4 sm:mb-8">
        <h2 className="text-text-primary text-xl sm:text-2xl md:text-3xl font-light mb-2">
          Prompts Overview
        </h2>
        <p className="text-text-muted text-sm">
          Prompts that were used to generate insights for{' '}
          <span className="text-text-primary italic">{brandName}</span>
        </p>
      </div>

      {/* Content Card */}
      <div className="bg-bg-surface rounded-xl shadow-soft-tile-sm border border-subtle p-4 sm:p-6 md:p-8">
        {/* Loading State */}
        {state.isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="bg-bg-elevated border border-subtle rounded-xl px-4 py-3 animate-pulse"
              >
                <div className="h-4 bg-bg-depressed rounded w-3/4" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!state.isLoading && state.error && (
          <div className="text-center py-10">
            <svg
              className="w-10 h-10 mx-auto text-text-subtle mb-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            <p className="text-text-muted text-sm mb-4">{state.error}</p>
            <button
              onClick={() =>
                fetchPrompts(state.pagination?.page || 1)
              }
              className="
                px-4 py-2
                bg-bg-elevated
                text-text-primary
                text-xs font-medium
                border border-subtle
                rounded-lg
                shadow-soft-tile-xs
                hover:bg-bg-surface
                hover:border-text-muted/20
                active:scale-[0.98]
                transition-all duration-300
              "
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!state.isLoading && !state.error && state.prompts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-text-muted text-sm">
              No prompts found for this brand.
            </p>
          </div>
        )}

        {/* Prompts List */}
        {!state.isLoading && !state.error && state.prompts.length > 0 && (
          <>
            <div className="space-y-3">
              {state.prompts.map((prompt, index) => (
                <div
                  key={prompt.prompt_id}
                  className="
                    flex items-start gap-3
                    bg-bg-elevated
                    border border-subtle
                    rounded-xl
                    px-4 py-3
                    shadow-soft-tile-xs
                    hover:shadow-soft-tile-sm
                    transition-all duration-300
                    pt-4
                  "
                >
                  <p className="text-text-subtle text-xs font-medium flex-shrink-0 w-6 mt-[3px] text-right">
                    {((state.pagination?.page || 1) - 1) * PROMPTS_PER_PAGE +
                      index +
                      1}
                    .
                  </p>
                  <p className="text-text-primary text-sm leading-relaxed flex-1 min-w-0">
                    {prompt.prompt}
                  </p>
                  <AnswerPopover prompt={prompt} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {state.pagination && state.pagination.total_pages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-subtle">
                {/* Page Info */}
                <span className="text-text-subtle text-xs">
                  Page {state.pagination.page} of {state.pagination.total_pages}{' '}
                  ({state.pagination.total_items} prompts)
                </span>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handlePageChange(state.pagination!.page - 1)
                    }
                    disabled={!state.pagination.has_prev}
                    className={cn(
                      'flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-300',
                      state.pagination.has_prev
                        ? 'bg-bg-elevated border-subtle text-text-primary shadow-soft-tile-xs hover:bg-bg-surface hover:border-text-muted/20 active:scale-[0.98]'
                        : 'bg-bg-depressed border-subtle text-text-subtle cursor-not-allowed opacity-50'
                    )}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                    Prev
                  </button>

                  {/* Page Numbers */}
                  <div className="hidden sm:flex items-center gap-1">
                    {getPageNumbers(
                      state.pagination.page,
                      state.pagination.total_pages
                    ).map((pageNum, i) =>
                      pageNum === '...' ? (
                        <span
                          key={`ellipsis-${i}`}
                          className="px-1.5 text-text-subtle text-xs"
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={pageNum}
                          onClick={() =>
                            handlePageChange(pageNum as number)
                          }
                          className={cn(
                            'w-8 h-8 flex items-center justify-center text-xs font-medium rounded-lg border transition-all duration-300',
                            state.pagination!.page === pageNum
                              ? 'bg-text-primary text-bg-base border-text-primary'
                              : 'bg-bg-elevated border-subtle text-text-primary shadow-soft-tile-xs hover:bg-bg-surface hover:border-text-muted/20 active:scale-[0.98]'
                          )}
                        >
                          {pageNum}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    onClick={() =>
                      handlePageChange(state.pagination!.page + 1)
                    }
                    disabled={!state.pagination.has_next}
                    className={cn(
                      'flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-300',
                      state.pagination.has_next
                        ? 'bg-bg-elevated border-subtle text-text-primary shadow-soft-tile-xs hover:bg-bg-surface hover:border-text-muted/20 active:scale-[0.98]'
                        : 'bg-bg-depressed border-subtle text-text-subtle cursor-not-allowed opacity-50'
                    )}
                  >
                    Next
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

/**
 * Generate page numbers with ellipsis for pagination
 */
function getPageNumbers(
  currentPage: number,
  totalPages: number
): (number | string)[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [1];

  if (currentPage > 3) {
    pages.push('...');
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push('...');
  }

  pages.push(totalPages);

  return pages;
}

export { PromptsSection };
