import React, { useEffect, useState } from 'react'
import ReviewCard from '../components/postsGrid/ReviewCard'


// Styled Components
import { Grid } from '../components/postsGrid/PostsGrid.styles'
import { PageContainer, PageSection } from './Pages.styles'


export default function Recenzije() {
    const [reviews, setReviews] = useState(null)
    console.log(reviews)

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await fetch(`http://localhost:4000/api/reviews`)
            const json = await response.json()

            if (response.ok) {
                setReviews(json)
            }
        }

        fetchReviews()
    }, [])

    return (
        <PageContainer>
            <PageSection>
                <Grid>
                    {reviews && reviews.map((review) => (
                        <ReviewCard key={review._id} review={review} />
                    ))}
                </Grid>
            </PageSection>
        </PageContainer>
    )
}
