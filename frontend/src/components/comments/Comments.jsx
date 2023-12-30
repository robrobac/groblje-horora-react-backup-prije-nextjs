import React, { useContext, useEffect, useState } from 'react'
import { Comment, CommentForm, CommentsContainer, CommentsContent, CommentsHeader, CommentsList, FormInput, LikeHead } from './Comments.styled'
import { CommentsButton, StyledButton } from '../buttons/Buttons.styled'
import {ReactComponent as LikeIcon} from '../../images/likeicon.svg'
import { AuthContext } from '../../App'

export default function Comments({post}) {
    const [commentPosted, setCommentPosted] = useState(false)
    const [commentValue, setCommentValue] = useState('')
    const [count, setCount] = useState({})
    const {isAuth} = useContext(AuthContext)
    const [postComments, setPostComments] = useState([])
    console.log(postComments)

    useEffect(() => {
        const handleFetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/getComments/${post?._id}`);
                const json = await response.json();
        
                if (response.ok) {
                    setPostComments(json);
                } else {
                    console.log('failed fetch comments', json)
                }
            }
            catch (err) {
                console.log(err)
            }
        }

        handleFetchComments()
    }, [commentPosted, post?._id])



    // Get number of post comments
    useEffect(() => {
        const countReviews = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/countComments/${post?._id}`);
                const json = await response.json();

                if (response.ok) {
                    setCount(json);        
                } else {
                    console.log('failed to count', json)
                }
            }
            catch (err) {
                console.log(err)
            }
        };

        countReviews();
    }, [commentPosted, post?._id]);

    // Handle comment form submission
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        console.log('Comment Form Submitted')

        try {
            // Prepare comment data for MongoDB
            const commentData = {
                authorName: isAuth.username,
                authorEmail: isAuth.email,
                commentMessage: commentValue,
                reviewId: post._id
            };
            console.log('Comment Data prepared for storing to MongoDB')
    
            // Add comment data to MongoDB
            const response = await fetch('http://localhost:4000/api/comments', {
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
    const handleDeleteComment = async () => {
        try {
            const deleteResponse = await fetch(`http://localhost:4000/api/deleteComment/${post?._id}`, {
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
                <CommentsButton className='active'>Komentari <span>{`(${count})`}</span></CommentsButton>
            </CommentsHeader>
            <CommentsContent>
                <CommentsList>
                    {postComments.length === 0 ? 
                        <p className='noComments'><i>Nema komentara, budi prvi i ostavi svoj komentar</i></p>
                    :
                        ''
                    }
                    {postComments?.map((comment) => (
                        <Comment>
                            <div className="commentAuthor">{comment?.authorName} <span>18.02.2023</span></div>
                            {isAuth?.role === 'admin' || isAuth?.username === comment.authorName || isAuth?.email === comment.authorEmail ?
                                <button className="removeComment" onClick={handleDeleteComment}>X</button>
                            :
                                ''
                            }
                            <p className='commentMessage'>
                                {comment?.commentMessage}
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
