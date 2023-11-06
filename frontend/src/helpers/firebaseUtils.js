import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase/config';

export const uploadImageToFirebaseStorage = async (file, path) => {
    try {
        const fileRef = ref(storage, path);
        const snapshot = await uploadBytes(fileRef, file);
        const url = await getDownloadURL(snapshot.ref);
        return { url, path };
    } catch (error) {
        console.error('Error uploading image to Firebase Storage:', error);
        throw error;
    }
}

export const deleteImageFromFirebaseStorage = async (path) => {
    if (path) {
        const oldFileRef = ref(storage, path)

        deleteObject(oldFileRef).then(() => {

        }).catch((error) => {
            console.log(error)
        });
    }
}

// const handleSubmit = async (e) => {
//     e.preventDefault()
//     console.log(movies)
//     const deleteCoverPaths = []

//     const movieReviews = Promise.all( movies.map( async (movie) => {
//         let url = ""
//         let filePath = ""

//         // if cover image is uploaded and compressed upload it to firebase storage
//         if (movie.compressedCoverImage) {
//             // create firebase storage path
//             const path = `coverImages/${stringFormatting(movie.title, "-cover-image")}`
//             try {
//                 // Upload to Firebase and retrieve image's url and path
//                 const result = await uploadImageToFirebaseStorage(movie.compressedCoverImage, path)
//                 url = result.url
//                 filePath = result.path
//                 deleteCoverPaths.push(url)
//             } catch (error) {
//                 console.log(error)
//             }
//         }
        
//         return {
//             title: movie.title,
//             year: movie.year,
//             rating: movie.rating,
//             reviewContent: movie.reviewContent,
//             imdbLink: movie.imdbLink,
//             coverImage: url,
//             coverImagePath: filePath,
//             top25: movie.top25,
//             worse20: movie.worse20,
//             compressedCoverImage: movie.compressedCoverImage,
//         }
//     }))

//     const review = {
//         reviewTitle: reviewTitle,
//         movies: movieReviews,
//         contentImages: contentImages,
//     }

//     console.log(review)
//     // Posting to MongoDB
//     const response = await fetch('/api/reviews', {
//         method: 'POST',
//         body: JSON.stringify(review),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     const json = await response.json()
//     if (!response.ok) {
//         setError(json.error)
//         deleteCoverPaths.forEach((path) => deleteImageFromFirebaseStorage(path))
//     }
//     if(response.ok) {
//         setReviewTitle('')
//         setError(null)
//         setMovies([
//             {
//                 title: '',
//                 year: '',
//                 rating: '',
//                 reviewContent: '',
//                 editorState: EditorState.createEmpty(),
//                 imdbLink: '',
//                 top25: false,
//                 worse20: false,
//                 compressedCoverImage: null,
                
//             },
//             {
//                 title: '',
//                 year: '',
//                 rating: '',
//                 reviewContent: '',
//                 editorState: EditorState.createEmpty(),
//                 imdbLink: '',
//                 top25: false,
//                 worse20: false,
//                 compressedCoverImage: null,
                
//             },
//             {
//                 title: '',
//                 year: '',
//                 rating: '',
//                 reviewContent: '',
//                 editorState: EditorState.createEmpty(),
//                 imdbLink: '',
//                 top25: false,
//                 worse20: false,
//                 compressedCoverImage: null,
                
//             },
//             {
//                 title: '',
//                 year: '',
//                 rating: '',
//                 reviewContent: '',
//                 editorState: EditorState.createEmpty(),
//                 imdbLink: '',
//                 top25: false,
//                 worse20: false,
//                 compressedCoverImage: null,
//             }
//         ])
//         setFormSubmitted(!formSubmitted)
//         console.log('New Review Added')

//         // Deleting images from temp images, the data about images is stored in the post document
//         contentImages.forEach(async(image) => {
//             const deleteResponse = await fetch(`/api/tempMedia/${image.id}`, {
//                 method: 'DELETE'
//             })
//             const json = await deleteResponse.json()

//             if (response.ok) {
//                 console.log("deleted from tempImages", json)
//             }
//         })
//         setContentImages([])
//     }
// }