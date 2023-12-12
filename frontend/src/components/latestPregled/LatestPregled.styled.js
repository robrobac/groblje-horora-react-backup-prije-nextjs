import styled from "styled-components";

export const LatestPregledContainer = styled.div`
    padding: 0 ${(props) => props.theme.dark.contentPadding};
    margin: 100px 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    max-width: ${(props) => props.theme.dark.contentWidth};

    .latestPregledInfo {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
`

export const PregledTitle = styled.h2`
    display: inline-block;
    width: fit-content;
    font-size: ${(props) => props.theme.dark.textXXL};
    transition: .1s;

    &:hover {
        color: ${(props) => props.theme.dark.colorRED};
    }
`
export const PregledSubTitle = styled.p`
    font-size: ${(props) => props.theme.dark.textS};
    margin-bottom: 1rem;

    span {
        opacity: .5;
    }
`
export const PregledDescription = styled.p`
    font-size: ${(props) => props.theme.dark.textL};
    opacity: .8;

    span {
        opacity: .5;
    }
`




export const QuadCoverContainer = styled.div`
    cursor: pointer;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    transition: .1s;
    border-radius: ${(props) => props.theme.dark.radiusM};

    &:hover {
        -webkit-box-shadow: 0px 0px 21px 1px #000000; 
        box-shadow: 0px 0px 21px 1px #000000;
    }

    .firstImage {
        border-radius: ${(props) => props.theme.dark.radiusM} 0 0 ${(props) => props.theme.dark.radiusM};
    }
    .lastImage {
        border-radius: 0 ${(props) => props.theme.dark.radiusM} ${(props) => props.theme.dark.radiusM} 0;
    }
`;

export const QuadCoverImageContainer = styled.div`
    img {
        object-fit: cover;
        height: 100%;
        width: 100%;
    }
`
