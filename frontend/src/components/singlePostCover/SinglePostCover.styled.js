import styled from "styled-components";

export const SinglePostCoverWrap = styled.div`
    width: 100%;
    max-width: 2560px;
    margin-top: -2rem;
    
    @media (max-width: 425px) {
        padding: 0 ${(props) => props.theme.dark.contentPadding};
        margin-top: 0;

        .image0 {
            border-radius: ${(props) => props.theme.dark.radiusM} 0 0 0;

        }
        .image1 {
                border-radius: 0 ${(props) => props.theme.dark.radiusM} 0 0;
        }
        .image2 {
                border-radius: 0 0 0 ${(props) => props.theme.dark.radiusM};

        }
        .image3 {
            border-radius: 0 ${(props) => props.theme.dark.radiusM} ${(props) => props.theme.dark.radiusM} 0;
        }
    } 
`

export const SinglePostCoverContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    transition: .1s;
    border-radius: ${(props) => props.theme.dark.radiusM};

    @media (max-width: 425px) {
        grid-template-columns: repeat(2, 1fr);
        max-width: 425px;
    } 
`;

export const QuadImageContainer = styled.div`
    img {
        object-fit: cover;
        height: 100%;
        width: 100%;
    }
`