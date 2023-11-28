import React from 'react'
import ReviewCard from '../components/postsGrid/ReviewCard'

// Styled Components
import { Grid } from '../components/postsGrid/PostsGrid.styles'
import { PageContainer, PageSection } from './Pages.styles'
import { PaginationContainer } from './Dashboard/AdminPostsTable/PostsTable.styled';
import Search from '../components/searchBar/Search';
import { SORT_OPTIONS } from '../helpers/sortOptions';
import useFetchReviewsWithParams from '../hooks/useFetchReviewsWithParams';

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
        page
    } = useFetchReviewsWithParams('recenzije', SORT_OPTIONS.CREATED, 'desc', 2)
    
    return (
        <PageContainer>
            <PageSection>
                <Search controls={true} handleSearch={handleSearch} search={search} sort={sort} order={order} handleSortAndOrder={handleSortAndOrder} handleFilter={handleFilter} filter={filter}/>
                <Grid>
                    {reviews && reviews.map((review) => (
                        <ReviewCard key={review._id} review={review} />
                    ))}
                </Grid>
                <PaginationContainer>
                {totalPages?.map((pageNumber, index) => (
                    <button onClick={() => handlePageChange(pageNumber)} disabled={index + 1 === page}>{pageNumber.toString().padStart(2,0)}</button>
                ))}
                </PaginationContainer>
            </PageSection>
        </PageContainer>
    )
}
