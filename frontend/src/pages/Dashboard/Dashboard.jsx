import React, { useRef, useState } from 'react'
import Compressor from 'compressorjs';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ImageRepo from './ImageRepo';
import stringFormatting from '../../helpers/stringFormatting';
import { uploadImageToFirebaseStorage } from '../../helpers/firebaseUtils';
import { Checkbox, CheckboxLabel, File, FileLabel, FormContainer, FormContent, FormImage, InputContainer, InputField, InputLabel, StyledEditor, StyledForm, TextEditorContainer } from './Dashboard.styles';
import { FormSection, PageContainer } from '../Pages.styles';

export default function Dashboard() {
    const [reviewTitle, setReviewTitle] = useState('This field is not used in single review')
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [rating, setRating] = useState('')
    const [contentImages, setContentImages] = useState([])
    const [reviewContent, setReviewContent] = useState('')
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [imdbLink, setImdbLink] = useState('')
    const [top25, setTop25] = useState(false)
    const [worse20, setWorse20] = useState(false)
    const [compressedCoverImage, setCompressedCoverImage] = useState(null);
    const fileInputRef = useRef(null);

    const [error, setError] = useState(null)

    // function that handles text editor state in Editor child component
    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState)
        const textEditorData = convertToRaw(newEditorState.getCurrentContent())
        setReviewContent(textEditorData)
    }

    // Function that handles data about images that are uploaded and compressed from ImageRepo component
    const handleContentImages = (value) => {
        setContentImages(value)
    }

    //  Compressing the image before uploading to Firebase Storage
    const handleCompressImage = (e) => {
        const image = e.target.files[0];
        if (image) {
            new Compressor(image, {
                quality: 0.5,
                width: 700,
                convertSize: 100,
                success: (compressedResult) => {
                    setCompressedCoverImage(compressedResult);
                }
            });
        } else {
            setCompressedCoverImage(null)
        }
    };


    // handling form submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        // url and path used for cover image
        let url = ""
        let filePath = ""

        // if cover image is uploaded and compressed upload it to firebase storage
        if (compressedCoverImage) {
            // create firebase storage path
            const path = `coverImages/${stringFormatting(title, "-cover-image")}`
            try {
                // Upload to Firebase and retrieve image's url and path
                const result = await uploadImageToFirebaseStorage(compressedCoverImage, path)
                url = result.url
                filePath = result.path
            } catch (error) {
                console.log(error)
            }
        }

        // Review Object, containing everything that goes to MongoDB
        const review = {
            reviewTitle: reviewTitle,
            movies: {
                title,
                year,
                rating,
                coverImage: url,
                coverImagePath: filePath,
                reviewContent,
                imdbLink,
                top25,
                worse20
            },
            contentImages: contentImages,
        }

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
        }
        if(response.ok) {
            setTitle('')
            setYear('')
            setRating('')
            setReviewContent('')
            setEditorState(EditorState.createEmpty())
            setImdbLink('')
            setTop25(false)
            setWorse20(false)
            setCompressedCoverImage(null)
            fileInputRef.current.value = null;
            setError(null)
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
    }

    const handleUploadClick = () => {
        fileInputRef.current.click()
    }

    return (
        <PageContainer>
            <FormSection>
                <StyledForm onSubmit={handleSubmit}>
                    <FormContainer>
                        <FormImage>
                            <div>
                                {compressedCoverImage
                                ?
                                    <img src={URL.createObjectURL(compressedCoverImage)} alt='uploadedImage' onClick={handleUploadClick}/>
                                :
                                    <FileLabel htmlFor='coverImage'>Cover Image</FileLabel>
                                }
                                <File id='coverImage' type='file' accept='image/' ref={fileInputRef} onChange={handleCompressImage}/>
                            </div>
                        </FormImage>
                        <FormContent>
                            <InputContainer>
                                <InputLabel htmlFor='title'>Title</InputLabel>
                                <InputField id='title' type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
                            </InputContainer>
                            <InputContainer>
                                <InputLabel htmlFor='year'>Year</InputLabel>
                                <InputField id='year' type='number' value={year} onChange={(e) => setYear(e.target.value)}/>
                            </InputContainer>
                            <InputContainer>
                                <InputLabel htmlFor='rating'>Rating</InputLabel>
                                <InputField id='rating' type='number' value={rating} onChange={(e) => setRating(e.target.value)} step='0.5' min='1' max='5'/>
                            </InputContainer>
                            <InputContainer>
                                <InputLabel htmlFor='imdbLink'>Imdb Link</InputLabel>
                                <InputField id='imdbLink'  type='text' value={imdbLink} onChange={(e) => setImdbLink(e.target.value)}/>
                            </InputContainer>
                            <div className="dualInput">
                            <div>
                                <label htmlFor='top25'>Top25</label>
                                <input id='top25' type='checkbox' value={top25} onChange={(e) => setTop25(e.target.value)}/>
                            </div>
                            <div>
                                <CheckboxLabel htmlFor='worse20'>
                                    Worse20
                                    <Checkbox id='worse20' type='checkbox' value={worse20} onChange={(e) => setWorse20(e.target.value)}/>
                                </CheckboxLabel>
                            </div>
                            </div>
                        </FormContent>
                    </FormContainer>
                    <TextEditorContainer>
                        <InputLabel>Post Content</InputLabel>
                        <StyledEditor>
                            <Editor editorState={editorState} onEditorStateChange={onEditorStateChange}
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
                    <button>Publish</button>
                </StyledForm>
                <ImageRepo handleContentImages={handleContentImages} contentImages={contentImages}/>
            </FormSection>
        </PageContainer>
    )
}