"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "../Icons";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function CollectionsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Generate page numbers
  const pages: (number | string)[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Show 1, 2, 3, 4, 5 ... totalPages
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push("...");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push("...");
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
      pages.push("...");
      pages.push(totalPages);
    }
  }

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 mb-6 flex items-center justify-center gap-1.5 sm:gap-2"
    >
      {/* Prev button */}
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
        className={`grid size-8.5 place-items-center rounded-full transition-colors sm:size-9 ${
          currentPage === 1
            ? "cursor-not-allowed text-muted/40"
            : "cursor-pointer text-ink hover:bg-cream-200"
        }`}
      >
        <ChevronLeftIcon width={16} height={16} />
      </button>

      {/* Pages */}
      {pages.map((p, idx) => {
        if (p === "...") {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="grid size-8.5 place-items-center text-xs text-muted sm:size-9"
            >
              ...
            </span>
          );
        }

        const pageNum = Number(p);
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange(pageNum)}
            aria-current={isActive ? "page" : undefined}
            className={`grid size-8.5 cursor-pointer place-items-center rounded-full text-[13px] font-medium transition-all sm:size-9 sm:text-[14px] ${
              isActive
                ? "bg-ink font-semibold text-white shadow-xs"
                : "text-ink-soft hover:bg-cream-200 hover:text-ink"
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Next button */}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
        className={`grid size-8.5 place-items-center rounded-full transition-colors sm:size-9 ${
          currentPage === totalPages
            ? "cursor-not-allowed text-muted/40"
            : "cursor-pointer text-ink hover:bg-cream-200"
        }`}
      >
        <ChevronRightIcon width={16} height={16} />
      </button>
    </nav>
  );
}
