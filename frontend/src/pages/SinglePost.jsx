import draftToHtml from 'draftjs-to-html'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageContainer, PageSection, ReadingSection, SinglePostContainer } from './Pages.styles'
import ReviewPostCover from '../components/postsGrid/ReviewPostCover'
import Rating from '../components/Rating'
import Movie from '../components/Movie'

export default function SinglePost() {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    console.log(post, 'post')

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/reviews/${id}`)
            const data = await response.json()

            if (response.ok) {
                setPost(data)
            }
        }

        fetchPost()
    }, [id])
  return (
    <SinglePostContainer>
        <ReviewPostCover post={post}/>
        {post?.movies.length === 4 ? (
            <PageSection>
                <h1 className='reviewTitleH1'>{post?.reviewTitle}</h1>
            </PageSection>
        ) : ''}
        
        {post?.movies.map((movie) => (
            <Movie movie={movie}/>
        ))}
    </SinglePostContainer>
  )
}