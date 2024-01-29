import React from 'react'
import PostDescription from './PostDescription'
import PostImage from './PostImage'
import ButtonStandard from '../buttons/ButtonStandard'
import { PostCardContainer, PostCardDetails } from './PostCard.styled'
import EditDeleteButtons from '../editDeleteButtons/EditDeleteButtons'

export default function PostCard({post, handleRefresh}) {


    return (
        <PostCardContainer>
            <PostCardDetails>
                <PostImage post={post}/>
                <EditDeleteButtons post={post} handleRefresh={handleRefresh} targetBlank={true}/>
                <PostDescription post={post}/>
            </PostCardDetails>
            <ButtonStandard path={`/recenzije/${post?.slug}`} content='Pročitaj više →' type='textOnly' newTab={true}/>
        </PostCardContainer>
    )
}
