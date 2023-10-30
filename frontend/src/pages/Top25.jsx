import React, { useEffect, useState } from 'react'
import ReviewCard from '../components/ReviewCard'
import { Grid } from '../components/PostsGrid.styled'
import { Top25Section } from './Pages.styles'

export default function Top25() {
    const [reviews, setReviews] = useState(null)
    console.log(reviews)

    useEffect(() => {
        const fetchReviews = async () => {

            const response = await fetch(`/api/reviews/top25`)
            const json = await response.json()

            if (response.ok) {
                setReviews(json)
            }
        }

        fetchReviews()
    }, [])

    return (
        <Top25Section>       
            <Grid>
                {reviews && reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                ))}
            </Grid>
        </Top25Section>
    )
}
