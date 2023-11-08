import styled from "styled-components";

export const LatestQuadReview = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: ${(props) => props.theme.dark.contentWidth};

    .latestQuadInfo {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
`

export const QuadCoverContainer = styled.div`
    cursor: pointer;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);

`

export const QuadCoverImageContainer = styled.div`
    img {
        
        object-fit: cover;
        height: 100%;
        width: 100%;
    }
`

export const LatestQuadDate = styled.p`
    font-size: 14px;
    color: ${(props) => props.theme.dark.grayText};
`