import React, { useEffect, useState } from 'react'
import { LatestQuadDate, LatestPregledContainer, QuadCoverContainer, QuadCoverImageContainer, PregledTitle, PregledSubTitle, PregledDescription } from './LatestPregled.styled'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { format, formatDistanceToNow, parse } from 'date-fns'
import { StyledButton } from '../buttons/Buttons.styled'
import ButtonStandard from '../buttons/ButtonStandard'

export default function LatestPregled() {
    const [review, setReview] = useState(null)
    const [createdDate, setCreatedDate] = useState("00.00.0000")
    console.log(createdDate)

    useEffect(() => {
        const fetchReview = async () => {

        const response = await fetch(`http://localhost:4000/api/reviews/latestQuad`)
            const json = await response.json()

            if (response.ok) {
                setReview(json[0])

                const createdAtDate = new Date(json[0].createdAt);
                const formattedDate = format(createdAtDate, 'dd.MM.yyyy')
                setCreatedDate(formattedDate)
            }
        }

        fetchReview()
    }, [])

    return (
        <>
        {/* DESKTOP VERSION */}
        <LatestPregledContainer className='desktopPregled'>
            <div className='latestPregledInfo'>
                <PregledSubTitle>
                    Najnoviji Kratki Pregled <span>{createdDate}</span>
                </PregledSubTitle>
                
                <PregledTitle>
                    <Link to={`/recenzije/${review?._id}`}>
                        {review?.reviewTitle}
                    </Link>
                </PregledTitle>
                
                <PregledDescription>
                    {review?.movies[0].title} <span>({review?.movies[0].year})</span>, {review?.movies[1].title} <span>({review?.movies[1].year})</span>, {review?.movies[2].title} <span>({review?.movies[2].year})</span>, {review?.movies[3].title} <span>({review?.movies[3].year})</span>
                </PregledDescription>
            </div>
            <Link to={`/recenzije/${review?._id}`}>
                <QuadCoverContainer>
                    {review?.movies.map((movie, index) => (
                        <QuadCoverImageContainer key={movie._id}>
                            <img className={`image${index}`} src={movie.coverImage} alt='movie-cover'></img>
                        </QuadCoverImageContainer>
                    ))}
                </QuadCoverContainer>
            </Link>
            <ButtonStandard path={`/recenzije/${review?._id}`} content='Pročitaj više'/>
        </LatestPregledContainer>

        {/* MOBILE VERSION, component reordered only. */}
        <LatestPregledContainer className='mobilePregled'>
            <div className="subtitleContainer">
                <PregledSubTitle>
                    Najnoviji Kratki Pregled <span>{createdDate}</span>
                </PregledSubTitle>
            </div>
            <Link to={`/recenzije/${review?._id}`}>
                <QuadCoverContainer>
                    {review?.movies.map((movie, index) => (
                        <QuadCoverImageContainer key={movie._id}>
                            <img className={`image${index}`} src={movie.coverImage} alt='movie-cover'></img>
                        </QuadCoverImageContainer>
                    ))}
                </QuadCoverContainer>
            </Link>
            <div className='latestPregledInfo'>
                <PregledTitle>
                    <Link to={`/recenzije/${review?._id}`}>
                        {review?.reviewTitle}
                    </Link>
                </PregledTitle>
                
                <PregledDescription>
                    {review?.movies[0].title} <span>({review?.movies[0].year})</span>, {review?.movies[1].title} <span>({review?.movies[1].year})</span>, {review?.movies[2].title} <span>({review?.movies[2].year})</span>, {review?.movies[3].title} <span>({review?.movies[3].year})</span>
                </PregledDescription>
            </div>
            <div className='buttonContainer'>
                <ButtonStandard path={`/recenzije/${review?._id}`} content='Pročitaj više'/>
            </div>
        </LatestPregledContainer>
        </>
    )
}
