import React, { useEffect, useState } from 'react'
import { LatestRecenzijaContainer, LatestSingleDate, LatestSingleImage, LatestSingleReview, RecenzijaDescription, RecenzijaSubTitle, RecenzijaTitle } from './LatestRecenzija.styled'
import { ReadMoreButtonRed } from '../Button.styles'
import Rating from '../Rating'
import { format } from 'date-fns'
import { Link, useNavigate } from 'react-router-dom'
import draftToHtml from 'draftjs-to-html'
import { StyledButton } from '../buttons/Buttons.styled'
import { draftToHtmlConvert } from '../../helpers/draftToHtmlConvert'
import ButtonStandard from '../buttons/ButtonStandard'

export default function LatestRecenzija() {
    const [review, setReview] = useState(null)
    const [createdDate, setCreatedDate] = useState("00.00.0000")
    const [reviewDescription, setReviewDescription] = useState('')
    console.log(review)

    useEffect(() => {
        const fetchReview = async () => {

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
        }

        fetchReview()
    }, [])

    return (
        <>
        {/* DESKTOP VERSION */}
        <LatestRecenzijaContainer className='desktopRecenzija'>
            <div className='latestSingleInfo'>
                <RecenzijaSubTitle>
                    Najnovija Recenzija <span>{createdDate}</span>
                </RecenzijaSubTitle>
                <div className="titleAndRating">
                    <RecenzijaTitle>
                        <Link to={`/recenzije/${review?._id}`}>
                            {review?.movies[0].title} <span>({review?.movies[0].year})</span>
                        </Link>
                    </RecenzijaTitle>
                    <Rating rating={review?.movies[0].rating} detailed={true} />
                    <RecenzijaDescription dangerouslySetInnerHTML={{__html: reviewDescription}}/>
                </div>
                <ButtonStandard path={`/recenzije/${review?._id}`} />
            </div>
                <LatestSingleImage>
                    <Link to={`/recenzije/${review?._id}`}>
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
                <Link to={`/recenzije/${review?._id}`}>
                    <img src={review?.movies[0].coverImage} alt='movie-cover' ></img>
                </Link>
            </LatestSingleImage>
            <div className="titleAndRating">
                <RecenzijaTitle>
                    <Link to={`/recenzije/${review?._id}`}>
                        {review?.movies[0].title} <span>({review?.movies[0].year})</span>
                    </Link>
                </RecenzijaTitle>
                <Rating rating={review?.movies[0].rating} detailed={true} />
                <RecenzijaDescription dangerouslySetInnerHTML={{__html: reviewDescription}}/>
            </div>
            <div className='buttonContainer'>
                <ButtonStandard path={`/recenzije/${review?._id}`} />
            </div>
            
        </div>
        </LatestRecenzijaContainer>
        </>
    )
}
