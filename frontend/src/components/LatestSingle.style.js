import styled from "styled-components";

export const LatestSingleReview = styled.div`
    padding: 0 ${(props) => props.theme.dark.contentPadding};
    display: flex;
    flex-direction: row;
    gap: 50px;
    width: 100%;
    max-width: 1000px;
    

    .latestSingleInfo {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        max-width: 45%;
    }
`

export const LatestSingleImage = styled.div`
    height: 300px;
    flex: 1;
    img {  
        object-fit: cover;
        height: 100%;
        width: 100%;
        }
`

export const LatestSingleDate = styled.p`
    font-size: 14px;
    color: ${(props) => props.theme.dark.grayText};
`