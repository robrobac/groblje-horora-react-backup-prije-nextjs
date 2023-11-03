import React, { useEffect, useState } from 'react'
import { Grid } from '../components/postsGrid/PostsGrid.styles'
import ReviewCard from '../components/postsGrid/ReviewCard'
import { PageContainer } from './Pages.styles'

export default function Worse20() {
    const [reviews, setReviews] = useState(null)
    console.log(reviews)

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await fetch('/api/reviews/worse20')
            const json = await response.json()

            if (response.ok) {
                setReviews(json)
            }
        }

        fetchReviews()
    }, [])

    return (
        <PageContainer>       
            <Grid>
                {reviews && reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                ))}
            </Grid>
        </PageContainer>
    )
}
