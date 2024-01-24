import React, { useContext, useEffect, useState } from 'react'
import { CommentIconContainer, CommentsAndLikes, LikeIconContainer, PostDate, PostSubTitle, PostTitle, PreviewDetails } from './PostDescription.styled'
import Rating from '../Rating'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import {ReactComponent as CommentIcon} from '../../images/commenticon.svg'
import {ReactComponent as LikeIcon} from '../../images/likeicon.svg'
import { AuthContext } from '../../App'

export default function PostDescription({post}) {
    const {userData} = useContext(AuthContext)
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        // Check if the current user has liked the post
        const hasLiked = post?.likes?.some(like => like.likeName === userData?.username || like.likeEmail === userData?.email);
        setLiked(hasLiked);
    }, [userData, post]);

    return (
        <PreviewDetails>
            {post?.movies.length === 1 ? (
                <>
                    <PostDate>
                        {format(new Date(post.createdAt), 'dd.MM.yyyy')}
                    </PostDate>
                    <CommentsAndLikes>
                        <LikeIconContainer>
                            <p>{post?.likes.length}</p> <LikeIcon className={liked ? 'liked' : ''}/>
                        </LikeIconContainer>
                        <CommentIconContainer>
                            <p>{post?.comments.length}</p> <CommentIcon />
                        </CommentIconContainer>
                    </CommentsAndLikes>
                    <Link to={`/recenzije/${post?.slug}`} target='_blank'>
                        <PostTitle>{post?.movies[0].title} <span>({post?.movies[0].year})</span></PostTitle>
                    </Link>
                    <Rating rating={post?.movies[0].rating} detailed={false}/>
                </>
            ) : (
                <>
                    <PostDate>
                        {format(new Date(post.createdAt), 'dd.MM.yyyy')}
                    </PostDate>
                    <CommentsAndLikes>
                        <LikeIconContainer>
                            <p>{post?.likes.length}</p> <LikeIcon className={liked ? 'liked' : ''}/>
                        </LikeIconContainer>
                        <CommentIconContainer>
                            <p>{post?.comments.length}</p> <CommentIcon />
                        </CommentIconContainer>
                    </CommentsAndLikes>
                    <Link to={`/recenzije/${post?.slug}`} target='_blank'>
                        <PostTitle>{post?.reviewTitle}</PostTitle>
                    </Link>
                    <PostSubTitle>
                        {post?.movies[0].title} <span>({post?.movies[0].year})</span>, {post?.movies[1].title} <span>({post?.movies[1].year})</span>, {post?.movies[2].title} <span>({post?.movies[2].year})</span>, {post?.movies[3].title} <span>({post?.movies[3].year})</span>
                    </PostSubTitle>
                </>
            )}  
        </PreviewDetails>
    )
}
