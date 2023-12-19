import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageSection, SinglePostContainer } from './Pages.styles'
import ReviewPostCover from '../components/postsGrid/ReviewPostCover'
import Movie from '../components/Movie'
import ButtonStandard from '../components/buttons/ButtonStandard'
import HandleDocumentTitle from '../helpers/handleDocumentTitle'

export default function SinglePost() {
    const { id } = useParams()
    const [post, setPost] = useState(null)

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`http://localhost:4000/api/reviews/${id}`)
            const data = await response.json()

            if (response.ok) {
                setPost(data)
            }
        }

        fetchPost()
    }, [id])


    HandleDocumentTitle(`${post.reviewTitle} - Groblje Horora`)

    return (
        <SinglePostContainer>
            <ButtonStandard path={`/recenzije/${id}/edit`} content='edit'/>
            <ReviewPostCover post={post}/>
            {post?.movies.length === 4 ? (
                <PageSection>
                    <h1 className='reviewTitleH1'>{post?.reviewTitle}</h1>
                </PageSection>
            ) : ''}
            
            {post?.movies.map((movie) => (
                <Movie key={movie._id} movie={movie}/>
            ))}
        </SinglePostContainer>
    )
}