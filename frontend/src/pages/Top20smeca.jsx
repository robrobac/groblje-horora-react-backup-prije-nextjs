import React, { useEffect, useState } from 'react'
import { Top25smecaSection } from './Top20smeca.styled'
import { Grid } from '../components/PostsGrid.styled'
import ReviewCard from '../components/ReviewCard'

export default function Top20smeca() {
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
        <Top25smecaSection>       
            <Grid>
                {reviews && reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                ))}
            </Grid>
        </Top25smecaSection>
    )
}
