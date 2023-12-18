import styled from "styled-components";

export const PreviewDetails = styled.div`
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

    &:hover {
        color: ${(props) => props.theme.dark.colorRED};
    }

    span {
        opacity: .5;
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