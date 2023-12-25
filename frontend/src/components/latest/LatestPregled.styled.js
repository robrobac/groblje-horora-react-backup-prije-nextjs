import styled from "styled-components";

export const LatestPregledContainer = styled.div`
    padding: 0 ${(props) => props.theme.dark.contentPadding};
    margin: 100px 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    max-width: ${(props) => props.theme.dark.normalWidth};

    .latestPregledInfo {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        
    }

    @media (max-width: 768px) {
        align-items: center;
        gap: 30px;
        margin: 50px 0;

        .buttonContainer {
            width: 100%;
        }
        .subtitleContainer {
            width: 100%;
        }
    }

    &.desktopPregled {
        @media (max-width: 768px) {
            display: none;
        }
    }  
    &.mobilePregled {
        display: none;

        @media (max-width: 768px) {
            display: flex;
        }
    } 
`

export const PregledTitle = styled.h2`
    display: inline-block;
    width: fit-content;
    font-size: ${(props) => props.theme.dark.textXXL};
    transition: .1s;

    @media (hover: hover) {
        &:hover {
            color: ${(props) => props.theme.dark.colorRED};
        }
    }

    @media (max-width: 230px) {
        font-size: ${(props) => props.theme.dark.textXL};
    }
`
export const PregledSubTitle = styled.p`
    font-size: ${(props) => props.theme.dark.textS};
    margin-bottom: 1rem;

    span {
        color: ${(props) => props.theme.dark.colorWHITE50};
    }

    @media (max-width: 680px) {
        margin-bottom: 0;
    }
`
export const PregledDescription = styled.p`
    font-size: ${(props) => props.theme.dark.textL};
    color: ${(props) => props.theme.dark.colorWHITE80};

    span {
        color: ${(props) => props.theme.dark.colorWHITE50};
    }
`




export const QuadCoverContainer = styled.div`
    cursor: pointer;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    transition: .1s;
    border-radius: ${(props) => props.theme.dark.radiusM};

    @media (hover: hover) {
        &:hover {
            -webkit-box-shadow: 0px 0px 21px 1px #000000; 
        box-shadow: 0px 0px 21px 1px #000000;
        }
    }

    .image0 {
        border-radius: ${(props) => props.theme.dark.radiusM} 0 0 ${(props) => props.theme.dark.radiusM};
        @media (max-width: 768px) {
            border-radius: ${(props) => props.theme.dark.radiusM} 0 0 0;
        }
    }
    .image1 {
        @media (max-width: 768px) {
            border-radius: 0 ${(props) => props.theme.dark.radiusM} 0 0;
        }
    }
    .image2 {
        @media (max-width: 768px) {
            border-radius: 0 0 0 ${(props) => props.theme.dark.radiusM};
        }
    }
    .image3 {
        border-radius: 0 ${(props) => props.theme.dark.radiusM} ${(props) => props.theme.dark.radiusM} 0;
    }
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        max-width: 425px;
    } 
`;

export const QuadCoverImageContainer = styled.div`
    img {
        object-fit: cover;
        height: 100%;
        width: 100%;
    }
`
