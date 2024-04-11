import React,  { useState  } from "react";
import './Pagination.css'


const  Pagination = ({dataPage, currentPage, setCurrentPage, totalPage}) => { 
  
  const pageNumber = []

  for(let i= 1; i <= Math.ceil(totalPage/ dataPage); i++) {
    pageNumber.push(i)
  }

  const onPreviousPage = () => {
    setCurrentPage(currentPage - 1)
  }
  const onNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const onSpecificPage = (page) => {
    setCurrentPage(page)
  }


  return (
    <div className="pagination__container">
      <div >
        <button
          type="button"
          className={`px-5 py-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentPage === 1}
          onClick={() => onPreviousPage()}
          >
          Prev
        </button>
      </div>
          <div className="containerNumber__page">
            {pageNumber.map(page => (
              <div className={`number__page ${page === currentPage && 'current__page'}`} onClick={() => onSpecificPage(page)}  key={page}>{page}</div>
            ))}
          </div>
        <div>
          <button
            className={`px-5 py-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${currentPage >= pageNumber.length ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="button"
            disabled={currentPage >= pageNumber.length}
            onClick={() => onNextPage()}
          >
          Next
          </button>
        </div>
    </div>
  )
}

export default Pagination;