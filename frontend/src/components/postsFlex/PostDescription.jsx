import React from 'react'
import { PostDate, PostSubTitle, PostTitle, PreviewDetails } from './PostDescription.styled'
import Rating from '../Rating'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

export default function PostDescription({post}) {

    console.log(post)

    return (
        <PreviewDetails>
            {post?.movies.length === 1 ? (
                <>
                    <PostDate>
                        {format(new Date(post.createdAt), 'dd.MM.yyyy')}
                    </PostDate>
                    <Link to={`/recenzije/${post?._id}`}>
                        <PostTitle>{post?.movies[0].title} <span>({post?.movies[0].year})</span></PostTitle>
                    </Link>
                    <Rating rating={post?.movies[0].rating} detailed={false}/>
                </>
            ) : (
                <>
                    <PostDate>
                        {format(new Date(post.createdAt), 'dd.MM.yyyy')}
                    </PostDate>
                    <Link to={`/recenzije/${post?._id}`}>
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
