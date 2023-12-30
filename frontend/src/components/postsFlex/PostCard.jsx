import React from 'react'
import PostDescription from './PostDescription'
import PostImage from './PostImage'
import ButtonStandard from '../buttons/ButtonStandard'

import { PostCardContainer, PostCardDetails } from './PostCard.styled'

export default function PostCard({post}) {
    return (
        <PostCardContainer>
            <PostCardDetails>
                <PostImage post={post}/>
                <PostDescription post={post}/>
            </PostCardDetails>
            <ButtonStandard path={`/recenzije/${post?.slug}`} content='Pročitaj više →' type='textOnly'/>
        </PostCardContainer>
    )
}
