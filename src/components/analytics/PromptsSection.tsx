'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
        const params = new URLSearchParams({
          ...(brandDomain ? { website: brandDomain } : { brand_name: brandName }),
          page: page.toString(),
          per_page: PROMPTS_PER_PAGE.toString(),
        });

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
                  <p className="text-text-primary text-sm leading-relaxed">
                    {prompt.prompt}
                  </p>
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
