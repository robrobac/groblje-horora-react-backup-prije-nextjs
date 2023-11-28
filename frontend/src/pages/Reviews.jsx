import React, { useEffect, useState } from 'react'
import ReviewCard from '../components/postsGrid/ReviewCard'
import { useSearchParams, useNavigate } from 'react-router-dom';


// Styled Components
import { Grid } from '../components/postsGrid/PostsGrid.styles'
import { PageContainer, PageSection } from './Pages.styles'
import { PaginationContainer } from './Dashboard/AdminPostsTable/PostsTable.styled';
import Search from '../components/searchBar/Search';
import { SORT_OPTIONS } from '../helpers/sortOptions';


export default function Reviews() {
    const [reviews, setReviews] = useState([])

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Page States and Params
    const urlPage = searchParams.get('page');
    const [page, setPage] = useState(urlPage ? parseInt(urlPage) : 2);
    // eslint-disable-next-line no-unused-vars
    const [perPage, setPerPage] = useState(4);
    const [totalPages, setTotalPages] = useState([])

    // Search State and Params
    const urlSearch = searchParams.get('search')
    const [search, setSearch] = useState(urlSearch ? urlSearch : '')

    const urlSort = searchParams.get('sort');
    const [sort, setSort] = useState(urlSort ? urlSort : SORT_OPTIONS.CREATED)
    const urlOrder = searchParams.get('order');
    const [order, setOrder] = useState(urlOrder ? urlOrder : 'desc')

    const urlFilter = searchParams.get('filter')
    const [filter, setFilter] = useState(urlFilter ? urlFilter : '')

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await fetch(`http://localhost:4000/api/reviews?search=${search}&sort=${sort}&order=${order}&page=${page}&perPage=${perPage}&filter=${filter}`);
            const json = await response.json();

            if (response.ok) {
                setReviews(json.reviews);
                const pagesArray = Array.from({ length: json.totalPages }, (_, index) => index + 1);
                setTotalPages(pagesArray);
            }
        };

        fetchReviews();
    }, [navigate, order, sort, search, page, perPage, filter]);

    useEffect(() => {
        let url = `/recenzije?page=${page}`;

        if (search) {
            url += `&search=${search}`
        }
        if (filter !== '') {
            url += `&filter=${filter}`
        }
        if (!(sort === SORT_OPTIONS.CREATED && order === 'desc' && filter === '')) {
            url += `&sort=${sort}&order=${order}`
        }
        
        navigate(url)
    }, [filter, navigate, order, page, search, sort])

    const handlePageChange = (num) => {
        console.log(num)
        setPage(num)
    }

    const handleFilter = (value) => {
        setFilter(value)
        setPage(1)
    }

    const handleSearch = (value) => {
        setSearch(value)
        setPage(1)
    }

    const handleSortAndOrder = (sortVal, orderVal) => {
        if (sort === sortVal) {
            if (orderVal === 'desc') {
                setOrder('asc')
                setPage(1)
            }
            if (orderVal === 'asc') {
                setOrder('desc')
                setPage(1)
            }
        } else {
            setSort(sortVal)

            if (sortVal === SORT_OPTIONS.TITLE) {
                setOrder('asc')
                setPage(1)
                return
            }
            if (sortVal === SORT_OPTIONS.CATEGORY) {
                setOrder('asc')
                setPage(1)
                return
            }
            setOrder('desc')
            setPage(1)
        } 
    }

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
