import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center space-x-4 mt-8">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg ${
          currentPage === 1
            ? 'bg-purple-500/20 cursor-not-allowed'
            : 'bg-purple-500 hover:bg-purple-600'
        } transition-colors duration-200`}
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>
      
      <span className="text-lg font-medium">
        Page {currentPage} of {totalPages}
      </span>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg ${
          currentPage === totalPages
            ? 'bg-purple-500/20 cursor-not-allowed'
            : 'bg-purple-500 hover:bg-purple-600'
        } transition-colors duration-200`}
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default Pagination;