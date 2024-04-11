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
          <button className="btn__pagination" disabled={currentPage === 1} onClick={() => onPreviousPage()}>anterior</button>
        </div>
          <div className="containerNumber__page">
            {pageNumber.map(page => (
              <div className={`number__page ${page === currentPage && 'current__page'}`} onClick={() => onSpecificPage(page)}  key={page}>{page}</div>
            ))}
          </div>
        <div >
          <button className="btn__pagination" disabled={currentPage >= pageNumber.length} onClick={() => onNextPage()}>siguiente</button>
        </div>
    </div>
  )
}

export default Pagination;