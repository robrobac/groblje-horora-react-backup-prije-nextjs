import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Movie from '../../components/movie/Movie'
import { SinglePostContainer } from './SinglePost.styled'
import SinglePostCover from '../../components/singlePostCover/SinglePostCover'
import { MovieDate, TitleH1 } from '../../components/movie/Movie.styled'
import { format } from 'date-fns'
import HelmetSettings from '../../components/HelmetSettings'
import Comments from '../../components/comments/Comments'

export default function SinglePost() {
    const { slug } = useParams()
    const [post, setPost] = useState(null)
    
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

        <>
            <HelmetSettings
                title={`${post?.reviewTitle ? `${post?.reviewTitle} - ` : `${slug} - ` }Groblje Horora`}
                description={`
                    Opis bloga i njegovog sadrzaja
                `}
                url={`https://www.groblje-horora.com/o-blogu`}
                image={`%PUBLIC_URL%/images/groblje-horora-og-image.webp`}
            />
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
                <Comments post={post}/>
            </SinglePostContainer>
        </>
    )
}