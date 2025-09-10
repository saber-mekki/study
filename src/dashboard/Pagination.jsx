import React from "react";
import { useTranslation } from "react-i18next";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { t } = useTranslation();
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        « {t("Prev")} 
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? "active" : ""}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {t("Next")} »
      </button>
    </div>
  );
};

export default Pagination;

