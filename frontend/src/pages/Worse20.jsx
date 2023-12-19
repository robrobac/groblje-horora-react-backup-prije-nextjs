import React, { useEffect, useState } from 'react'
import { ReviewsContainer } from './reviews/Reviews.styled'
import PostsFlex from '../components/postsFlex/PostsFlex'
import HandleDocumentTitle from '../helpers/handleDocumentTitle'

export default function Worse20() {
    HandleDocumentTitle('Top 20 smeća - Groblje Horora')
    
    const [reviews, setReviews] = useState(null)

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await fetch('http://localhost:4000/api/reviews/worse20')
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
