import React from 'react';

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Helper to generate button classes
  const getPageItemClasses = (page: number) =>
    `flex items-center justify-center px-4 h-10 leading-tight ${
      currentPage === page
        ? 'text-white bg-blue-600 border-blue-600'
        : 'text-gray-400 bg-gray-800 border-gray-700 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <nav className="flex justify-end mt-8">
      <ul className="flex items-center -space-x-px h-10 text-base">
        {currentPage > 1 && (
          <li>
            <button
              onClick={() => handlePageClick(currentPage - 1)}
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-400 bg-gray-800 border border-e-0 border-gray-700 rounded-s-lg hover:bg-gray-700 hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
              </svg>
            </button>
          </li>
        )}
        {pageNumbers.map((page) => (
          <li key={page}>
            <button onClick={() => handlePageClick(page)} className={getPageItemClasses(page)}>
              {page}
            </button>
          </li>
        ))}
        {currentPage < totalPages && (
          <li>
            <button
              onClick={() => handlePageClick(currentPage + 1)}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-400 bg-gray-800 border border-gray-700 rounded-e-lg hover:bg-gray-700 hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;