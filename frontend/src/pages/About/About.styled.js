import styled from "styled-components";

export const AboutContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Statistics = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    width: 100%;
`

export const CountersWrap = styled.div`
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    row-gap: 50px;
    width: 100%;
    max-width: ${(props) => props.theme.dark.smallWidth};
    
    
`

export const CounterContainer = styled.h2`
    flex: 1;
    text-align: center;
    font-size: ${(props) => props.theme.dark.textHUGE};
    padding: 0 ${(props) => props.theme.dark.contentPadding};

    

    span {
        font-weight: 400;
    }

    @media (max-width: 320px) {
        font-size: ${(props) => props.theme.dark.textXXXL};
    }
    @media (max-width: 256px) {
        font-size: ${(props) => props.theme.dark.textXXL};
    }
`

export const PiesWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    row-gap: 50px;
    width: 100%;
    max-width: ${(props) => props.theme.dark.smallWidth};
`


export const PieContainer = styled.div`
    flex: 1;
    text-align: center;
    font-size: ${(props) => props.theme.dark.textXL};
    span {
        font-weight: 400;
    }
`

export const PieTitle = styled.h3`
    text-align: center;
    font-size: ${(props) => props.theme.dark.textL};
`