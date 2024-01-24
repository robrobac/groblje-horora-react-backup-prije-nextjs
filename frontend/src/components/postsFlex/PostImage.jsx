import React from 'react'
import { PreviewImage, QuadImage, QuadImageContainer } from './PostImage.styled'
import { Link } from 'react-router-dom'

export default function PostImage({post}) {
    return (
        <Link to={`/recenzije/${post?.slug}`} target='_blank'>
            {post?.movies.length === 4 ? (
                <QuadImageContainer>
                    <QuadImage>
                        <img className='image01' src={post.movies[0].coverImage} alt='movie-cover'></img>
                    </QuadImage>
                    <QuadImage>
                        <img className='image02' src={post.movies[1].coverImage} alt='movie-cover'></img>
                    </QuadImage>
                    <QuadImage>
                        <img className='image03' src={post.movies[2].coverImage} alt='movie-cover'></img>
                    </QuadImage>
                    <QuadImage>
                        <img className='image04' src={post.movies[3].coverImage} alt='movie-cover'></img>
                    </QuadImage>
                </QuadImageContainer>
            ) : (
                <PreviewImage>
                    <img className='singleMovieImage' src={post.movies[0].coverImage} alt='movie-cover'></img>
                </PreviewImage>
            )}
        </Link>
        
    )
}
