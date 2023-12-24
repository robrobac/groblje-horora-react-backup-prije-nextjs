import React, { useContext, useEffect, useState } from 'react'
import { LatestRecenzijaContainer, LatestSingleImage, RecenzijaDescription, RecenzijaSubTitle, RecenzijaTitle } from './LatestRecenzija.styled'
import Rating from '../Rating'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { draftToHtmlConvert } from '../../helpers/draftToHtmlConvert'
import ButtonStandard from '../buttons/ButtonStandard'
import { LoadingContext } from '../../App'
import Loading from '../loading/Loading'

export default function LatestRecenzija() {
    const [review, setReview] = useState(null)
    const [createdDate, setCreatedDate] = useState("00.00.0000")
    const [reviewDescription, setReviewDescription] = useState('')
    const {loading, handleLoading} = useContext(LoadingContext)
    console.log(review)

    useEffect(() => {
        const fetchReview = async () => {
            handleLoading(true)
            document.body.classList.add('loading');
            try {
                const response = await fetch(`http://localhost:4000/api/reviews/latestSingle`)
                const json = await response.json()

                if (response.ok) {
                    setReview(json[0])

                    const createdAtDate = new Date(json[0].createdAt);
                    const formattedDate = format(createdAtDate, 'dd.MM.yyyy')
                    setCreatedDate(formattedDate)
                    const formattedDescription = draftToHtmlConvert(JSON.parse(json[0].movies[0].reviewContent))
                    setReviewDescription(formattedDescription)
                }
            } catch (err) {
                console.log(err)
            } finally {
                handleLoading(false)
                document.body.classList.remove('loading');
            }
        }

        fetchReview()
    }, [])

    return (
        <>
        {loading ? <Loading variant='transparent'/> : ''}
        {/* DESKTOP VERSION */}
        <LatestRecenzijaContainer className='desktopRecenzija'>
            <div className='latestSingleInfo'>
                <RecenzijaSubTitle>
                    Najnovija Recenzija <span>{createdDate}</span>
                </RecenzijaSubTitle>
                <div className="titleAndRating">
                    <RecenzijaTitle>
                        <Link to={`/recenzije/${review?.slug}`}>
                            {review?.movies[0].title} <span>({review?.movies[0].year})</span>
                        </Link>
                    </RecenzijaTitle>
                    <Rating rating={review?.movies[0].rating} detailed={true} />
                    <RecenzijaDescription dangerouslySetInnerHTML={{__html: reviewDescription}}/>
                </div>
                <ButtonStandard path={`/recenzije/${review?.slug}`} content='Pročitaj više'/>
            </div>
                <LatestSingleImage>
                    <Link to={`/recenzije/${review?.slug}`}>
                        <img src={review?.movies[0].coverImage} alt='movie-cover' ></img>
                    </Link>
                </LatestSingleImage>
        </LatestRecenzijaContainer>

        {/* MOBILE VERSION, component reordered only. */}
        <LatestRecenzijaContainer className='mobileRecenzija'>
            <RecenzijaSubTitle>
                Najnovija Recenzija <span>{createdDate}</span>
            </RecenzijaSubTitle>
            <div className='latestSingleInfo'>
            
            <LatestSingleImage>
                <Link to={`/recenzije/${review?.slug}`} style={{display: 'flex'}}>
                    <img src={review?.movies[0].coverImage} alt='movie-cover' ></img>
                </Link>
            </LatestSingleImage>
            <div className="titleAndRating">
                <RecenzijaTitle>
                    <Link to={`/recenzije/${review?.slug}`}>
                        {review?.movies[0].title} <span>({review?.movies[0].year})</span>
                    </Link>
                </RecenzijaTitle>
                <Rating rating={review?.movies[0].rating} detailed={true} />
                <RecenzijaDescription dangerouslySetInnerHTML={{__html: reviewDescription}}/>
            </div>
            <div className='buttonContainer'>
                <ButtonStandard path={`/recenzije/${review?.slug}`} content='Pročitaj više'/>
            </div>
            
        </div>
        </LatestRecenzijaContainer>
        </>
    )
}
