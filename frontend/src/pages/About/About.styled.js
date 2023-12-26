import styled from "styled-components";

export const AboutContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 100px;

    @media (max-width: 568px) {
        gap: 50px;
    }
`

export const AboutSection = styled.div`
    padding: 0 ${(props) => props.theme.dark.contentPadding};
    width: 100%;
    max-width: ${(props) => props.theme.dark.normalWidth};

    p {
        max-width: ${(props) => props.theme.dark.readingWidth};
        font-size: ${(props) => props.theme.dark.textL};
        line-height: 30px;
        color: ${(props) => props.theme.dark.colorWHITE80};

        @media (max-width: 425px) {
            font-size: ${(props) => props.theme.dark.textM};
            line-height: 24px;
        }
    }

    h1 {
        font-size: ${(props) => props.theme.dark.textHUGE};
        margin-bottom: 2rem;

        @media (max-width: 300px) {
            font-size: ${(props) => props.theme.dark.textXXXL};
        }
    }

    h2 {
        font-size: ${(props) => props.theme.dark.textXXL};
        margin-bottom: 1rem;

        @media (max-width: 300px) {
            font-size: ${(props) => props.theme.dark.textXL};
        }
    }
`

export const PieSection = styled(AboutSection)`
    display: flex;


    @media (max-width: 568px) {
        flex-wrap: wrap;
        row-gap: 1rem;
    }
`

export const PieContainer = styled.div`
    margin-left: 1rem;
    @media (max-width: 568px) {
        margin-left: 0;
    }

`


export const CountersWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    row-gap: 50px;
    width: 100%;
    max-width: ${(props) => props.theme.dark.readingWidth};
    
    
`

export const CounterSection = styled.div`
    width: 100%;
    max-width: ${(props) => props.theme.dark.normalWidth};
`

export const CounterContainer = styled.h2`
    flex: 1;
    text-align: center;
    font-size: ${(props) => props.theme.dark.textHUGE};
    padding: 0 ${(props) => props.theme.dark.contentPadding};

    span {
        font-weight: 400;
        color: ${(props) => props.theme.dark.colorWHITE80};
    }

    @media (max-width: 320px) {
        font-size: ${(props) => props.theme.dark.textXXXL};
    }
    @media (max-width: 256px) {
        font-size: ${(props) => props.theme.dark.textXXL};
    }
`