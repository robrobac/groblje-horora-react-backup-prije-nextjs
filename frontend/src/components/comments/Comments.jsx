import React, { useContext, useState } from 'react'
import { Comment, CommentForm, CommentsContainer, CommentsContent, CommentsHeader, CommentsList, FormInput, LikeHead } from './Comments.styled'
import { CommentsButton, StyledButton } from '../buttons/Buttons.styled'
import {ReactComponent as LikeIcon} from '../../images/likeicon.svg'
import { AuthContext } from '../../App'
import { format } from 'date-fns'

export default function Comments({post}) {
    const [commentPosted, setCommentPosted] = useState(false)
    const [commentValue, setCommentValue] = useState('')
    const {isAuth} = useContext(AuthContext)


    
    // Handle comment form submission
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        console.log('Comment Form Submitted')

        try {
            // Prepare comment data for MongoDB
            const commentData = {
                authorName: isAuth.username,
                authorEmail: isAuth.email,
                message: commentValue,
            };
            console.log('Comment Data prepared for storing to MongoDB')
    
            // Add comment data to MongoDB
            const response = await fetch(`http://localhost:4000/api/comments/${post._id}`, {
                method: 'POST',
                body: JSON.stringify(commentData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            console.log('server response', json)
            if (!response.ok) {
                console.log(json);
                return;
            }
            console.log('comment data stored to MongoDB', json);
            setCommentValue('')
            setCommentPosted(!commentPosted)
            
        } catch (err) {
            console.log(err);
        }
    };

    // Handle comment removal
    const handleDeleteComment = async (commentId) => {
        try {
            const deleteResponse = await fetch(`http://localhost:4000/api/reviews/${post._id}/comments/${commentId}`, {
                method: 'DELETE'
            })
            const json = await deleteResponse.json()

            if (deleteResponse.ok) {
                console.log("comment deleted", json)
                setCommentPosted(!commentPosted)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <CommentsContainer>
            <CommentsHeader>
                <LikeHead>
                    <LikeIcon />
                    <p>25</p>
                </LikeHead>
                <CommentsButton className='active'>Komentari <span>{`(${post?.comments.length})`}</span></CommentsButton>
            </CommentsHeader>
            <CommentsContent>
                <CommentsList>
                    {post?.comments.length === 0 ? 
                        <p className='noComments'><i>Nema komentara, budi prvi i ostavi svoj komentar</i></p>
                    :
                        ''
                    }
                    {post?.comments.map((comment) => (
                        <Comment>
                            <div className="commentAuthor">{comment?.authorName} @ <span>{format(new Date(comment?.createdAt), 'dd.MM.yyyy HH:mm:ss')}</span></div>
                            {isAuth?.role === 'admin' || isAuth?.username === comment.authorName || isAuth?.email === comment.authorEmail ?
                                <button className="removeComment" onClick={() => handleDeleteComment(comment._id)}>X</button>
                            :
                                ''
                            }
                            <p className='commentMessage'>
                                {comment?.message}
                            </p>
                            <hr className='divider'></hr>
                        </Comment>
                    ))}
                </CommentsList>
                <CommentForm onSubmit={handleSubmitComment}>
                    <FormInput
                        disabled={isAuth ? false : true}
                        type='text' placeholder={isAuth ? 'Upiši komentar' : 'Morate biti prijavljeni da bi ostavljali komentare'}
                        value={commentValue}
                        onChange={(e) => {setCommentValue(e.target.value)}}
                    />
                    <StyledButton
                        className={isAuth ? '' : 'disabled'}
                        type='submit'
                    >
                        Pošalji
                    </StyledButton>
                </CommentForm>
            </CommentsContent>
        </CommentsContainer>
    )
}
