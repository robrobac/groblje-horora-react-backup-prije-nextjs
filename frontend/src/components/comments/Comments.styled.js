import styled from "styled-components";

export const CommentsContainer = styled.div`
    width: 100%;
    max-width: ${(props) => props.theme.dark.normalWidth};
    padding: 0 ${(props) => props.theme.dark.contentPadding};
    height: fit-content;

`

export const CommentsHeader = styled.div`
    max-width: ${(props) => props.theme.dark.readingWidth};
    display: flex;
    justify-content: space-between;
`
export const LikeHead = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;

    svg {
        cursor: pointer;
        fill: ${(props) => props.theme.dark.colorWHITE25};

        &.liked {
            fill: ${(props) => props.theme.dark.colorREDbright};
        }
    }

    p {
        color: ${(props) => props.theme.dark.colorWHITE80};
    }
`


export const CommentsContent = styled(CommentsHeader)`
    background-color: ${(props) => props.theme.dark.commentsBG};
    padding: 32px;
    border-radius: ${(props) => props.theme.dark.radiusM} 0 ${(props) => props.theme.dark.radiusM} ${(props) => props.theme.dark.radiusM};
    display: flex;
    flex-direction: column;
    gap: 48px;
`
export const CommentsList = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 32px;

    .noComments {
        text-align: center;
        font-size: ${(props) => props.theme.dark.textS};
        color: ${(props) => props.theme.dark.colorWHITE50};
    }
`

export const Comment = styled.li`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    .removeComment {
        position: absolute;
        top: 0;
        right: 0;
        border: none;
        cursor: pointer;
        width: 20px;
        height: 20px;
        border-radius: 50px;
        font-weight: 600;
        background-color: ${(props) => props.theme.dark.colorRED};
    }

    .commentAuthor {
        color: ${(props) => props.theme.dark.colorWHITE};

        span {
            color: ${(props) => props.theme.dark.colorWHITE50};
            font-size: ${(props) => props.theme.dark.textS};
        }
    }

    .commentMessage {
        color: ${(props) => props.theme.dark.colorWHITE80};
    }

    .divider {
        height: 1px;
        background-color: ${(props) => props.theme.dark.colorWHITE15};
        border: 0;
    }
`

export const CommentForm = styled.form`
    display: flex;
    gap: 10px;

`

export const FormInput = styled.input`
    flex: 1;
    border-radius: ${(props) => props.theme.dark.radiusS};
    font-size: ${(props) => props.theme.dark.textM};
    font-weight: 400;
    padding: 10px 20px;
    border: 1px solid ${(props) => props.theme.dark.inputBorder};
    background-color: transparent;
    
    color: ${(props) => props.theme.dark.colorWHITE80};

    &:focus {
        border: 1px solid ${(props) => props.theme.dark.colorWHITE50};
        outline: none;
    }

    &::placeholder {
        color: ${(props) => props.theme.dark.colorWHITE15};
    }
`