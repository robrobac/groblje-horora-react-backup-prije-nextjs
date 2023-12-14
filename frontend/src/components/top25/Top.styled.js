import styled from "styled-components";

export const TopContainer = styled.div`
    padding: 0 ${(props) => props.theme.dark.contentPadding};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 50px;
    width: 100%;
    max-width: ${(props) => props.theme.dark.smallWidth};
    margin: 100px 0;

    .topInfo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 30px;
    }

    @media (max-width: 768px) {
        flex-direction: column-reverse;
        flex-direction: ${(props) => props.$reverse ? 'column-reverse' : 'column'};
        align-items: center;
        gap: 20px;
        margin: 50px 0;
    }
`

export const TopTitle = styled.h2`
    display: inline-block;
    width: fit-content;
    font-size: ${(props) => props.theme.dark.textHUGE};
    transition: .1s;

    &:hover {
        color: ${(props) => props.theme.dark.colorRED};
    }

    span {
        opacity: .5;
    }

    @media (max-width: 360px) {
        font-size: ${(props) => props.theme.dark.textXXL};
    }

    @media (max-width: 230px) {
        font-size: ${(props) => props.theme.dark.textXL};
    }
`

export const TopDescription = styled.p`
    font-size: ${(props) => props.theme.dark.textL};
    opacity: .8;

    span {
        opacity: .5;
    }
`

export const TopImage = styled.div`
    min-width: 300px;
    border-radius: ${(props) => props.theme.dark.radiusM};
    transition: .1s;

    img {  
        object-fit: cover;
        height: 100%;
        width: 100%;
        
        border-radius: ${(props) => props.theme.dark.radiusM};
        }
    &:hover {
        -webkit-box-shadow: 0px 0px 21px 1px #000000; 
        box-shadow: 0px 0px 21px 1px #000000;
    }
    @media (max-width: 768px) {
        max-width: 425px;
        min-width: unset;
    }
`