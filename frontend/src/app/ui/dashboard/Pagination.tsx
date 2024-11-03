import React from "react";
interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationProps) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageClick = (page: number) => {
        if (page < 1 || page > totalPages) return;
        onPageChange(page);
    };

    return (
        <div className="flex justify-center gap-2 items-center">
            <button
                className="disabled:bg-light-mint bg-light-rose text-black px-4 py-2 rounded-md"
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <div>
                {currentPage} / {totalPages}
            </div>
            <button
                className="bg-light-rose disabled:bg-light-mint text-black px-4 py-2 rounded-md"
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
