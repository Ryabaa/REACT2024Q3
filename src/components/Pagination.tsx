import React from "react";
import { useNavigate } from "react-router-dom";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    onPageChange(page);
    navigate(`/?page=${page}`);
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        {"<"}
      </button>
      <span>{currentPage}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
