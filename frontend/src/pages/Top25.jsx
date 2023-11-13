import React, { useEffect, useState } from 'react'
import ReviewCard from '../components/postsGrid/ReviewCard'
import { Grid } from '../components/postsGrid/PostsGrid.styles'
import { PageContainer } from './Pages.styles'

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
        <PageContainer>       
            <Grid>
                {reviews && reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                ))}
            </Grid>
        </PageContainer>
    )
}
