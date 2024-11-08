import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, onPrevious, onNext, onPageChange }) => (
    <div className="flex justify-center mt-6">
      <ul className="flex gap-2">
        <li>
          <button
            onClick={onPrevious}
            disabled={currentPage === 1}
            className={`p-2 rounded-md bg-gray-300 text-black hover:bg-gray-400 ${currentPage === 1 ? 'opacity-80 cursor-not-allowed' : ''}`}
            aria-label="Previous page"
          >
            Prev
          </button>
        </li>
  
        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          return (
            <li key={pageNum}>
              <button
                onClick={() => onPageChange(pageNum)}
                className={`p-2 rounded-md text-black ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
                aria-label={`Go to page ${pageNum}`}
              >
                {pageNum}
              </button>
            </li>
          );
        })}
  
        <li>
          <button
            onClick={onNext}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-md bg-gray-300 text-black hover:bg-gray-400 ${currentPage === totalPages ? 'opacity-80 cursor-not-allowed' : ''}`}
            aria-label="Next page"
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
  Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPrevious: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
  };
  export default Pagination;