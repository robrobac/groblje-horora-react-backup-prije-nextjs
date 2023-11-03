import React from 'react'
import { CoverContainer, CoverImage } from './ReviewPostCover.styles'


export default function ReviewPostCover({movie}) {
    return (
        <CoverContainer>
            <CoverImage>
                <img src={movie?.coverImage} alt='movie-cover'></img>
            </CoverImage>
            <CoverImage>
                <img src={movie?.coverImage} alt='movie-cover'></img>
            </CoverImage>
            <CoverImage>
                <img src={movie?.coverImage} alt='movie-cover'></img>
            </CoverImage>
            <CoverImage>
                <img src={movie?.coverImage} alt='movie-cover'></img>
            </CoverImage>
        </CoverContainer>
    )
}