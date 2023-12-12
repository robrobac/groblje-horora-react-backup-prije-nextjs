import React from 'react'
import ReviewCard from '../components/postsGrid/ReviewCard'

// Styled Components
import { Grid } from '../components/postsGrid/PostsGrid.styles'
import { PageContainer, PageSection } from './Pages.styles'
import Search from '../components/searchBar/Search';
import { SORT_OPTIONS } from '../helpers/sortOptions';
import useFetchReviewsWithParams from '../hooks/useFetchReviewsWithParams';
import Pagination from '../components/Pagination';

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
    } = useFetchReviewsWithParams('recenzije', SORT_OPTIONS.CREATED, 'desc', 1)
    
    return (
        <PageContainer>
            <PageSection>
                <Search controls={true} handleSearch={handleSearch} search={search} sort={sort} order={order} handleSortAndOrder={handleSortAndOrder} handleFilter={handleFilter} filter={filter}/>
                <Grid>
                    {reviews && reviews.map((review) => (
                        <ReviewCard key={review._id} review={review} />
                    ))}
                </Grid>
                <Pagination itemsPerPage={1} items={reviews} totalItems={totalItems} handlePageChange={handlePageChange}/>
            </PageSection>
        </PageContainer>
    )
}
