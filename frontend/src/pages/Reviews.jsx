import React, { useEffect, useState } from 'react'
import ReviewCard from '../components/postsGrid/ReviewCard'
import { useSearchParams, useNavigate } from 'react-router-dom';


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
    
    

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();



    // Page States and Params
    const urlPage = searchParams.get('page');
    const [page, setPage] = useState(urlPage ? parseInt(urlPage) : 1);
    const [perPage, setPerPage] = useState(4);
    const [totalPages, setTotalPages] = useState([])

    // Search State and Params
    const urlSearch = searchParams.get('search')
    const [search, setSearch] = useState(urlSearch ? urlSearch : '')

    const urlSort = searchParams.get('sort');
    const [sort, setSort] = useState(urlSort ? urlSort : SORT_OPTIONS.CREATED)
    const urlOrder = searchParams.get('order');
    const [order, setOrder] = useState(urlOrder ? urlOrder : 'desc')

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await fetch(`http://localhost:4000/api/reviews?search=${search}&sort=${sort}&order=${order}&page=${page}&perPage=${perPage}`);
            const json = await response.json();

            if (response.ok) {
                setReviews(json.reviews);
                const pagesArray = Array.from({ length: json.totalPages }, (_, index) => index + 1);
                setTotalPages(pagesArray);
            }
        };

        fetchReviews();
    }, [navigate, order, sort, search, page, perPage]);

    useEffect(() => {
        let url = `/recenzije?page=${page}`;

        if (search) {
            url += `&search=${search}`
        }
        if (sort !== SORT_OPTIONS.CREATED) {
            url += `&sort=${sort}&order=${order}`
        }

        navigate(url)
    }, [navigate, order, page, search, sort])

    useEffect(() => {
        setPage(1)
    }, [sort, order])

    const handlePageChange = (num) => {
        console.log(num)
        setPage(num)
    }

    const handleSearch = (value) =>{
        setSearch(value)
    }

    const handleSortAndOrder = (sortVal, orderVal) => {
        if (sort === sortVal) {
            if (orderVal === 'desc') {
                setOrder('asc')
            }
            if (orderVal === 'asc') {
                setOrder('desc')
            }
        } else {
            setSort(sortVal)

            if (sortVal === SORT_OPTIONS.TITLE) {
                setOrder('asc')
                return
            }
            if (sortVal === SORT_OPTIONS.CATEGORY) {
                setOrder('asc')
                return
            }
            setOrder('desc')
        } 
    }

    return (
        <PageContainer>
            <PageSection>
                <SearchContainer>
                    <SearchIcon htmlFor='adminSearch'>
                        <SearchIconSVG />
                    </SearchIcon>
                    <SearchBar id='adminSearch' type='search' placeholder='Search' value={search} onChange={(e) => {handleSearch(e.target.value); setPage(1)}}/>
                </SearchContainer>
                <div
                            className='title tableHeader'
                            style={{pointerEvents: search ? 'none' : 'auto'}}
                            onClick={() => handleSortAndOrder(SORT_OPTIONS.TITLE, order)}>
                                Title<span>{sort === 'reviewTitle' && !search ? (order === 'desc' ? '🔽' : '🔼') : ''}</span>
                        </div>
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
