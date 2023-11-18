import React, { useEffect, useState } from 'react'
import { TableContainer, TableItem } from './PostsTable.styled'
import Rating from '../../../components/Rating'

export default function PostsTable() {
    const [reviews, setReviews] = useState(null)
    const [sort, setSort] = useState('movies.0.rating')
    const [order, setOrder] = useState(false)

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await fetch(`http://localhost:4000/api/reviews?sort=${sort}&order=${order}`)
            const json = await response.json()

            if (response.ok) {
                setReviews(json)
            }
        }

        fetchReviews()
    }, [order, sort])

    const isSingleReview = (review) => {
        if (review.reviewType === 'single') {
            return true
        }
        if (review.reviewType === 'quad') {
            return false
        }
    }


    return (
        <TableContainer>
            <TableItem className="tableItem">
                <div className='title tableHeader' onClick={() => {setOrder(!order); setSort('reviewTitle')}}>
                    Title <span>{sort === 'reviewTitle' ? (order ? '🔽' : '🔼') : ''}</span>
                </div>
                <div className='category tableHeader' onClick={() => {setOrder(!order); setSort('reviewType')}}>
                    Category <span>{sort === 'reviewType' ? (order ? '🔽' : '🔼') : ''}</span>
                </div>
                <div className='rating tableHeader' onClick={() => {setOrder(!order); setSort('movies.0.rating')}}>
                    Rating <span>{sort === 'movies.0.rating' ? (order ? '🔽' : '🔼') : ''}</span>
                </div>
                <div className='datePublished tableHeader' onClick={() => {setOrder(!order); setSort('createdAt')}}>
                    Date Published <span>{sort === 'createdAt' ? (order ? '🔽' : '🔼') : ''}</span>
                </div>
                <div className='dateEdited tableHeader' onClick={() => {setOrder(!order); setSort('updatedAt')}}>
                    Date Edited <span>{sort === 'updatedAt' ? (order ? '🔽' : '🔼') : ''}</span>
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
    )
}
