import styled from "styled-components";

// HOME PAGE

export const ContentSection = styled.section`
    max-width: ${(props) => props.theme.dark.contentWidth};
`

export const HomeIntroSection = styled.section`
    height: 800px;
    width: 100%;

    background-color: ${(props) => props.theme.dark.background};

    img {
        width: 100%;
        height: 100%;
        object-fit: scale-down;
        object-position: bottom;
    }
`


// TOP 25

export const Top25Section = styled.section`
    display: flex;
    justify-content: center;
`

// RECENZIJE

export const ReviewsSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
`


// WORSE 20

export const Top25smecaSection = styled.section`
    display: flex;
    justify-content: center;
`