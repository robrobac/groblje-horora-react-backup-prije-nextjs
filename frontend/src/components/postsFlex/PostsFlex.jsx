import React from 'react'
import { PostsFlexContainer, PostsFlexRow } from './PostsFlex.styled'
import PostCard from './PostCard'

export default function PostsFlex({posts}) {
    return (

        <PostsFlexContainer>
            <PostsFlexRow>
                {posts && posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))}
            </PostsFlexRow>
        </PostsFlexContainer>

    )
}
