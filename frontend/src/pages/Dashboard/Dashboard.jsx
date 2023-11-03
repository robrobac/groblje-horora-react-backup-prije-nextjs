import React, { useRef, useState } from 'react'
import Compressor from 'compressorjs';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase/config';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './textEditor.css'
import ImageRepo from './ImageRepo';
import stringFormatting from '../../helpers/stringFormatting';

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

    console.log(compressedCoverImage)

    console.log(contentImages)

    // function stringFormatting(inputString, sufix) {
    //     const formattedString = inputString.replace(/\s+/g, '-');
    //     const result = formattedString + sufix;
    //     return result;
    // }

    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState)
        const textEditorData = convertToRaw(newEditorState.getCurrentContent())
        setReviewContent(textEditorData)
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        let url = ""
        let filePath = ""

        if (compressedCoverImage) {
            // get firestore storage path and filename
            const path = `coverImages/${stringFormatting(title, "-cover-image")}`
            filePath = path
            const fileRef = ref(storage, path)

            try {
                const snapshot = await uploadBytes(fileRef, compressedCoverImage)
                url = await getDownloadURL(snapshot.ref)
            } catch (error) {
                console.log(error)
            }
        }

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

            // Deleting images from temp images
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

    const handleContentImages = (value) => {
        setContentImages(value)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='title'>Title</label>
                    <input
                        id='title'
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='year'>Year</label>
                    <input
                        id='year'
                        type='number'
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='rating'>Rating</label>
                    <input
                        step='0.5' min='1' max='5'
                        id='rating'
                        type='number'
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='coverImage'>Cover Image</label>
                    <input
                        id='coverImage'
                        type='file'
                        accept='image/'
                        ref={fileInputRef}
                        onChange={handleCompressImage}
                    />
                </div>
                <div>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    toolbar={{
                        options: ['inline', 'image', 'link', 'history'],
                        inline: {
                            options: ['bold', 'italic']
                        },
                        image: {
                            urlEnabled: true,
                            uploadEnabled: true,
                            alignmentEnabled: true,
                            className: 'imageButton',
                            popupClassName: 'imagePopup',

                        }
                    }}
                />
                </div>
                <div>
                    <label htmlFor='imdbLink'>Imdb Link</label>
                    <input
                        id='imdbLink'
                        type='text'
                        value={imdbLink}
                        onChange={(e) => setImdbLink(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='top25'>Top25</label>
                    <input
                        id='top25'
                        type='checkbox'
                        value={top25}
                        onChange={(e) => setTop25(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='worse20'>Worse20</label>
                    <input
                        id='worse20'
                        type='checkbox'
                        value={worse20}
                        onChange={(e) => setWorse20(e.target.value)}
                    />
                </div>
                <button>Add!</button>
            </form>
            <ImageRepo handleContentImages={handleContentImages} contentImages={contentImages}/>
        </div>
    )
}