import React, { useEffect, useState } from 'react'
import { PageForm, PageInput, PaginationButton, StyledPagination } from './Pagination.styled'

export default function Pagination({currentPage, totalPages, handlePageChange}) {
    const [page, setPage] = useState(1)
    const [inputPage, setInputPage] = useState(1)


    useEffect(() => {
        setPage(currentPage)
        setInputPage(currentPage)
    }, [currentPage])

    const changePage = (value) => {
        const pageNumber = parseInt(value, 10);
        handlePageChange(pageNumber)
    }

    const handlePageInput = (e) => {
        e.preventDefault()
        changePage(inputPage)

    }

    return (
        <StyledPagination>
            <PaginationButton onClick={() => changePage(page - 1)} className={page === 1 ? 'disabled' : ''} disabled={page === 1}>{`<`}</PaginationButton>
            <PageForm onSubmit={handlePageInput}>
                <PageInput type='number' value={inputPage} onChange={(e) => setInputPage(e.target.value)} min={1} max={totalPages.length}/>
                <p>/</p>
                <p>{totalPages.length || 1}</p>
            </PageForm>
            <PaginationButton onClick={() => changePage(page + 1)} className={page === totalPages.length || totalPages.length === 0 ? 'disabled' : ''} disabled={page === totalPages.length}>{`>`}</PaginationButton>
        </StyledPagination>
    )
}
