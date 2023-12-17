import React, { useEffect, useState } from 'react'
import { ReviewsContainer } from './reviews/Reviews.styled'
import PostsFlex from '../components/postsFlex/PostsFlex'

export default function Top25() {
    const [reviews, setReviews] = useState(null)
    console.log(reviews)

    useEffect(() => {
        const fetchReviews = async () => {

            const response = await fetch(`http://localhost:4000/api/reviews/top25`)
            const json = await response.json()

            if (response.ok) {
                setReviews(json)
            }
        }

        fetchReviews()
    }, [])

    return (
        <ReviewsContainer>
            <PostsFlex posts={reviews}/>
        </ReviewsContainer>
    )
}
