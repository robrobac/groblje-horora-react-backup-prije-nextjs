import React from 'react'
import { QuadImageContainer, SinglePostCoverContainer, SinglePostCoverWrap } from './SinglePostCover.styled'

export default function SinglePostCover({post}) {
    return (
        <SinglePostCoverWrap>
        <SinglePostCoverContainer>
            {post?.movies.map((movie, index) => (
                    <QuadImageContainer key={movie._id}>
                    <img className={`image${index}`} src={movie.coverImage} alt='movie-cover'></img>
                </QuadImageContainer>
            ))}
        </SinglePostCoverContainer>
        </SinglePostCoverWrap>
    )
}
