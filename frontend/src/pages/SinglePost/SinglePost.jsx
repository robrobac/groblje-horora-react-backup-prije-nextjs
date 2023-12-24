import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Movie from '../../components/movie/Movie'
import HandleDocumentTitle from '../../helpers/handleDocumentTitle'
import { SinglePostContainer } from './SinglePost.styled'
import SinglePostCover from '../../components/singlePostCover/SinglePostCover'
import { MovieDate, TitleH1 } from '../../components/movie/Movie.styled'
import { format } from 'date-fns'

export default function SinglePost() {
    const { slug } = useParams()
    const [post, setPost] = useState(null)
    

    HandleDocumentTitle(`${post?.reviewTitle} - Groblje Horora`)


    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`http://localhost:4000/api/reviews/${slug}`)
            const data = await response.json()

            if (response.ok) {
                setPost(data)
            }
        }

        fetchPost()
    }, [slug])


    return (
        <SinglePostContainer>
            {post?.reviewType === 'quad' ? (
                <>
                <SinglePostCover post={post}/>
                <div className="movieAndDate">
                    <MovieDate>
                        {format(new Date(post?.createdAt), 'dd.MM.yyyy')}
                    </MovieDate>
                    <TitleH1 className='pregledTitle'>{post.reviewTitle}</TitleH1>
                </div>   
                </>
            ) : ('')}
            
            {post?.movies.map((movie) => (
                <Movie key={movie._id} post={post} movie={movie} type={post?.reviewType === 'single' ? 'single' : 'quad'}/>
            ))}
        </SinglePostContainer>
    )
}