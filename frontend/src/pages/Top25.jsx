import React, { useEffect, useState } from 'react'
import { ReviewsContainer } from './reviews/Reviews.styled'
import PostsFlex from '../components/postsFlex/PostsFlex'
import HandleDocumentTitle from '../helpers/handleDocumentTitle'

export default function Top25() {
    HandleDocumentTitle('Top 25 - Groblje Horora')

    const [reviews, setReviews] = useState(null)

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
