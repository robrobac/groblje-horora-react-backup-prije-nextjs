import styled from "styled-components";

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