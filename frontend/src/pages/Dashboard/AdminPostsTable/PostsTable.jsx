import React, { useEffect, useState } from 'react'
import { PaginationContainer, TableContainer, TableItem } from './PostsTable.styled'
import Rating from '../../../components/Rating'
import { SearchBar, SearchContainer, SearchIcon } from '../../../components/SearchBar.styles';
import { ReactComponent as SearchIconSVG } from '../../../images/search-icon.svg';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Link } from 'react-router-dom';
import { PageContainer, PageSection } from '../../Pages.styles';

const SORT_OPTIONS = {
    TITLE: 'reviewTitle',
    CATEGORY: 'reviewType',
    RATING: 'movies.0.rating',
    CREATED: 'createdAt',
    UPDATED: 'updatedAt',
};

export default function PostsTable() {
    const [reviews, setReviews] = useState(null)
    const [sort, setSort] = useState(SORT_OPTIONS.CREATED)
    const [order, setOrder] = useState('desc')
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

    useEffect(() => {
        setPage(1)
    }, [sort, order])

    const isSingleReview = (review) => {
        if (review.reviewType === 'single') {
            return true
        }
        if (review.reviewType === 'quad') {
            return false
        }
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
                    <SearchBar id='adminSearch' type='search' placeholder='Search' value={search} onChange={(e) => {setSearch(e.target.value); setPage(1)}}/>
                </SearchContainer>
                <TableContainer>
                    <TableItem className="tableItem">
                        <div
                            className='title tableHeader'
                            style={{pointerEvents: search ? 'none' : 'auto'}}
                            onClick={() => handleSortAndOrder(SORT_OPTIONS.TITLE, order)}>
                                Title<span>{sort === 'reviewTitle' && !search ? (order === 'desc' ? '🔽' : '🔼') : ''}</span>
                        </div>
                        <div
                            className='category tableHeader'
                            style={{pointerEvents: search ? 'none' : 'auto'}}
                            onClick={() => handleSortAndOrder(SORT_OPTIONS.CATEGORY, order)}>
                                Category <span>{sort === 'reviewType' && !search ? (order === 'desc' ? '🔽' : '🔼') : ''}</span>
                        </div>
                        <div
                            className='rating tableHeader'
                            style={{pointerEvents: search ? 'none' : 'auto'}}
                            onClick={() => handleSortAndOrder(SORT_OPTIONS.RATING, order)}>
                                Rating <span>{sort === 'movies.0.rating' && !search ? (order === 'desc' ? '🔽' : '🔼') : ''}</span>
                        </div>
                        <div
                            className='datePublished tableHeader'
                            style={{pointerEvents: search ? 'none' : 'auto'}}
                            onClick={() => handleSortAndOrder(SORT_OPTIONS.CREATED, order)}>
                                Date Published <span>{sort === 'createdAt' && !search ? (order === 'desc' ? '🔽' : '🔼') : ''}</span>
                        </div>
                        <div
                            className='dateEdited tableHeader'
                            style={{pointerEvents: search ? 'none' : 'auto'}}
                            onClick={() => handleSortAndOrder(SORT_OPTIONS.UPDATED, order)}>
                                Date Edited <span>{sort === 'updatedAt' && !search ? (order === 'desc' ? '🔽' : '🔼') : ''}</span>
                        </div>
                    </TableItem>
                    {reviews?.map((review) => (
                        <TableItem className="tableItem">
                            <div className='title'><Link to={`/recenzije/${review._id}`}>{review.reviewTitle}</Link></div>
                            <div className='category'>{isSingleReview(review) ? 'Recenzija' : 'Kratki pregled'}</div>
                            <div className='rating'>
                                {isSingleReview(review) ? <Rating rating={review.movies[0].rating} /> : ''}
                            </div>
                            <div className='datePublished'>{formatDistanceToNow(new Date(review.createdAt), {addSuffix: true})}</div>
                            <div className='dateEdited'>{formatDistanceToNow(new Date(review.updatedAt), {addSuffix: true})}</div>
                        </TableItem>
                    ))}
                </TableContainer>
                <PaginationContainer>
                {totalPages?.map((pageNumber, index) => (
                    <button onClick={() => setPage(index + 1)} disabled={index +1 === page}>{pageNumber}</button>
                ))}
                </PaginationContainer>
            </PageSection>
        </PageContainer>
    )
}
