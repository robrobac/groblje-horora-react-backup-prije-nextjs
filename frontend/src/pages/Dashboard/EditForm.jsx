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
import HandleDocumentTitle from '../../helpers/handleDocumentTitle';


export default function EditForm() {
    const { id } = useParams()
    
    const [postPreview, setPostPreview] = useState(null)
    const [selectedTab, setSelectedTab] = useState('movie1')

    const [post, setPost] = useState({})
    console.log(post)

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

    HandleDocumentTitle(`Editing ${reviewTitle} - Groblje Horora`)

    const [formSubmitted, setFormSubmitted] = useState(false)
    // If form fails checks on backend, change the state to trigger useEffect in PreviewDialog components and that way close the Preview Modal.
    const [formFailed, setFormFailed] = useState(false)

    // State that is recieved from backend to handle errors on empty fields.
    // unlike NewForm component, emptyFields in this component is handled on client side
    const [emptyFields, setEmptyFields] = useState([])

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

        const requiredInputs = []

        if (!reviewTitle) {
            requiredInputs.push('reviewTitle')
        }
    
        movies.forEach((movie, index) => {
            if (!movie.title) {
                requiredInputs.push(`movie${index}title`)
            }
            if (!movie.year) {
                requiredInputs.push(`movie${index}year`)
            }
            if (!movie.rating) {
                requiredInputs.push(`movie${index}rating`)
            }
            if (!movie.reviewContent) {
                requiredInputs.push(`movie${index}reviewContent`)
            }
            if (!movie.compressedCoverImage) {
                requiredInputs.push(`movie${index}coverImage`)
            }
        })

        console.log(requiredInputs)

        const movieReviews = movies.map( async (movie) => {
            return new Promise(async (resolve, reject) => {
                let url = movie.coverImage
                let filePath = movie.coverImagePath
                // Old Cover Image path will be stored here in order to be used in delete from firebase storage function once the new cover image is uploaded
                let oldCoverPath = movie.coverImagePath

                // if cover image is uploaded and compressed upload it to firebase storage
                if (movie.compressedCoverImage) {
                    // create firebase storage path
                    const sanitizedMovieTitle = movie.title.replace(/\//g, '-')
                    const path = `coverImages/${stringFormatting(sanitizedMovieTitle, `-coverImage-${Date.now()}`)}`

                    try {
                        // requiredInputs handles checking if there's empty fields in the form, if there is then don't upload cover images to firebase
                        if (requiredInputs.length === 0) {
                            //  Remove old cover image from storage
                            await deleteImageFromFirebaseStorage(oldCoverPath)
                            // Upload new cover image to storage
                            const result = await uploadImageToFirebaseStorage(movie.compressedCoverImage, path)
                            // Setting a new URL to save it in MongoDB document as a reference to the uploaded file
                            url = result.url
                            // Setting a uploaded image path to save it in MongoDB document as a reference to the path(used mostly for deleting image in the future)
                            filePath = result.path
                        }
                        
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
                    reviewTitle: resolvedMovieReviews.length === 1 ? resolvedMovieReviews[0].title : reviewTitle,
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
                    setEmptyFields(json.emptyFields)
                    setFormFailed(!formFailed)
                    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                    console.log(json)
                }
                if(response.ok) {
                    // If response is OK, restart form states
                    setReviewTitle('')
                    setEmptyFields([])
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

                    // Navigate to edited post
                    navigate(`/recenzije/${json._id}`)
                }
            })
    }

    return (
        <PageContainer>
            <FormSection>
                <StyledForm onSubmit={handleSubmit}>
                    {movies.length === 4 ? (
                    <InputContainer>
                        <InputLabel htmlFor='reviewTitle'>Review Title {emptyFields.includes('titleExists') ? <span className='error'>Title already exists</span> : ''}</InputLabel>
                        <InputField className={emptyFields.includes('reviewTitle') ? 'error' : '' } id='reviewTitle' type='text' value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)}/>
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
                                    <FileLabel className={emptyFields.includes(`movie${index}coverImage`) ? 'error' : ''} htmlFor={`coverImage${index}`}>Cover Image</FileLabel>
                                }
                                <File id={`coverImage${index}`} type='file' accept='image/' onChange={(e) => handleCompressImage(e, index)}/>
                            </div>
                        </FormImage>
                        <FormContent>
                            <InputContainer>
                                <InputLabel htmlFor='title'>Title {emptyFields.includes('titleExists') && movies.length === 1 ? <span className='error'>Title already exists</span> : ''}</InputLabel>
                                <InputField className={emptyFields.includes(`movie${index}title`) ? 'error' : ''} id='title' type='text' value={movie.title} onChange={(e) => handleChange(index, 'title', e.target.value)}/>
                            </InputContainer>
                            <InputContainer>
                                <InputLabel htmlFor='year'>Year</InputLabel>
                                <InputField className={emptyFields.includes(`movie${index}year`) ? 'error' : ''} id='year' type='number' value={movie.year} onChange={(e) => handleChange(index, 'year', e.target.value)}/>
                            </InputContainer>
                            <InputContainer>
                                <InputLabel htmlFor='rating'>Rating</InputLabel>
                                <InputField className={emptyFields.includes(`movie${index}rating`) ? 'error' : ''} id='rating' type='number' value={movie.rating} onChange={(e) => handleChange(index, 'rating', parseFloat(e.target.value))} step='0.5' min='1' max='5'/>
                            </InputContainer>
                            <InputContainer>
                                <InputLabel htmlFor='imdbLink'>Imdb Link</InputLabel>
                                <InputField className={emptyFields.includes(`movie${index}imdbLink`) ? 'error' : ''} id='imdbLink'  type='text' value={movie.imdbLink} onChange={(e) => handleChange(index, 'imdbLink', e.target.value)}/>
                            </InputContainer>
                            <div className="dualInput">
                            <div>
                                <label htmlFor='top25'>Top25</label>
                                <input id='top25' type='checkbox' value={movie.top25} checked={movie.top25} onChange={(e) => handleChange(index, 'top25', !movie.top25)}/>
                            </div>
                                <div>
                                    <label htmlFor='worse20'>
                                        Worse20
                                        <input id='worse20' type='checkbox' value={movie.worse20} checked={movie.worse20} onChange={(e) => handleChange(index, 'worse20', !movie.worse20)}/>
                                    </label>
                                </div>
                            </div>
                        </FormContent>
                        </FormContainer>
                        <TextEditorContainer>
                            <InputLabel>Post Content</InputLabel>
                            <StyledEditor>
                                <Editor wrapperClassName={emptyFields.includes(`movie${index}reviewContent`) ? 'error' : '' } editorState={movie.editorState} onEditorStateChange={(newEditorState) => handleEditorStateChange(index, newEditorState)}
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
                    {postPreview ? <PreviewDialog postPreview={postPreview} formFailed={formFailed}/> : ''}
                </StyledForm>
                <ImageRepo handleContentImages={handleContentImages} contentImages={contentImages} formSubmitted={formSubmitted}/>
            </FormSection>
        </PageContainer>
    )
}
