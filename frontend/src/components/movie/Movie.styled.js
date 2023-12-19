import styled from "styled-components";

export const MovieContainer = styled.div`
    width: 100%;
    max-width: ${(props) => props.theme.dark.normalWidth};
    padding: 0 ${(props) => props.theme.dark.contentPadding};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
`

export const MovieInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: ${(props) => props.theme.dark.contentWidth};
`

export const ReadingSection = styled.section`
    width: 100%;
`

export const TitleH1 = styled.h1`
    font-size: ${(props) => props.theme.dark.textHUGE};

    span {
        color: ${(props) => props.theme.dark.colorWHITE50};
    }

    @media (max-width: 425px) {
        font-size: ${(props) => props.theme.dark.textXXXL};
    }
    
    @media (max-width: 375px) {
        overflow-wrap: break-word;
        font-size: ${(props) => props.theme.dark.textXXL};
    }
`

export const TitleH2 = styled.h2`
    font-size: ${(props) => props.theme.dark.textXXXL};

    span {
        color: ${(props) => props.theme.dark.colorWHITE50};
    }
    @media (max-width: 425px) {
        font-size: ${(props) => props.theme.dark.textXXL};
    }
`

export const MovieImage = styled.div`
    max-width: 400px;
    border-radius: ${(props) => props.theme.dark.radiusM};

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: ${(props) => props.theme.dark.radiusM};
    }
`

export const ReadingContent = styled.section`
    display: flex;
    flex-direction: column;
    max-width: ${(props) => props.theme.dark.readingWidth};
    text-align: left;
    gap: 1rem;
    color: ${(props) => props.theme.dark.colorWHITE80};
`

export const MovieDate = styled.p`
    font-size: ${(props) => props.theme.dark.textS};
    color: ${(props) => props.theme.dark.colorWHITE50};
`