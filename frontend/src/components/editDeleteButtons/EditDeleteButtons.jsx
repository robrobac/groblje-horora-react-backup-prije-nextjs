import React from 'react'
import {ReactComponent as DeleteIcon} from '../../images/deleteicon.svg'
import {ReactComponent as EditIcon} from '../../images/editicon.svg'
import { deleteImageFromFirebaseStorage } from '../../helpers/firebaseUtils'
import { Link } from 'react-router-dom'
import { EditDeleteButtonsContainer } from './EditDeleteButtons.styled'

export default function EditDeleteButtons({post, handleRefresh}) {

    const handleDelete = async (review) => {

        if (window.confirm("Koja BRT ako ovo prihvatis objava odlazi na vjecna lovista, bez mogucnosti povratka MF.") === true) {
            let imagesToDelete = []

            if (review.contentImages) {
                review.contentImages.forEach((image) => {
                    imagesToDelete.push(image.path)
                })
            }
            if (review.movies) {
                review.movies.forEach((movie) => {
                    imagesToDelete.push(movie.coverImagePath)
                })
            }

            try {
                const deleteResponse = await fetch(`http://localhost:4000/api/reviews/${review._id}`, {
                    method: 'DELETE',
                });
                const deleteJson = await deleteResponse.json();
                if (deleteResponse.ok) {
                    console.log('Review Deleted', deleteJson);

                    imagesToDelete.forEach(async (image) => {
                        await deleteImageFromFirebaseStorage(image)
                        console.log("image deleted from firebase")
                    })
                    console.log("all images removed from firebase")

                    handleRefresh()
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <EditDeleteButtonsContainer>
            <div className="adminBtn" onClick={() => handleDelete(post)}>
                <DeleteIcon/>
            </div>
            <Link to={`/recenzije/${post.slug}/edit`}>
                <div className="adminBtn">
                    <EditIcon />                       
                </div>
            </Link>
        </EditDeleteButtonsContainer>
    )
}
