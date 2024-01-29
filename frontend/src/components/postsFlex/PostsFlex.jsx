import React from 'react'
import { PostsFlexContainer, PostsFlexRow } from './PostsFlex.styled'
import PostCard from './PostCard'
import GhostSpinner from '../ghostSpinner/GhostSpinner'

export default function PostsFlex({posts, loading, handleRefresh}) {
    return (

        <PostsFlexContainer>
            {loading ? <GhostSpinner /> : (
                <PostsFlexRow>
                {posts && posts.map((post) => (
                    <PostCard key={post._id} post={post} handleRefresh={handleRefresh}/>
                ))}
            </PostsFlexRow>
            )}
            
        </PostsFlexContainer>

    )
}
