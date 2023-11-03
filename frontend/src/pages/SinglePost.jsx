import draftToHtml from 'draftjs-to-html'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageContainer, PageSection, ReadingSection } from './Pages.styles'
import ReviewPostCover from '../components/postsGrid/ReviewPostCover'
import Rating from '../components/Rating'

export default function SinglePost() {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [reviewContent, setReviewContent] = useState({})
    console.log(post)
    console.log(reviewContent)

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/reviews/${id}`)
            const data = await response.json()

            if (response.ok) {
                setPost(data)

                // Formatting react-draft-wysiwyg editor data for 
                const rawContent = data.movies[0].reviewContent
                const markup = draftToHtml(
                        rawContent,
                )
                // Setting state that will be 
                setReviewContent(markup)
            }
        }

        fetchPost()
    }, [id])
  return (
    <PageContainer>
        <ReviewPostCover movie={post?.movies[0]}/>
        <PageSection>
            <h1>{post?.movies[0].title} ({post?.movies[0].year})</h1>
            <Rating rating={post?.movies[0].rating} detailed={true}/>
        </PageSection>
        <PageSection>
                <ReadingSection className='textEditorContent' dangerouslySetInnerHTML={{__html: reviewContent}}/>
        </PageSection>
    </PageContainer>
  )
}