import React, { useEffect, useState } from 'react'
import { MovieContainer, MovieInfo, PageSection, ReadingSection, SinglePostContainer } from '../Pages.styles'
import draftToHtml from 'draftjs-to-html'
import Rating from '../../components/Rating'
import { CoverContainer, CoverImageContainer } from '../../components/postsGrid/ReviewPostCover.styles'
import { PreviewDialogBox } from './PreviewDialog.styles'

export default function PreviewDialog({postPreview, formFailed}) {
    const [post, setPost] = useState(null)

    useEffect(() => {
        const modal = document.getElementById('previewDialog')
        modal.close()
    }, [formFailed])

    useEffect(() => {
        const openButton = document.getElementById('previewDialogOpenButton')
        const closeButton = document.getElementById('previewDialogCloseButton')
        const modal = document.getElementById('previewDialog')

        const handleOpen = () => {
            modal.showModal()
            modal.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }

        const handleClose = () => {
            modal.close()
        }

        openButton.addEventListener('click', handleOpen)
        closeButton.addEventListener('click', handleClose)

        return () => {
            openButton.removeEventListener('click', handleOpen)
            closeButton.removeEventListener('click', handleClose)
        }
    }, [])

    useEffect(() => {
        setPost(postPreview)
    }, [postPreview])

    return (
        <>
        <PreviewDialogBox id='previewDialog'>
            <SinglePostContainer>
                {post?.movies.length === 4 ? (
                        <CoverContainer>
                        {post?.movies.map((movie, index) => (
                            <CoverImageContainer key={index}>
                            <img src={movie.compressedCoverImage ? URL.createObjectURL(movie.compressedCoverImage) : movie.coverImage} alt='movie-cover'></img>
                            </CoverImageContainer>
                        ))}
                    </CoverContainer>
                ) : (
                    <CoverContainer>
                    <CoverImageContainer>
                        <img src={post?.movies[0].compressedCoverImage ? URL.createObjectURL(post?.movies[0].compressedCoverImage) : post?.movies[0].coverImage} alt='movie-cover'></img>
                    </CoverImageContainer>
                    <CoverImageContainer>
                        <img src={post?.movies[0].compressedCoverImage ? URL.createObjectURL(post?.movies[0].compressedCoverImage) : post?.movies[0].coverImage} alt='movie-cover'></img>
                    </CoverImageContainer>
                    <CoverImageContainer>
                        <img src={post?.movies[0].compressedCoverImage ? URL.createObjectURL(post?.movies[0].compressedCoverImage) : post?.movies[0].coverImage} alt='movie-cover'></img>
                    </CoverImageContainer>
                    <CoverImageContainer>
                        <img src={post?.movies[0].compressedCoverImage ? URL.createObjectURL(post?.movies[0].compressedCoverImage) : post?.movies[0].coverImage} alt='movie-cover'></img>
                    </CoverImageContainer>
                </CoverContainer>
                )}
                {post?.movies.length === 4 ? (
                    <PageSection>
                        <h1 className='reviewTitleH1'>{post?.reviewTitle}</h1>
                    </PageSection>
                ) : ''}
                
                {post?.movies.map((movie, index) => (
                    <MovieContainer key={index}>
                        <MovieInfo>
                            <h2 className='movieTitleH2'>{movie.title} ({movie.year})</h2>
                            <img style={{maxWidth:'500px', height: 'auto'}} src={movie.compressedCoverImage ? URL.createObjectURL(movie.compressedCoverImage): movie.coverImage} alt='movie-cover'></img>
                            
                            <Rating rating={movie.rating} detailed={true}/>
                        </MovieInfo>
                        <PageSection>
                            <ReadingSection className='textEditorContent' dangerouslySetInnerHTML={{__html: draftToHtml(movie.reviewContent)}}/>
                        </PageSection>
                    </MovieContainer>
                ))}
                <div>
                <button type='submit'>Publish</button>
                <button type='button' id='previewDialogCloseButton'>Back</button>
                </div>
            </SinglePostContainer>
            
        </PreviewDialogBox>
        <button type='button' id='previewDialogOpenButton'>Preview and Publish</button>
        
        </>
    )
}
