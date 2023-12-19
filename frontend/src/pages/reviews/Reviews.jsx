import React from 'react'
import useFetchReviewsWithParams from '../../hooks/useFetchReviewsWithParams'
import { SORT_OPTIONS } from '../../helpers/sortOptions'
import Search from '../../components/searchBar/Search'
import { ReviewsContainer } from './Reviews.styled'
import Pagination from '../../components/pagination/Pagination'
import PostsFlex from '../../components/postsFlex/PostsFlex'
import HandleDocumentTitle from '../../helpers/handleDocumentTitle'

// Styled Components


export default function Reviews() {
    HandleDocumentTitle('Recenzije - Groblje Horora')

    const {
        handleSearch,
        search,
        sort,
        order,
        handleSortAndOrder,
        handleFilter,
        filter,
        reviews,
        totalPages,
        handlePageChange,
        page,
        totalItems
    } = useFetchReviewsWithParams('recenzije', SORT_OPTIONS.CREATED, 'desc', 30)

    
    
    return (
        <ReviewsContainer>
            <Search controls={true} handleSearch={handleSearch} search={search} sort={sort} order={order} handleSortAndOrder={handleSortAndOrder} handleFilter={handleFilter} filter={filter}/>
            <PostsFlex posts={reviews}/>
            <Pagination itemsPerPage={30} items={reviews} totalItems={totalItems} handlePageChange={handlePageChange}/>
        </ReviewsContainer>
    )
}
