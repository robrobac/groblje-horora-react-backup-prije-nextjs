import styled from "styled-components";

export const PostCardContainer = styled.div`
    
    flex-basis: 20%;
    position: relative;
    padding: ${(props) => props.theme.dark.contentPadding};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;

    @media(max-width: 1024px) {
        flex-basis: 33.33%;
    }

    @media(max-width: 768px) {
        flex-basis: 50%;
    }

    @media(max-width: 425px) {
        flex-basis: 100%;
    }

`

export const PostCardDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

