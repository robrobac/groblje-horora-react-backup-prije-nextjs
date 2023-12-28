import React, { useContext, useEffect, useState } from 'react'
import { ReviewsContainer } from './reviews/Reviews.styled'
import PostsFlex from '../components/postsFlex/PostsFlex'
import { LoadingContext } from '../App'
import Loading from '../components/loading/Loading'
import HelmetSettings from '../components/HelmetSettings'

export default function Top25() {
    const [reviews, setReviews] = useState(null)
    const {loading, handleLoading} = useContext(LoadingContext)

    useEffect(() => {
        const fetchReviews = async () => {
            handleLoading(true)
            try {
                const response = await fetch(`http://localhost:4000/api/reviews/top25`)
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
                title={`Top 25 - Groblje Horora`}
                description={`
                    Filmovi na ovoj top listi mijenjaju se kako dođe neki novi naslov na blogu koji zaslužuje jednaku pažnju ili ocjenu. Linkove na recenzije možete pronaći na Top 25 popisu.
                `}
                url={`https://www.groblje-horora.com/top25`}
                image={`%PUBLIC_URL%/images/groblje-horora-og-image.webp`}
            />
            <ReviewsContainer>
                {loading ? <Loading /> : ''}
                <PostsFlex posts={reviews}/>
            </ReviewsContainer>
        </>
    )
}
