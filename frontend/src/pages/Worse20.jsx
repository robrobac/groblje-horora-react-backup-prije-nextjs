import React, { useContext, useEffect, useState } from 'react'
import { ReviewsContainer } from './reviews/Reviews.styled'
import PostsFlex from '../components/postsFlex/PostsFlex'
import { LoadingContext } from '../App'
import Loading from '../components/loading/Loading'
import HelmetSettings from '../components/HelmetSettings'

export default function Worse20() {
    const {loading, handleLoading} = useContext(LoadingContext)
    const [reviews, setReviews] = useState(null)

    useEffect(() => {
        const fetchReviews = async () => {
            handleLoading(true)
            try {
                const response = await fetch('http://localhost:4000/api/reviews/worse20')
                const json = await response.json()

                if (response.ok) {
                    setReviews(json)
                }
            } catch (err) {
                console.log(err)
            } finally {
                handleLoading(false)
            }
        }

        fetchReviews()
    }, [])

    

    return (
        <>
            <HelmetSettings
                title={`Top 20 smeća - Groblje Horora`}
                description={`
                    Filmovi na ovoj top listi su najveće smeće ikada. Linkove na recenzije možete pronaći na Top 20 smeća popisu.
                `}
                url={`https://www.groblje-horora.com/top20smeca`}
                image={`%PUBLIC_URL%/images/groblje-horora-og-image.webp`}
            />
            <ReviewsContainer>
                {loading ? <Loading /> : ''}
                <PostsFlex posts={reviews}/>
            </ReviewsContainer>
        </>
    )
}
