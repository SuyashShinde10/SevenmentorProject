import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    if (pageNumbers.length <= 1) return null;  
    return (
        <nav className="mt-3">
            <ul className="pagination pagination-sm justify-content-center m-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button onClick={() => paginate(currentPage - 1)} className="page-link border-0 text-dark bg-transparent">
                        &laquo;
                    </button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <button onClick={() => paginate(number)} className={`page-link border-0 rounded-circle mx-1 ${currentPage === number ? 'bg-dark text-white' : 'text-secondary bg-light'}`}>
                            {number}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
                    <button onClick={() => paginate(currentPage + 1)} className="page-link border-0 text-dark bg-transparent">
                        &raquo;
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;