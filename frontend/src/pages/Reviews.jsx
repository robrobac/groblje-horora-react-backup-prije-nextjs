import React, { useEffect, useState } from 'react'
import ReviewCard from '../components/postsGrid/ReviewCard'


// Styled Components
import { Grid } from '../components/postsGrid/PostsGrid.styles'
import { PageContainer, PageSection } from './Pages.styles'
import { PaginationContainer } from './Dashboard/AdminPostsTable/PostsTable.styled';
import { SearchBar, SearchContainer, SearchIcon } from '../components/SearchBar.styles';
import { ReactComponent as SearchIconSVG } from '../images/search-icon.svg';

const SORT_OPTIONS = {
    TITLE: 'reviewTitle',
    CATEGORY: 'reviewType',
    RATING: 'movies.0.rating',
    CREATED: 'createdAt',
    UPDATED: 'updatedAt',
};


export default function Reviews() {
    const [reviews, setReviews] = useState([])
    const [sort, setSort] = useState(SORT_OPTIONS.CREATED)
    const [order, setOrder] = useState(true)
    const [search, setSearch] = useState('')
    const [totalPages, setTotalPages] = useState([])
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    console.log(totalPages)
    console.log(reviews)

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await fetch(`http://localhost:4000/api/reviews?search=${search}&sort=${sort}&order=${order}&page=${page}&perPage=${perPage}`)
            const json = await response.json()
            console.log(json)

            if (response.ok) {
                setReviews(json.reviews)
                const pagesArray = Array.from({ length: json.totalPages }, (_, index) => (index + 1).toString().padStart(2, 0))
                setTotalPages(pagesArray)
            }
        }

        fetchReviews()
    }, [order, sort, search, page, perPage])

    return (
        <PageContainer>
            <PageSection>
                <SearchContainer>
                    <SearchIcon htmlFor='adminSearch'>
                        <SearchIconSVG />
                    </SearchIcon>
                    <SearchBar id='adminSearch' type='search' placeholder='Search' value={search} onChange={(e) => {setSearch(e.target.value); setPage(1)}}/>
                </SearchContainer>
                <Grid>
                    {reviews && reviews.map((review) => (
                        <ReviewCard key={review._id} review={review} />
                    ))}
                </Grid>
                <PaginationContainer>
                {totalPages?.map((pageNumber, index) => (
                    <button onClick={() => setPage(index + 1)} disabled={index +1 === page}>{pageNumber}</button>
                ))}
                </PaginationContainer>
            </PageSection>
        </PageContainer>
    )
}
