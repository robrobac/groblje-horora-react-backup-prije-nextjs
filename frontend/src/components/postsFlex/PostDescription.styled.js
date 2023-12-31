import styled from "styled-components";

export const PreviewDetails = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;

    .titleAndRating {
        display: flex;
        flex-direction: column;
        gap: 25px;
        
    }
    
`

export const PostTitle = styled.h2`
    display: inline-block;
    width: fit-content;
    font-size: ${(props) => props.theme.dark.textL};
    transition: .1s;

    @media (hover: hover) {
        &:hover {
            color: ${(props) => props.theme.dark.colorRED};
        }
    }

    span {
       color: ${(props) => props.theme.dark.colorWHITE50};
    }

    @media (max-width: 425px) {
        font-size: ${(props) => props.theme.dark.textXXL};
    }
    @media (max-width: 320px) {
        font-size: ${(props) => props.theme.dark.textXL};
    }
`

export const PostSubTitle = styled.p`
    font-size: ${(props) => props.theme.dark.textS};
    color: ${(props) => props.theme.dark.colorWHITE80};
    span {
        color: ${(props) => props.theme.dark.colorWHITE50};
    }
`

export const PostDate = styled.p`
    font-size: ${(props) => props.theme.dark.textS};
    color: ${(props) => props.theme.dark.colorWHITE50};
`

export const CommentsAndLikes = styled.div`
    padding: 5px;
    position: absolute;
    display: flex;
    gap: 10px;
    top: -6px;
    right: 0;
`

export const CommentIconContainer = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 5px;

    p {
        color: ${(props) => props.theme.dark.colorWHITE80};
    }
    svg {
        fill: ${(props) => props.theme.dark.colorWHITE50};
    }
`

export const LikeIconContainer = styled(CommentIconContainer)`

    svg {
        height: 20px;
        width: 20px;

        &.liked {
            fill: ${(props) => props.theme.dark.colorREDbright};
        }
    }
`