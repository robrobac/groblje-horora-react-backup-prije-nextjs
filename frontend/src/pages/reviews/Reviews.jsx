import React from 'react'
import ReviewCard from '../../components/postsGrid/ReviewCard'
import useFetchReviewsWithParams from '../../hooks/useFetchReviewsWithParams'
import { SORT_OPTIONS } from '../../helpers/sortOptions'
import { PageSection } from '../Pages.styles'
import Search from '../../components/searchBar/Search'
import { Grid } from '../../components/postsGrid/PostsGrid.styles'
import Pagination from '../../components/Pagination'
import { ReviewsContainer } from './Reviews.styled'

// Styled Components


export default function Reviews() {
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
    } = useFetchReviewsWithParams('recenzije', SORT_OPTIONS.CREATED, 'desc', 4)
    
    return (

        <ReviewsContainer>
            <Search controls={true} handleSearch={handleSearch} search={search} sort={sort} order={order} handleSortAndOrder={handleSortAndOrder} handleFilter={handleFilter} filter={filter}/>
            <Grid>
                {reviews && reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                ))}
            </Grid>
            <Pagination itemsPerPage={4} items={reviews} totalItems={totalItems} handlePageChange={handlePageChange}/>
        </ReviewsContainer>
    )
}
