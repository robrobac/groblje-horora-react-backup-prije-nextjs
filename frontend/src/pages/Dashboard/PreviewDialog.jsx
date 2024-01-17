import React, { useEffect, useState } from 'react'
import { CloseIcon, PreviewDialogBox } from './PreviewDialog.styles'
import { SinglePostContainer } from '../SinglePost/SinglePost.styled'
import SinglePostCover from '../../components/singlePostCover/SinglePostCover'
import { MovieContainer, MovieDate, MovieImage, MovieInfo, ReadingContent, ReadingSection, TitleH1, TitleH2 } from '../../components/movie/Movie.styled'
import { format } from 'date-fns'
import Rating from '../../components/Rating'
import draftToHtml from 'draftjs-to-html'
import { StyledButton } from '../../components/buttons/Buttons.styled'
import {ReactComponent as MenuX} from '../../images/xicon.svg'
import LoadingButton from '../../components/buttons/LoadingButton/LoadingButton'


export default function PreviewDialog({postPreview, formFailed, loading}) {
    const [post, setPost] = useState(null)
    const [reviewType, setReviewType] = useState('quad')

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
        if (postPreview.movies.length === 4) {
            setReviewType('quad')
        }
        if (postPreview.movies.length === 1) {
            setReviewType('single')
        }
    }, [postPreview])

    return (
        <>
        <PreviewDialogBox id='previewDialog'>
            <CloseIcon id='previewDialogCloseButton'>
                <MenuX />
            </CloseIcon>
        
            <SinglePostContainer>
                {reviewType === 'quad' ? (
                    <>
                    <SinglePostCover post={post}/>
                    <div className="movieAndDate">
                        <MovieDate>
                            {/* {format(new Date(post?.createdAt), 'dd.MM.yyyy')} */}
                        </MovieDate>
                        <TitleH1 className='pregledTitle'>{post?.reviewTitle}</TitleH1>
                    </div>   
                    </>
                ) : ('')}
                
                {post?.movies.map((movie) => (
                    <MovieContainer>
                    {reviewType === 'single' ? (
                        <MovieInfo id={movie._id}>
                            <MovieImage>
                                {movie.coverImage ? (
                                    <img src={movie.coverImage} alt='movie-cover'></img>
                                ) : (
                                    <img src={movie.compressedCoverImage ? URL.createObjectURL(movie.compressedCoverImage) : ''} alt='movie-cover'></img>
                                )}
                            </MovieImage>
                            <MovieDate>
                                {/* {format(new Date(post?.createdAt), 'dd.MM.yyyy')} */}
                            </MovieDate>
                            <TitleH1>{movie.title} <span>({movie.year})</span></TitleH1>
                            <Rating rating={movie.rating} detailed={true}/>
                        </MovieInfo>
                    ) : (
                        <MovieInfo id={movie._id}>
                            <MovieImage>
                                {movie.coverImage ? (
                                    <img src={movie.coverImage} alt='movie-cover'></img>
                                ) : (
                                    <img src={movie.compressedCoverImage ? URL.createObjectURL(movie.compressedCoverImage) : ''} alt='movie-cover'></img>
                                )}
                            </MovieImage>
                            <TitleH2>{movie.title} <span>({movie.year})</span></TitleH2>
                            <Rating rating={movie.rating} detailed={true}/>
                        </MovieInfo>
                    )}
                    <ReadingSection>
                        <ReadingContent className='textEditorContent' dangerouslySetInnerHTML={{__html: draftToHtml(movie.reviewContent)}}/>
                    </ReadingSection>
                </MovieContainer>
                ))}
            </SinglePostContainer>
            <div className='submitBtnContainer'>
                <LoadingButton type={loading ? 'button' : 'submit'} title='Objavi' loading={loading} minWidth='150px'/>
            </div>
        </PreviewDialogBox>
        <StyledButton type='button' id='previewDialogOpenButton'>Preview and Publish</StyledButton>
        </>
    )
}

