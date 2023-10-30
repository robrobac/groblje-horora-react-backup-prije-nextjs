import React, { useEffect, useState } from 'react'
import ReviewCard from '../components/ReviewCard'


// Styled Components
import { Grid } from '../components/PostsGrid.styled'
import { ReviewsSection } from './Pages.styles'


export default function Recenzije() {
    const [reviews, setReviews] = useState(null)
    console.log(reviews)

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await fetch(`/api/reviews`)
            const json = await response.json()

            if (response.ok) {
                setReviews(json)
            }
        }

        fetchReviews()
    }, [])

    return (
        <ReviewsSection>
            <Grid>
                {reviews && reviews.map((review) => (
                        <ReviewCard key={review._id} review={review} />
                ))}
            </Grid>
        </ReviewsSection>
    )
}
