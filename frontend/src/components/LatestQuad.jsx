import React, { useEffect, useState } from 'react'
import { LatestQuadDate, LatestQuadReview, QuadCoverContainer, QuadCoverImageContainer } from './LatestQuad.styles'
import { Link } from 'react-router-dom'

export default function LatestQuad() {
    const [review, setReview] = useState(null)

    useEffect(() => {
        const fetchReview = async () => {

        const response = await fetch(`http://localhost:4000/api/reviews/latestQuad`)
            const json = await response.json()

            if (response.ok) {
                setReview(json[0])
            }
        }

        fetchReview()
    }, [])

    return (
        <LatestQuadReview>
            <div className='latestQuadInfo'>
                <h2>{review?.reviewTitle}</h2>
                <p>
                    {review?.movies[0].title} ({review?.movies[0].year}), {review?.movies[1].title} ({review?.movies[1].year}), {review?.movies[2].title} ({review?.movies[2].year}), {review?.movies[3].title} ({review?.movies[3].year})
                </p>
            </div>
            <LatestQuadDate>07.11.2023.</LatestQuadDate>
            <Link to={`/recenzije/${review?._id}`}>
                <QuadCoverContainer>
                    {review?.movies.map((movie) => (
                        <QuadCoverImageContainer key={movie._id}>
                            <img src={movie.coverImage} alt='movie-cover' ></img>
                        </QuadCoverImageContainer>
                    ))}
                </QuadCoverContainer>
            </Link>
        </LatestQuadReview>
    )
}
