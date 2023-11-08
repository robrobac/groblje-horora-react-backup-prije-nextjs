import React from 'react'
import { CoverContainer, CoverImageContainer } from './ReviewPostCover.styles'


export default function ReviewPostCover({post}) {
    console.log(post)

    if (post?.movies.length === 4) {
        return (
            <CoverContainer>
                {post?.movies.map((movie) => (
                    <CoverImageContainer>
                    <img src={movie.coverImage} alt='movie-cover'></img>
                    </CoverImageContainer>
                ))}
            </CoverContainer>
        )
    }

    if (post?.movies.length === 1) {
        return (
            <CoverContainer>
                <CoverImageContainer>
                    <img src={post.movies[0]?.coverImage} alt='movie-cover'></img>
                </CoverImageContainer>
                <CoverImageContainer>
                    <img src={post.movies[0]?.coverImage} alt='movie-cover'></img>
                </CoverImageContainer>
                <CoverImageContainer>
                    <img src={post.movies[0]?.coverImage} alt='movie-cover'></img>
                </CoverImageContainer>
                <CoverImageContainer>
                    <img src={post.movies[0]?.coverImage} alt='movie-cover'></img>
                </CoverImageContainer>
            </CoverContainer>
        )
    }
}
