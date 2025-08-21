import React from 'react';

import Button from '../../../components/ui/Button';

const Pagination = ({ currentPage, totalPages, onPageChange, totalResults, resultsPerPage }) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range?.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots?.push(1, '...');
    } else {
      rangeWithDots?.push(1);
    }

    rangeWithDots?.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots?.push('...', totalPages);
    } else {
      if (totalPages > 1) {
        rangeWithDots?.push(totalPages);
      }
    }

    return rangeWithDots;
  };

  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  if (totalPages <= 1) return null;

  return (
    <div className="bg-card rounded-lg border shadow-literary p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Results Info */}
        <div className="text-sm text-muted-foreground">
          Showing {startResult?.toLocaleString()} to {endResult?.toLocaleString()} of {totalResults?.toLocaleString()} results
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {getVisiblePages()?.map((page, index) => {
              if (page === '...') {
                return (
                  <span key={`dots-${index}`} className="px-2 py-1 text-muted-foreground">
                    ...
                  </span>
                );
              }

              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  className="min-w-[40px]"
                >
                  {page}
                </Button>
              );
            })}
          </div>

          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next
          </Button>
        </div>
      </div>
      {/* Quick Jump (for mobile) */}
      <div className="sm:hidden mt-4 pt-4 border-t">
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground">Page</span>
          <select
            value={currentPage}
            onChange={(e) => onPageChange(parseInt(e?.target?.value))}
            className="px-3 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1)?.map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
          <span className="text-sm text-muted-foreground">of {totalPages}</span>
        </div>
      </div>
    </div>
  );
};

export default Pagination;