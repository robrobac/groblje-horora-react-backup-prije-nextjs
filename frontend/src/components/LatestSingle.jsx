import React, { useEffect, useState } from 'react'
import { LatestSingleDate, LatestSingleImage, LatestSingleReview } from './LatestSingle.style'
import Rating from './Rating'
import { ReadMoreButtonRed } from './Button.styles'

export default function LatestSingle() {
    const [review, setReview] = useState(null)
    console.log(review)

    useEffect(() => {
        const fetchReview = async () => {

        const response = await fetch(`http://localhost:4000/api/reviews/latestSingle`)
            const json = await response.json()

            if (response.ok) {
                setReview(json[0])
            }
        }

        fetchReview()
    }, [])

    return (
        <LatestSingleReview>
            
            <div className='latestSingleInfo'>
                <span>Najnovije</span>
                <div>
                    <h2>{review?.movies[0].title} ({review?.movies[0].year})</h2>
                    <Rating rating={review?.movies[0].rating} detailed={true} />
                </div>
                <LatestSingleDate>07.11.2023.</LatestSingleDate>
                <ReadMoreButtonRed>Pročitaj više</ReadMoreButtonRed>
            </div>
            <LatestSingleImage>
                <img src={review?.movies[0].coverImage} alt='movie-cover' ></img>
            </LatestSingleImage>
        </LatestSingleReview>
    )
}
