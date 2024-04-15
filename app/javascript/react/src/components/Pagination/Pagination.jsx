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
<div className="flex items-center"> {/* Reemplaza .pagination__container */}
  <div>
    <button
      type="button"
      className={`px-3 py-2 text-xs font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={currentPage === 1}
      onClick={() => onPreviousPage()}
    >
      Prev
    </button>
  </div>
  <div className="flex space-x-3 overflow-x-auto"> {/* Reemplaza .containerNumber__page */}
    {pageNumber.map(page => (
      <div
        className={`border border-gray-300 rounded m-2 p-2 ${page === currentPage ? 'bg-[#4ba0ac]  text-white' : ''}`} 
        onClick={() => onSpecificPage(page)}
        key={page}
      >
        {page}
      </div>
    ))}
  </div>
  <div>
    <button
      className={`px-3 py-2 text-xs font-medium ml-2 text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${currentPage >= pageNumber.length ? 'opacity-50 cursor-not-allowed' : ''}`}
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