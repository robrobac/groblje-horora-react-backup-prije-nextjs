import React, { useEffect, useState } from 'react'
import { LatestQuadDate, LatestPregledContainer, QuadCoverContainer, QuadCoverImageContainer, PregledTitle, PregledSubTitle, PregledDescription } from './LatestPregled.styled'
import { Link } from 'react-router-dom'
import { format, formatDistanceToNow, parse } from 'date-fns'

export default function LatestPregled() {
    const [review, setReview] = useState(null)
    console.log(review)

    useEffect(() => {
        const fetchReview = async () => {

        const response = await fetch(`http://localhost:4000/api/reviews/latestQuad`)
            const json = await response.json()

            if (response.ok) {
                setReview(json[0])
            }
        }

        fetchReview()
    }, [])

    const createdAtDate = new Date("2023-11-23T22:06:46.482Z");
    const formattedDate = format(createdAtDate, 'dd.MM.yyyy');

    return (
        <LatestPregledContainer>
            <div className='latestPregledInfo'>
                <PregledSubTitle>
                    Najnoviji Kratki Pregled <span>{formattedDate}</span>
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
                <QuadCoverContainer>
                    {review?.movies.map((movie, index) => (
                        <QuadCoverImageContainer key={movie._id}>
                            <img className={`${index === 0 ? 'firstImage' : ''} ${index === 3 ? 'lastImage' : ''}`} src={movie.coverImage} alt='movie-cover'></img>
                        </QuadCoverImageContainer>
                    ))}
                </QuadCoverContainer>
        </LatestPregledContainer>
    )
}
