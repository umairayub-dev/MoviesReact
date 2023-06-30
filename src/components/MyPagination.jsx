import React, { useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap'

const MyPagination = ({ totalItems, currentPage, gotoPage }) => {
    const [pages, setPages] = useState([])
    console.log(currentPage)
    useEffect(() => {
        setPages(calcPages(totalItems, 7))
    }, [totalItems, currentPage])

    const calcPages = (totalItems, maxVisible) => {
        const pageSize = 20;
        const totalPages = Math.ceil(totalItems / pageSize);
        const halfRange = Math.floor(maxVisible / 2)
        let startPage = currentPage - halfRange
        let endPage = currentPage + halfRange

        if (startPage <= 0) {
            endPage += Math.abs(startPage)
            startPage = 1
        }
        if (endPage > totalPages) {
            startPage -= endPage - totalPages
            endPage = totalPages
        }
        startPage = Math.max(startPage, 1)
        endPage = Math.min(endPage, totalPages)
        const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) =>
            startPage + index
        );

        return pageNumbers
    }

    return (
        <Pagination>
            <Pagination.Prev disabled={currentPage === 1} onClick={() => gotoPage(currentPage - 1)} />
            {pages && pages.map((page, key) => <Pagination.Item key={key} onClick={() => gotoPage(page)} active={page === currentPage}>{page}</Pagination.Item>)}
            {pages.length > 10 && <Pagination.Ellipsis />}
            <Pagination.Next onClick={() => gotoPage(currentPage + 1)} />
            
        </Pagination>
    )
}

export default MyPagination