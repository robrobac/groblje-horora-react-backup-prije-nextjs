import React, { useEffect, useState } from 'react'
import { TableContainer, TableItem } from './PostsTable.styled'
import Rating from '../../../components/Rating'

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
    const [order, setOrder] = useState(true)
    const [search, setSearch] = useState('')
    console.log(search)

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await fetch(`http://localhost:4000/api/reviews?search=${search}&sort=${sort}&order=${order}`)
            const json = await response.json()

            if (response.ok) {
                setReviews(json)
            }
        }

        fetchReviews()
    }, [order, sort, search])

    const isSingleReview = (review) => {
        if (review.reviewType === 'single') {
            return true
        }
        if (review.reviewType === 'quad') {
            return false
        }
    }


    return (
        <>
        <input type='search' value={search} onChange={(e) => setSearch(e.target.value)}/>
        <TableContainer>
            <TableItem className="tableItem">
                <div className='title tableHeader' style={{pointerEvents: search ? 'none' : 'auto'}} onClick={() => {setOrder(!order); setSort(SORT_OPTIONS.TITLE)}}>
                    Title <span>{sort === 'reviewTitle' && !search ? (order ? '🔽' : '🔼') : ''}</span>
                </div>
                <div className='category tableHeader' style={{pointerEvents: search ? 'none' : 'auto'}} onClick={() => {setOrder(!order); setSort(SORT_OPTIONS.CATEGORY)}}>
                    Category <span>{sort === 'reviewType' && !search ? (order ? '🔽' : '🔼') : ''}</span>
                </div>
                <div className='rating tableHeader' style={{pointerEvents: search ? 'none' : 'auto'}} onClick={() => {setOrder(!order); setSort(SORT_OPTIONS.RATING)}}>
                    Rating <span>{sort === 'movies.0.rating' && !search ? (order ? '🔽' : '🔼') : ''}</span>
                </div>
                <div className='datePublished tableHeader' style={{pointerEvents: search ? 'none' : 'auto'}} onClick={() => {setOrder(!order); setSort(SORT_OPTIONS.CREATED)}}>
                    Date Published <span>{sort === 'createdAt' && !search ? (order ? '🔽' : '🔼') : ''}</span>
                </div>
                <div className='dateEdited tableHeader' style={{pointerEvents: search ? 'none' : 'auto'}} onClick={() => {setOrder(!order); setSort(SORT_OPTIONS.UPDATED)}}>
                    Date Edited <span>{sort === 'updatedAt' && !search ? (order ? '🔽' : '🔼') : ''}</span>
                </div>
            </TableItem>
            {reviews?.map((review) => (
                <TableItem className="tableItem">
                    <div className='title'>{review.reviewTitle}</div>
                    <div className='category'>{isSingleReview(review) ? 'Recenzija' : 'Kratki pregled'}</div>
                    <div className='rating'>
                        {isSingleReview(review) ? <Rating rating={review.movies[0].rating} /> : ''}
                    </div>
                    <div className='datePublished'>{review.createdAt}</div>
                    <div className='dateEdited'>{review.updatedAt}</div>
                </TableItem>
            ))}
        </TableContainer>
        </>
    )
}
