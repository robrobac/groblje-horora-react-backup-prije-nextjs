import React, { useEffect, useState } from 'react'
import ReviewPostCover from './postsGrid/ReviewPostCover'
import { MovieContainer, MovieInfo, PageSection, ReadingSection } from '../pages/Pages.styles'
import Rating from './Rating'
import draftToHtml from 'draftjs-to-html'

export default function Movie({movie}) {
    const [reviewContent, setReviewContent] = useState({})
    
    useEffect(() => {
        // Formatting react-draft-wysiwyg editor data for 
        const rawContent = movie.reviewContent
        const markup = draftToHtml(
                rawContent,
        )
        // Setting state that will be 
        setReviewContent(markup)
    }, [])

    return (
        <MovieContainer>
            <MovieInfo>
                <h2 className='movieTitleH2'>{movie.title} ({movie.year})</h2>
                <img style={{maxWidth:'500px', height: 'auto'}} src={movie.coverImage} alt='movie-cover'></img>
                <Rating rating={movie.rating} detailed={true}/>
            </MovieInfo>
            <PageSection>
                <ReadingSection className='textEditorContent' dangerouslySetInnerHTML={{__html: reviewContent}}/>
            </PageSection>
        </MovieContainer>
    )
    }