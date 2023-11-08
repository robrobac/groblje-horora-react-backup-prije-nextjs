import React from 'react'
import { ReadMoreButton } from '../Button.styles'
import { Link } from 'react-router-dom'

import Rating from '../Rating';
import { PreviewContainer, PreviewDetails, PreviewImage, QuadImage, QuadImageContainer } from './ReviewCard.styles';

export default function ReviewCard({review}) {

    if (review.movies.length === 1) {
        return (
            <PreviewContainer>
                <PreviewImage>
                    <img src={review.movies[0].coverImage} alt='movie-cover'></img>
                </PreviewImage>
                <PreviewDetails>
                    <div>
                        <h3>{review.movies[0].title} <span>({review.movies[0].year})</span></h3>
                        <Rating rating={review.movies[0].rating} detailed={false}/>
                    </div>
                    <Link to={`/recenzije/${review._id}`}><ReadMoreButton>Pročitaj više</ReadMoreButton></Link> 
                </PreviewDetails>
            </PreviewContainer>
        )
    }

    if (review.movies.length === 4)
    return (
        <PreviewContainer>
                <QuadImageContainer>
                    <QuadImage>
                        <img src={review.movies[0].coverImage} alt='movie-cover'></img>
                    </QuadImage>
                    <QuadImage>
                        <img src={review.movies[1].coverImage} alt='movie-cover'></img>
                    </QuadImage>
                    <QuadImage>
                        <img src={review.movies[2].coverImage} alt='movie-cover'></img>
                    </QuadImage>
                    <QuadImage>
                        <img src={review.movies[3].coverImage} alt='movie-cover'></img>
                    </QuadImage>
                </QuadImageContainer>
                <PreviewDetails>
                    <div>
                        <h3>{review.reviewTitle}</h3>
                        <div className='movieTitles'>
                            <p>
                                {review.movies[0].title}({review.movies[0].year}), {review.movies[1].title}({review.movies[1].year}), {review.movies[2].title}({review.movies[2].year}), {review.movies[3].title}({review.movies[3].year})
                            </p>
                        </div>
                    </div>
                    <Link to={`/recenzije/${review._id}`}>
                        <ReadMoreButton>Pročitaj više</ReadMoreButton>
                    </Link> 
                </PreviewDetails>
            </PreviewContainer>
    )
}

