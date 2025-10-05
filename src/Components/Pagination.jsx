

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-4 mt-8">
      <button
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className={`px-2 py-1 md:px-4 md:py-2 rounded ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-600 text-white"
        }`}
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 md:px-4 md:py-2 rounded ${
              currentPage === page
                ? "text-blue-800 font-bold"
                : "text-blue-600 "
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-2 py-1 md:px-4 md:py-2 rounded ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-600 text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
