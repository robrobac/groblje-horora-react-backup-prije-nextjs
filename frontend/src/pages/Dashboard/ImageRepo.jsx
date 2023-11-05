import React, { useRef, useState } from 'react'
import Compressor from 'compressorjs';
import stringFormatting from '../../helpers/stringFormatting';
import { deleteImageFromFirebaseStorage, uploadImageToFirebaseStorage } from '../../helpers/firebaseUtils';
import { GetLinks, Repo, RepoFile, RepoFileLabel, RepoImages, RepoSection, StickyContainer } from './ImageRepo.styles';
import UploadedImage from './UploadedImage';

export default function ImageRepo({handleContentImages, contentImages}) {
    // State that holds compressed images that are later uploaded to Firebase Storage, once upload is successful clear the state.
    const [compressedImages, setCompressedImages] = useState([])
    const imagesInputRef = useRef(null);
    const [error, setError] = useState(null)


    // COmpressing images once uploaded to frontend in order to send them to Firebase Storage
    const handleCompressImage = (e) => {
        // Getting all files uploaded to Input Type: File
        const files = e.target.files;
        // IF there's files uploaded proceed with compression
        if (files) {
            // Compress each uploaded file and push it to CompressedImages state.
            Array.from(files).forEach((file) => {
                // Compress only if file is of image type
                if (file.type.startsWith('image/')) {
                    new Compressor(file, {
                        quality: 0.5,
                        width: 700,
                        convertSize: 100,
                        success: (compressedResult) => {
                            setCompressedImages(prev => [...prev, compressedResult]);
                        }
                    });
                    // Don't compress if file is not of image type
                } else {
                    console.log('file is not an image, skipped', file.name)
                }
            });
        } else {
            setCompressedImages(null)
        }
    };


    // Uploading compressed images to Firebase Storage and retrieveing its url path
    const getLinks = () => {
        compressedImages.forEach(async (image) => {
            let url = ''
            let path = ''

            // create firebase storage path
            path = `postImages/${stringFormatting('post-image', Date.now())}`
            try {
                // Upload to Firebase and retrieve image's url and path
                const result = await uploadImageToFirebaseStorage(image, path)
                url = result.url
                path = result.path
            } catch (error) {
                console.log(error)
            }

            // Creating Uploaded Image object in order to save it to MongoDB
            const uploadedImage = {
                url: url,
                path: path,
            }

            // Saving uploaded image to MongoDB collection
            const response = await fetch('/api/tempMedia', {
                method: 'POST',
                body: JSON.stringify(uploadedImage),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()
            if (!response.ok) {
                setError(json.error)
            }
            if(response.ok) {
                // Retrieving new MongoDB data
                const uploaded = {
                    url,
                    path,
                    id: json._id
                }

                // setting uploaded images state and clearing compressed images state because all compressed images are uploaded to Storage.
                setCompressedImages([])
                imagesInputRef.current.value = null;
                handleContentImages(prev => [...prev, uploaded])
            }
        })
    }

    const handleDeleteCompressed = (indexToDelete) => {
        const newArray = compressedImages.filter((index) => index !== indexToDelete)
        setCompressedImages(newArray)
    };

    const handleDeleteUploaded = async (e, imageToDelete, indexToDelete) => {
        e.stopPropagation()
        const path = imageToDelete.path
        deleteImageFromFirebaseStorage(path)

        handleContentImages(contentImages.filter((image) => image.path !== imageToDelete.path))
        
        const deleteResponse = await fetch(`/api/tempMedia/${imageToDelete.id}`, {
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
                <RepoFileLabel htmlFor='contentImage'>UPLOAD Images</RepoFileLabel>
                <RepoFile multiple={true} ref={imagesInputRef} id='contentImage' type='file' accept='image/' onChange={handleCompressImage}/>
            </RepoSection>

            <RepoImages>
            {compressedImages.map((image, index) => (
                
                    <img className='compressedImage' key={index} src={URL.createObjectURL(image)} alt='CompressedImage' onClick={() => handleDeleteCompressed(index)}/>
                
            ))}
            </RepoImages>
            <RepoSection>
                <GetLinks onClick={getLinks}>Get Links</GetLinks>
            </RepoSection>
            <RepoImages>
            {contentImages.map((image, index) => (
                <UploadedImage image={image} index={index} handleDeleteUploaded={handleDeleteUploaded}/>
                // <CopyToClipboard text={image.url} onCopy={handleCopy}>
                //     <div className='uploadedImage' onClick={() => console.log('copy')}>
                //         <span className='deleteButton' onClick={(e) => handleDeleteUploaded(e, image, index)}>X</span>
                //         {copied ? <span className='copySuccess'>COPIED</span> : ''}
                //         <img key={index} src={image.url} alt='UploadedImage'/>
                //         <p>Copy URL</p>
                //     </div>
                // </CopyToClipboard>
            ))}
            </RepoImages>
        </Repo>
    </StickyContainer>
  )
}
