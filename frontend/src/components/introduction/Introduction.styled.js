import styled from "styled-components";

export const IntroductionContainer = styled.div`
    margin-bottom: 100px;
    padding: 0 ${(props) => props.theme.dark.contentPadding};

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;


    @media (max-width: 768px) {
        margin-bottom: 50px;
    }
    p {
        max-width: 750px;
        font-size: ${(props) => props.theme.dark.textL};
        line-height: 30px;
        color: ${(props) => props.theme.dark.colorWHITE80};
        text-align: center;

        @media (max-width: 900px) {
            max-width: 640px;
        }
        @media (max-width: 768px) {
            max-width: 550px;
            font-size: ${(props) => props.theme.dark.textM};
            line-height: 24px;
        }
        @media (max-width: 530px) {
            max-width: 450px;
        }
        @media (max-width: 425px) {
            max-width: 425px;
            text-align: left;
        }
    }
`

export const MainTitle = styled.h1`
    width: fit-content;
    font-weight: 400;
    text-align: center;
    letter-spacing: 5px;
    font-family: 'Creepster', sans-serif;
    font-size: ${(props) => props.theme.dark.textXXXLtitle};
    text-align: center;
    color: ${(props) => props.theme.dark.colorRED};
    
    

    @media (max-width: 900px) {
        font-size: ${(props) => props.theme.dark.textXXLtitle};
    }
    @media (max-width: 768px) {
        font-size: ${(props) => props.theme.dark.textXXXLtitle};
    }
    @media (max-width: 530px) {
        font-size: ${(props) => props.theme.dark.textXXLtitle};
    }
    @media (max-width: 425px) {
        font-size: ${(props) => props.theme.dark.textXLtitle};
    }
    @media (max-width: 320px) {
    	font-size: ${(props) => props.theme.dark.textLtitle};
    }
    @media (max-width: 240px) {
        font-size: ${(props) => props.theme.dark.textMtitle};
    }

`