import React, { useEffect, useState } from 'react'
import Rating from '../Rating'
import draftToHtml from 'draftjs-to-html'
import { MovieContainer, MovieDate, MovieImage, MovieInfo, ReadingContent, ReadingSection, TitleH1, TitleH2 } from './Movie.styled'
import { format } from 'date-fns'

export default function Movie({ post, movie, type}) {
    const [reviewContent, setReviewContent] = useState({})
    
    useEffect(() => {
        // Formatting react-draft-wysiwyg editor data for
        if (movie) {
            const rawContent = JSON.parse(movie?.reviewContent)
            const markup = draftToHtml(
                rawContent,
        )
        // Setting state that will be 
        setReviewContent(markup)
        }
        
    }, [movie.reviewContent])

    return (
        <MovieContainer>
            {type === 'single' ? (
                <MovieInfo id={movie._id}>
                    <MovieImage>
                        <img src={movie.coverImage} alt='movie-cover'></img>
                    </MovieImage>
                    <MovieDate>
                        {format(new Date(post?.createdAt), 'dd.MM.yyyy')}
                    </MovieDate>
                    <TitleH1>{movie.title} <span>({movie.year})</span></TitleH1>
                    <Rating rating={movie.rating} detailed={true}/>
                </MovieInfo>
            ) : (
                <MovieInfo id={movie._id}>
                    <MovieImage>
                        <img src={movie.coverImage} alt='movie-cover'></img>
                    </MovieImage>
                    <TitleH2>{movie.title} <span>({movie.year})</span></TitleH2>
                    <Rating rating={movie.rating} detailed={true}/>
                </MovieInfo>
            )}
            <ReadingSection>
                <ReadingContent className='textEditorContent' dangerouslySetInnerHTML={{__html: reviewContent}}/>
            </ReadingSection>
        </MovieContainer>
    )
    }
