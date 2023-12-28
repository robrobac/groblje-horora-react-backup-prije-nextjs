import React, { useState } from 'react'
import { Comment, CommentForm, CommentsContainer, CommentsContent, CommentsHeader, CommentsList, FormInput, LikeHead } from './Comments.styled'
import { CommentsButton, StyledButton } from '../buttons/Buttons.styled'
import {ReactComponent as LikeIcon} from '../../images/likeicon.svg'

export default function Comments() {
    const [commentsOpen, setCommentsOpen] = useState(false)

    return (
        <CommentsContainer>
            <CommentsHeader>
                <LikeHead>
                    <LikeIcon />
                    <p>25</p>
                </LikeHead>
                <CommentsButton onClick={() => setCommentsOpen(!commentsOpen)} className={commentsOpen ? 'active' : ''}>Komentari <span>(15)</span></CommentsButton>
            </CommentsHeader>
            <CommentsContent className={!commentsOpen ? 'notActive' : ''}>
                <CommentsList className={!commentsOpen ? 'notActive' : ''}>
                    <Comment>
                        <div className="commentAuthor">ZgazenaMacka <span>18.02.2023</span></div>
                        <button className="removeComment">X</button>
                        <p className='commentMessage'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <hr className='divider'></hr>
                    </Comment>
                    <Comment>
                        <div className="commentAuthor">JiGsAw42 <span>19.02.2023</span></div>
                        <button className="removeComment">X</button>
                        <p className='commentMessage'>
                            Labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <hr className='divider'></hr>
                    </Comment>
                    <Comment>
                        <div className="commentAuthor">JiGsAw42 <span>19.02.2023</span></div>
                        <button className="removeComment">X</button>
                        <p className='commentMessage'>
                            Labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <hr className='divider'></hr>
                    </Comment>
                </CommentsList>
                <CommentForm>
                    <FormInput type='text' placeholder='Upiši komentar'/>
                    <StyledButton>Pošalji</StyledButton>
                </CommentForm>
            </CommentsContent>
        </CommentsContainer>
    )
}
