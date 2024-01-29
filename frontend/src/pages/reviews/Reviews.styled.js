import styled from "styled-components";

export const ReviewsContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    min-height: 100vh;
`

export const ReviewsTitleContainer = styled.div`
    position: relative;
    z-index: 85;
    width: 100%;
    max-width: ${(props) => props.theme.dark.normalWidth};
    padding: 0 ${(props) => props.theme.dark.contentPadding};

    h1 {
        font-size: ${(props) => props.theme.dark.textXXXL};
    }
    p {
        max-width: ${(props) => props.theme.dark.smallWidth};
    }
`

export const ButtonsWrap = styled.div`
    display: flex;
    width: 100%;
    max-width: ${(props) => props.theme.dark.normalWidth};
    gap: 16px;
    padding: 0 ${(props) => props.theme.dark.contentPadding};
`