import React, { useState } from 'react'
import ReactPaginate from 'react-paginate';
import { StyledPagination } from './Pagination.styled';

export default function Pagination({ itemsPerPage, totalItems, handlePageChange }) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const pageCount = Math.ceil(totalItems / itemsPerPage);
    console.log(pageCount)

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % totalItems;
        console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
        handlePageChange(event.selected +1)
        window.scrollTo(0, 0)
    };

    return (
        <StyledPagination>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName='pagination'
                marginPagesDisplayed={1}
            />
        </StyledPagination>

    )
}
