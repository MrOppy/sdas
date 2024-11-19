import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const EnhancedPagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;
    
    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    // Always show last page
    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center items-center space-x-2 mt-12 mb-8"
    >
      {/* Previous Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg flex items-center justify-center ${
          currentPage === 1
            ? 'bg-white/5 text-gray-500 cursor-not-allowed'
            : 'bg-white/10 hover:bg-white/20 text-white'
        } transition-colors duration-200`}
      >
        <ChevronLeft className="w-5 h-5" />
      </motion.button>

      {/* Page Numbers */}
      <div className="flex space-x-2">
        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-4 py-2 text-gray-400">...</span>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => typeof page === 'number' && onPageChange(page)}
                className={`relative px-4 py-2 rounded-lg ${
                  currentPage === page
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                } transition-colors duration-200`}
              >
                {currentPage === page && (
                  <motion.div
                    layoutId="activePage"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative">{page}</span>
              </motion.button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg flex items-center justify-center ${
          currentPage === totalPages
            ? 'bg-white/5 text-gray-500 cursor-not-allowed'
            : 'bg-white/10 hover:bg-white/20 text-white'
        } transition-colors duration-200`}
      >
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};

export default EnhancedPagination;