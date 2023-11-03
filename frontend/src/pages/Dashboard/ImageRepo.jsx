import React, { useRef, useState } from 'react'
import Compressor from 'compressorjs';
import stringFormatting from '../../helpers/stringFormatting';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase/config';

export default function ImageRepo({handleContentImages, contentImages}) {
    // State that holds compressed images that are later uploaded to Firebase Storage, once upload is successful clear the state.
    const [compressedImages, setCompressedImages] = useState([])
    console.log(compressedImages)

    // State that hold uploaded images data like url, path and id to store it in coresponding document in order to delete them along with the document etc.

    const fileInputRef = useRef(null);

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

            // get firestore storage path and filename
            path = `postImages/${stringFormatting('post-image', Date.now())}`
            const fileRef = ref(storage, path)

            // Try to upload to Firebase Storage
            try {
                const snapshot = await uploadBytes(fileRef, image)
                url = await getDownloadURL(snapshot.ref)
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
                fileInputRef.current.value = null;
                handleContentImages(prev => [...prev, uploaded])
            }
        })
    }

  return (
    <div>
        <label htmlFor='coverImage'>Cover Image</label>
        <input multiple
            ref={fileInputRef}
            id='coverImage'
            type='file'
            accept='image/'
            onChange={handleCompressImage}
        />
        {compressedImages.map((image, index) => (
            <div className='compressedImages'>
                <img style={{width: '50px'}} key={index} src={URL.createObjectURL(image)} alt='uploadedImage'/>
            </div>
         ))}
         <button onClick={getLinks}>Get Links</button>
         {contentImages.map((image, index) => (
            <div className='uploadedImages'>
                <img style={{width: '200px'}} key={index} src={image.url} alt='uploadedImage'/>
                <p>{image.url}</p>
            </div>
         ))}
         <button>Simulate SUbmit</button>
    </div>
  )
}
