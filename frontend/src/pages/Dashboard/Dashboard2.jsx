import React, { useRef, useState } from 'react'
import { EditorState, convertToRaw } from 'draft-js';
import { FormSection, PageContainer } from '../Pages.styles'
import { Checkbox, CheckboxLabel, File, FileLabel, FormContainer, FormContent, FormImage, InputContainer, InputField, InputLabel, StyledEditor, StyledForm, TextEditorContainer } from './Dashboard.styles'
import Compressor from 'compressorjs';
import { Editor } from 'react-draft-wysiwyg';
import ImageRepo from './ImageRepo';
import { deleteImageFromFirebaseStorage, uploadImageToFirebaseStorage } from '../../helpers/firebaseUtils';
import stringFormatting from '../../helpers/stringFormatting';

export default function Dashboard2() {
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [reviewTitle, setReviewTitle] = useState('')
    const [contentImages, setContentImages] = useState([])
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

    console.log(movies)

    //  Compressing the image before uploading to Firebase Storage
    const handleCompressImage = (e, index) => {
        const image = e.target.files[0];
        if (image) {
            new Compressor(image, {
                quality: 0.5,
                width: 700,
                convertSize: 100,
                success: (compressedResult) => {
                    const updatedMovies = [...movies]
                    updatedMovies[index].compressedCoverImage = compressedResult
                    setMovies(updatedMovies)
                }
            });
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
    };

    const handleUploadClick = (index) => {
        const clickedElement = document.getElementById(`coverImage${index}`)
        if (clickedElement) {
            clickedElement.click()
        }
    }

    const handleEditorStateChange = (index, newEditorState) => {
        const updatedMovies = [...movies]
        updatedMovies[index].editorState = newEditorState
        const rawData = convertToRaw(newEditorState.getCurrentContent())
        updatedMovies[index].reviewContent = rawData
        setMovies(updatedMovies)
    }

    const handleContentImages = (value) => {
        setContentImages(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(movies)
        const deleteCoverPaths = []

        const movieReviews = movies.map( async (movie) => {
            return new Promise(async (resolve, reject) => {
                let url = ""
                let filePath = ""

                // if cover image is uploaded and compressed upload it to firebase storage
                if (movie.compressedCoverImage) {
                    // create firebase storage path
                    const path = `coverImages/${stringFormatting(movie.title, "-cover-image")}`
                    try {
                        // Upload to Firebase and retrieve image's url and path
                        const result = await uploadImageToFirebaseStorage(movie.compressedCoverImage, path)
                        url = result.url
                        filePath = result.path
                        deleteCoverPaths.push(url)
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
                            compressedCoverImage: movie.compressedCoverImage,
                        })
                    } catch (error) {
                        reject(error)
                    }
                }
            })
        })
        

        Promise.all(movieReviews)
            .then(async(resolvedMovieReviews) => {
                const review = {
                    reviewTitle: reviewTitle,
                    movies: resolvedMovieReviews,
                    contentImages: contentImages,
                }

                console.log(review)
                // Posting to MongoDB
                const response = await fetch('/api/reviews', {
                    method: 'POST',
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
                    console.log('New Review Added')

                    // Deleting images from temp images, the data about images is stored in the post document
                    contentImages.forEach(async(image) => {
                        const deleteResponse = await fetch(`/api/tempMedia/${image.id}`, {
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


    return (
        <PageContainer>
            <FormSection>
                <StyledForm onSubmit={handleSubmit}>
                    <InputContainer>
                        <InputLabel htmlFor='reviewTitle'>Review Title</InputLabel>
                        <InputField id='reviewTitle' type='text' value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)}/>
                    </InputContainer>
                    {movies.map((movie, index) => (
                        <>
                        <FormContainer>
                        <FormImage>
                            <div>
                                {movie.compressedCoverImage
                                ?
                                    <img src={URL.createObjectURL(movie.compressedCoverImage)} alt='uploadedImage' onClick={() => handleUploadClick(index)}/>
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
                                <InputField id='rating' type='number' value={movie.rating} onChange={(e) => handleChange(index, 'rating', e.target.value)} step='0.5' min='1' max='5'/>
                            </InputContainer>
                            <InputContainer>
                                <InputLabel htmlFor='imdbLink'>Imdb Link</InputLabel>
                                <InputField id='imdbLink'  type='text' value={movie.imdbLink} onChange={(e) => handleChange(index, 'imdbLink', e.target.value)}/>
                            </InputContainer>
                            <div className="dualInput">
                            <div>
                                <label htmlFor='top25'>Top25</label>
                                <input id='top25' type='checkbox' value={movie.top25} onChange={(e) => handleChange(index, 'top25', e.target.value)}/>
                            </div>
                                <div>
                                    <CheckboxLabel htmlFor='worse20'>
                                        Worse20
                                        <Checkbox id='worse20' type='checkbox' value={movie.worse20} onChange={(e) => handleChange(index, 'worse20', e.target.value)}/>
                                    </CheckboxLabel>
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
                        </>
                    ))}
                    <button>Publish</button>
                </StyledForm>
                <ImageRepo handleContentImages={handleContentImages} contentImages={contentImages} formSubmitted={formSubmitted}/>
            </FormSection>
        </PageContainer>
    )
}
