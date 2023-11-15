import React, { useEffect, useState } from 'react'

// Rich Text Editor
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

// Functions etc
import { compressImage } from '../../helpers/compressImage';
import { deleteImageFromFirebaseStorage, uploadImageToFirebaseStorage } from '../../helpers/firebaseUtils';
import stringFormatting from '../../helpers/stringFormatting';

// Components
import PreviewDialog from './PreviewDialog';
import ImageRepo from './ImageRepo';

// Styled Components
import { File, FileLabel, FormContainer, FormContent, FormImage, InputContainer, InputField, InputLabel, StyledEditor, StyledForm, Tab, TabList, TabPanel, Tabs, TextEditorContainer } from './NewForm.styles';
import { FormSection, PageContainer } from '../Pages.styles';

import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


export default function EditFormQuad() {
    const { id } = useParams()
    
    const [postPreview, setPostPreview] = useState(null)
    const [selectedTab, setSelectedTab] = useState('movie1')

    const [post, setPost] = useState({})

    const [reviewTitle, setReviewTitle] = useState('')
    const [contentImages, setContentImages] = useState([])
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

    const [formSubmitted, setFormSubmitted] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate();

    // Fetching editing document by ID
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/reviews/${id}`)
                const data = await response.json()
                
                if (response.ok) {
                    setPost(data)
                    setReviewTitle(data.reviewTitle)
                    setContentImages(data.contentImages)

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

    // Creating State for Preview Screen before Submitting the Form
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

    // Compressing Image to prepare it for upload to Firebase Storage once form is submited
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

    // Handling input changes
    const handleChange = (index, field, value) => {
        const updatedMovies = [...movies];
        updatedMovies[index][field] = value;
        setMovies(updatedMovies);
    }

    // Handle rich text editor changes
    const handleEditorStateChange = (index, newEditorState) => {
        const updatedMovies = [...movies]
        // Saving editor state as it originaly is
        updatedMovies[index].editorState = newEditorState
        // Saving editor state converted to raw JSON
        const rawData = JSON.stringify(convertToRaw(newEditorState.getCurrentContent()))
        updatedMovies[index].reviewContent = rawData
        //  Updating Movies State
        setMovies(updatedMovies)
    }

    // Function passed to ImageRepo component to handle uploaded images.
    const handleContentImages = (value) => {
        setContentImages(value)
    }

    // Function to handle clicking on hidden File Input field.
    const handleUploadClick = (index) => {
        const clickedElement = document.getElementById(`coverImage${index}`)
        if (clickedElement) {
            clickedElement.click()
        }
    }

    // Function to handle all logic behind Edit Form Submit.
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Array that holds data about uploaded cover images. Since the cover image is uploaded before sending the form to backend in order to retrieve firebase storage url.
        // In case form submit fails due to any reason, all uploaded cover images will be removed from the storage.
        const deleteCoverPaths = []

        // Old Cover Image path will be stored here in order to be used in delete from firebase storage function once the new cover image is uploaded
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
                        //  Remove old cover image from storage
                        await deleteImageFromFirebaseStorage(oldCoverPath)

                        // Upload new cover image to storage
                        const result = await uploadImageToFirebaseStorage(movie.compressedCoverImage, path)
                        // Setting a new URL to save it in MongoDB document as a reference to the uploaded file
                        url = result.url
                        // Setting a uploaded image path to save it in MongoDB document as a reference to the path(used mostly for deleting image in the future)
                        filePath = result.path
                        // Pushing uploaded image URL to the array
                        deleteCoverPaths.push(url)
                    } catch (err) {
                        reject(err)
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
        
        // After the document object is prepared, wait for all promises and send it to MongoDB
        Promise.all(movieReviews)
            .then(async(resolvedMovieReviews) => {
                const review = {
                    reviewTitle: reviewTitle,
                    movies: resolvedMovieReviews,
                    contentImages: contentImages,
                }

                // API Call to post a new Review
                const response = await fetch(`http://localhost:4000/api/reviews/${post._id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(review),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const json = await response.json()

                if (!response.ok) {
                    // If response is NOT OK delete uploaded cover images from Firebase Storage
                    deleteCoverPaths.forEach(async(path) => await deleteImageFromFirebaseStorage(path))
                }
                if(response.ok) {
                    // If response is OK, restart form states
                    setReviewTitle('')
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

                    // Change FormSubmitted state in order to re render ImageRepo so it will clear its states
                    setFormSubmitted(!formSubmitted)

                    // Navigate to edited post
                    navigate(`/recenzije/${json._id}`)

                    // Delete images from tempImages, Images in ImageRepo are saved to TempImages in case user uploaded images through ImageRepo but never finished the form.
                    // That way we know what images are uploaded to firebase storage but are not used for anything in the posts
                    contentImages.forEach(async(image) => {
                        const deleteResponse = await fetch(`http://localhost:4000/api/tempMedia/${image.id}`, {
                            method: 'DELETE'
                        })
                        const deleteJson = await deleteResponse.json()

                        if (response.ok) {
                            console.log("deleted from tempImages", deleteJson)
                        }
                    })
                    // Clear ContentImages state
                    setContentImages([])
                }
            })
    }

    return (
        <PageContainer>
            <FormSection>
                <StyledForm onSubmit={handleSubmit}>
                    {movies.length === 3 ? (
                        <InputContainer>
                        <InputLabel htmlFor='reviewTitle'>Review Title</InputLabel>
                        <InputField id='reviewTitle' type='text' value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)}/>
                    </InputContainer>
                    ) : ''}
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
