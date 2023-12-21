import React, { useContext, useEffect, useState } from 'react'
import { ReviewsContainer } from './reviews/Reviews.styled'
import PostsFlex from '../components/postsFlex/PostsFlex'
import HandleDocumentTitle from '../helpers/handleDocumentTitle'
import { LoadingContext } from '../App'
import Loading from '../components/loading/Loading'

export default function Top25() {
    HandleDocumentTitle('Top 25 - Groblje Horora')
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
        <ReviewsContainer>
            {loading ? <Loading /> : ''}
            <PostsFlex posts={reviews}/>
        </ReviewsContainer>
    )
}
