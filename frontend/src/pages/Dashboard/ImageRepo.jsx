import React, { useEffect, useRef, useState } from 'react'
import Compressor from 'compressorjs';
import stringFormatting from '../../helpers/stringFormatting';
import { deleteImageFromFirebaseStorage, uploadImageToFirebaseStorage } from '../../helpers/firebaseUtils';
import { Repo, RepoFile, RepoFileLabel, RepoImages, RepoSection, StickyContainer } from './ImageRepo.styles';
import UploadedImage from './UploadedImage';
import { UploadImagesButton } from '../../components/buttons/Buttons.styled';
import GhostSpinner from '../../components/ghostSpinner/GhostSpinner';
import LoadingButton from '../../components/buttons/LoadingButton/LoadingButton';

export default function ImageRepo({handleContentImages, contentImages, formSubmitted}) {
    // State that holds compressed images that are later uploaded to Firebase Storage, once upload is successful clear the state.
    const [compressedImages, setCompressedImages] = useState([])
    const imagesInputRef = useRef(null);
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(null)

    const [uploadingImages, setUploadingImages] = useState(false)

    useEffect(() => {
        setCompressedImages([])
    }, [formSubmitted])


    // COmpressing images once uploaded to frontend in order to send them to Firebase Storage
    const handleCompressImage = (e) => {
        setUploadingImages(true)
        // Getting all files uploaded to Input Type: File
        const files = e.target.files;
        // IF there's files uploaded proceed with compression
        if (files) {
            // Compress each uploaded file and push it to CompressedImages state.
            Array.from(files).forEach((file) => {
                // Compress only if file is of image type
                if (file.type.startsWith('image/')) {
                    new Compressor(file, {
                        quality: 0.8,
                        width: 700,
                        mimeType: 'image/webp',
                        convertSize: Infinity,
                        success: (compressedResult) => {
                            setCompressedImages(prev => [...prev, compressedResult]);
                        }
                    });
                    // Don't compress if file is not of image type
                } else {
                    console.log('file is not an image, skipped', file.name)
                }
            });
            setUploadingImages(false)
        } else {
            setCompressedImages(null)
            setUploadingImages(false)
        }
    };


    // Uploading compressed images to Firebase Storage and retrieveing its url path
    const getLinks = async () => {
        setUploadingImages(true)
        for (const image of compressedImages) {
            let url = '';
            let path = '';
    
            // create firebase storage path
            path = `postImages/${stringFormatting('post-image-', Date.now())}`;
    
            try {
                // Upload to Firebase and retrieve image's url and path
                const result = await uploadImageToFirebaseStorage(image, path);
                url = result.url;
                path = result.path;
            } catch (error) {
                console.log(error);
            }
    
            // Creating Uploaded Image object in order to save it to MongoDB
            const uploadedImage = {
                url: url,
                path: path,
            };
    
            // Saving uploaded image to MongoDB collection
            const response = await fetch('http://localhost:4000/api/tempMedia', {
                method: 'POST',
                body: JSON.stringify(uploadedImage),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const json = await response.json();
    
            if (!response.ok) {
                setError(json.error);
            }
    
            if (response.ok) {
                // Retrieving new MongoDB data
                const uploaded = {
                    url,
                    path,
                    id: json._id,
                };
    
                // setting uploaded images state and clearing compressed images state because all compressed images are uploaded to Storage.
                setCompressedImages([]);
                imagesInputRef.current.value = null;
                handleContentImages((prev) => [...prev, uploaded]);
            }
    
            // Introduce a 500ms delay before processing the next image
            await new Promise((resolve) => setTimeout(resolve, 500));
        }
        setUploadingImages(false)
    };
    
    const handleDeleteCompressed = (imageToDelete) => {
        const newArray = compressedImages.filter((image) => image !== imageToDelete)
        setCompressedImages(newArray)
    };

    const handleDeleteUploaded = async (e, imageToDelete, indexToDelete) => {
        e.stopPropagation()
        const path = imageToDelete.path
        deleteImageFromFirebaseStorage(path)

        handleContentImages(contentImages.filter((image) => image.path !== imageToDelete.path))
        
        const deleteResponse = await fetch(`http://localhost:4000/api/tempMedia/${imageToDelete.id}`, {
            method: 'DELETE'
        })
        const json = await deleteResponse.json()

        if (deleteResponse.ok) {
            console.log("deleted from tempImages", json)
        }
    }
 
  return (
    <StickyContainer>
        <Repo>
            <RepoSection>
                <UploadImagesButton htmlFor='contentImage'>{uploadingImages ? <GhostSpinner /> : 'Odaberi Slike'}</UploadImagesButton>
                <RepoFile multiple={true} ref={imagesInputRef} id='contentImage' type='file' accept='image/' onChange={handleCompressImage}/>
            </RepoSection>

            <RepoImages>
            {compressedImages.map((image, index) => (
                
                <img className='compressedImage' key={`image${index}`} src={URL.createObjectURL(image)} alt='CompressedImage' onClick={() => handleDeleteCompressed(image)}/>
                
            ))}
            </RepoImages>
            {compressedImages.length  !== 0 ? (
                <RepoSection>
                    <LoadingButton onClick={getLinks} type='button' title='Uploadaj Slike' loading={uploadingImages} minWidth='180px'/>
                </RepoSection>
            ) : ''}
            {contentImages.length !== 0 ? (
                <RepoImages>
                {contentImages.map((image, index) => (
                    <UploadedImage key={`uploadedimage${index}`} image={image} index={index} handleDeleteUploaded={handleDeleteUploaded}/>
                ))}
                </RepoImages>
            ) : ''}
            
        </Repo>
    </StickyContainer>
  )
}
