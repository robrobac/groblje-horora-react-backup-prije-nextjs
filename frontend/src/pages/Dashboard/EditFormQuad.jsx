import React, { useEffect, useState } from 'react'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { useParams } from 'react-router-dom'
import { File, FileLabel, FormContainer, FormContent, FormImage, InputContainer, InputField, InputLabel, StyledEditor, StyledForm, Tab, TabList, TabPanel, Tabs, TextEditorContainer } from './NewForm.styles';
import { Editor } from 'react-draft-wysiwyg';
import { FormSection, PageContainer } from '../Pages.styles';
import PreviewDialog from './PreviewDialog';
import ImageRepo from './ImageRepo';
import Compressor from 'compressorjs';
import stringFormatting from '../../helpers/stringFormatting';
import { deleteImageFromFirebaseStorage, uploadImageToFirebaseStorage } from '../../helpers/firebaseUtils';
import { useNavigate } from 'react-router-dom';
import { compressImage } from '../../helpers/compressImage';

export default function EditFormQuad() {
    const { id } = useParams()
    const [post, setPost] = useState({})
    const [reviewTitle, setReviewTitle] = useState('')
    const [contentImages, setContentImages] = useState([])
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [error, setError] = useState(null)

    const [movies, setMovies] = useState([
        {
            title: '',
            year: '',
            rating: '',
            reviewContent: '',
            editorState: EditorState.createEmpty(),
            imdbLink: '',
            top25: false,
            worse20: false,
            compressedCoverImage: null,
            
        },
        {
            title: '',
            year: '',
            rating: '',
            reviewContent: '',
            editorState: EditorState.createEmpty(),
            imdbLink: '',
            top25: false,
            worse20: false,
            compressedCoverImage: null,
            
        },
        {
            title: '',
            year: '',
            rating: '',
            reviewContent: '',
            editorState: EditorState.createEmpty(),
            imdbLink: '',
            top25: false,
            worse20: false,
            compressedCoverImage: null,
            
        },
        {
            title: '',
            year: '',
            rating: '',
            reviewContent: '',
            editorState: EditorState.createEmpty(),
            imdbLink: '',
            top25: false,
            worse20: false,
            compressedCoverImage: null,
            
        }
    ])

    const [postPreview, setPostPreview] = useState(null)
    const [selectedTab, setSelectedTab] = useState('movie1')

    const navigate = useNavigate();

    useEffect(() => {
        const reviewPreview = {
            reviewTitle: reviewTitle,
            movies: movies.map((movie) => {
                return {
                    title: movie.title,
                    year: movie.year,
                    rating: movie.rating,
                    compressedCoverImage: movie.compressedCoverImage,
                    reviewContent: convertToRaw(movie.editorState.getCurrentContent()),
                    imdbLink: movie.imdbLink,
                    top25: movie.top25,
                    worse20: movie.worse20,
                    coverImage: movie.coverImage,
                    coverImagePath: movie.coverImagePath,

                }
            }),
            contentImages: contentImages,
        }

        setPostPreview(reviewPreview)
    }, [contentImages, movies, reviewTitle])

    console.log('post', post)
    console.log('reviewTitle', reviewTitle)
    console.log('contentImages', contentImages)
    console.log('movies', movies)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/reviews/${id}`)
                const data = await response.json()
                
                if (response.ok) {
                    setPost(data)
                    setReviewTitle(data.reviewTitle)
                    setContentImages(data.contentImages)
                    console.log('data:', data)


                    setMovies(data.movies.map((movie) => {
                        return {
                            title: movie.title || '',
                            year: movie.year || '',
                            rating: movie.rating || '',
                            reviewContent: movie.reviewContent || '',
                            editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(movie.reviewContent))),
                            imdbLink: movie.imdbLink || '',
                            coverImage: movie.coverImage || '',
                            coverImagePath: movie.coverImagePath || '',
                            top25: movie.top25,
                            worse20: movie.worse20,
                            compressedCoverImage: movie.compressedCoverImage,
                        }
                    }))

                } else {
                    console.log(response.status)
                }
    
            } catch (err) {
                console.log(err)
            }
            
        }

        fetchPost()
    }, [id])

    const handleEditorStateChange = (index, newEditorState) => {
        const updatedMovies = [...movies]
        updatedMovies[index].editorState = newEditorState
        const rawData = JSON.stringify(convertToRaw(newEditorState.getCurrentContent()))
        updatedMovies[index].reviewContent = rawData
        setMovies(updatedMovies)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(movies)
        const deleteCoverPaths = []
        let oldCoverPath = ''

        const movieReviews = movies.map( async (movie) => {
            return new Promise(async (resolve, reject) => {
                let url = movie.coverImage
                let filePath = movie.coverImagePath
                oldCoverPath = movie.coverImagePath

                // if cover image is uploaded and compressed upload it to firebase storage
                if (movie.compressedCoverImage) {
                    // create firebase storage path
                    const path = `coverImages/${stringFormatting(movie.title, `-coverImage-${Date.now()}`)}`
                    try {
                        //  Upload to Firebase and retrieve image's url and path
                        await deleteImageFromFirebaseStorage(oldCoverPath)
                        const result = await uploadImageToFirebaseStorage(movie.compressedCoverImage, path)
                        url = result.url
                        filePath = result.path
                        deleteCoverPaths.push(url)
                        console.log('pushed')
                    } catch (error) {
                        reject(error)
                        console.log(error)
                    }
                }

                resolve({
                    title: movie.title,
                    year: movie.year,
                    rating: movie.rating,
                    reviewContent: movie.reviewContent,
                    imdbLink: movie.imdbLink,
                    coverImage: url,
                    coverImagePath: filePath,
                    top25: movie.top25,
                    worse20: movie.worse20,
                })
            })
        })
        

        Promise.all(movieReviews)
            .then(async(resolvedMovieReviews) => {
                const review = {
                    reviewTitle: reviewTitle,
                    movies: resolvedMovieReviews,
                    contentImages: contentImages,
                }
                console.log('promised?')
                console.log(review)
                // Posting to MongoDB
                const response = await fetch(`http://localhost:4000/api/reviews/${post._id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(review),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const json = await response.json()
                if (!response.ok) {
                    setError(json.error)
                    console.log(error)
                    deleteCoverPaths.forEach(async(path) => await deleteImageFromFirebaseStorage(path))
                }
                if(response.ok) {
                    setReviewTitle('')
                    setError(null)
                    setMovies([
                        {
                            title: '',
                            year: '',
                            rating: '',
                            reviewContent: '',
                            editorState: EditorState.createEmpty(),
                            imdbLink: '',
                            top25: false,
                            worse20: false,
                            compressedCoverImage: null,
                            
                        },
                        {
                            title: '',
                            year: '',
                            rating: '',
                            reviewContent: '',
                            editorState: EditorState.createEmpty(),
                            imdbLink: '',
                            top25: false,
                            worse20: false,
                            compressedCoverImage: null,
                            
                        },
                        {
                            title: '',
                            year: '',
                            rating: '',
                            reviewContent: '',
                            editorState: EditorState.createEmpty(),
                            imdbLink: '',
                            top25: false,
                            worse20: false,
                            compressedCoverImage: null,
                            
                        },
                        {
                            title: '',
                            year: '',
                            rating: '',
                            reviewContent: '',
                            editorState: EditorState.createEmpty(),
                            imdbLink: '',
                            top25: false,
                            worse20: false,
                            compressedCoverImage: null,
                        }
                    ])
                    setFormSubmitted(!formSubmitted)
                    navigate(`/recenzije/${json._id}`)
                    console.log('Review Updated')

                    // Deleting images from temp images, the data about images is stored in the post document
                    contentImages.forEach(async(image) => {
                        const deleteResponse = await fetch(`http://localhost:4000/api/tempMedia/${image.id}`, {
                            method: 'DELETE'
                        })
                        const json = await deleteResponse.json()

                        if (response.ok) {
                            console.log("deleted from tempImages", json)
                        }
                    })
                    setContentImages([])
                }
                
            })
    }

    const handleUploadClick = (index) => {
        const clickedElement = document.getElementById(`coverImage${index}`)
        if (clickedElement) {
            clickedElement.click()
        }
    }
    const handleCompressImage = (e, index) => {
        const image = e.target.files[0];
        if (image) {
            compressImage(image, (compressedResult) => {
                const updatedMovies = [...movies]
                    updatedMovies[index].compressedCoverImage = compressedResult
                    setMovies(updatedMovies)
            })
        } else {
            const updatedMovies = [...movies]
            updatedMovies[index].compressedCoverImage = null
            setMovies(updatedMovies)
        }
    };

    const handleChange = (index, field, value) => {
        const updatedMovies = [...movies];
        updatedMovies[index][field] = value;
        setMovies(updatedMovies);
    }
    const handleContentImages = (value) => {

        setContentImages(value)
        
    }


    // useEffect(() => {
    //     const fetchedMovies = post.movies.map((movie) => {
    //         const editorData = convertFromRaw(movie.reviewContent)
    //         return {
    //             title: movie.title || '',
    //             year: movie.year || '',
    //             rating: movie.rating || '',
    //             reviewContent: movie.reviewContent || '',
    //             editorState: editorData,
    //             imdbLink: movie.imdbLink || '',
    //         }
                
    //     })
    //     setMovies([fetchedMovies])
    // }, [post])

    return (
        <PageContainer>
            <FormSection>
                <StyledForm onSubmit={handleSubmit}>
                    <InputContainer>
                        <InputLabel htmlFor='reviewTitle'>Review Title</InputLabel>
                        <InputField id='reviewTitle' type='text' value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)}/>
                    </InputContainer>
                    <Tabs>
                        <TabList>
                            {movies.map((movie, index) => (
                                <Tab $isActive={selectedTab === `movie${index + 1}`} onClick={() => setSelectedTab(`movie${index + 1}`)}>Movie {index + 1}</Tab>
                            ))}
                        </TabList>
                    </Tabs>
                    {movies.map((movie, index) => (
                        <TabPanel $isActive={selectedTab === `movie${index + 1}`}>
                            <h3>Movie {index + 1}</h3>
                        <FormContainer>
                        <FormImage>
                            <div>
                                {movie.compressedCoverImage || movie.coverImage
                                ?
                                    <img src={movie.compressedCoverImage ? URL.createObjectURL(movie.compressedCoverImage) : movie.coverImage} alt='uploadedImage' onClick={() => handleUploadClick(index)}/>
                                :
                                    <FileLabel htmlFor={`coverImage${index}`}>Cover Image</FileLabel>
                                }
                                <File id={`coverImage${index}`} type='file' accept='image/' onChange={(e) => handleCompressImage(e, index)}/>
                            </div>
                        </FormImage>
                        <FormContent>
                            <InputContainer>
                                <InputLabel htmlFor='title'>Title</InputLabel>
                                <InputField id='title' type='text' value={movie.title} onChange={(e) => handleChange(index, 'title', e.target.value)}/>
                            </InputContainer>
                            <InputContainer>
                                <InputLabel htmlFor='year'>Year</InputLabel>
                                <InputField id='year' type='number' value={movie.year} onChange={(e) => handleChange(index, 'year', e.target.value)}/>
                            </InputContainer>
                            <InputContainer>
                                <InputLabel htmlFor='rating'>Rating</InputLabel>
                                <InputField id='rating' type='number' value={movie.rating} onChange={(e) => handleChange(index, 'rating', parseFloat(e.target.value))} step='0.5' min='1' max='5'/>
                            </InputContainer>
                            <InputContainer>
                                <InputLabel htmlFor='imdbLink'>Imdb Link</InputLabel>
                                <InputField id='imdbLink'  type='text' value={movie.imdbLink} onChange={(e) => handleChange(index, 'imdbLink', e.target.value)}/>
                            </InputContainer>
                            <div className="dualInput">
                            <div>
                                <label htmlFor='top25'>Top25</label>
                                <input id='top25' type='checkbox' value={movie.top25} onChange={(e) => handleChange(index, 'top25', !movie.top25)}/>
                            </div>
                                <div>
                                    <label htmlFor='worse20'>
                                        Worse20
                                        <input id='worse20' type='checkbox' value={movie.worse20} onChange={(e) => handleChange(index, 'worse20', !movie.worse20)}/>
                                    </label>
                                </div>
                            </div>
                        </FormContent>
                        </FormContainer>
                        <TextEditorContainer>
                            <InputLabel>Post Content</InputLabel>
                            <StyledEditor>
                                <Editor editorState={movie.editorState} onEditorStateChange={(newEditorState) => handleEditorStateChange(index, newEditorState)}
                                    toolbar={{
                                        options: ['inline', 'image', 'link', 'history'],
                                        inline: {
                                            options: ['bold', 'italic']
                                        },
                                        image: {
                                            urlEnabled: true,
                                            uploadEnabled: false,
                                            alignmentEnabled: true,
                                            className: 'imageButton',
                                            popupClassName: 'imagePopup',
                                        }
                                    }}
                                />
                            </StyledEditor>
                        </TextEditorContainer>
                        </TabPanel>
                    ))}
                    {postPreview ? <PreviewDialog postPreview={postPreview}/> : ''}
                </StyledForm>
                <ImageRepo handleContentImages={handleContentImages} contentImages={contentImages} formSubmitted={formSubmitted}/>
            </FormSection>
        </PageContainer>
    )
}