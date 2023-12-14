import styled from "styled-components";

export const LatestRecenzijaContainer = styled.div`
    padding: 0 ${(props) => props.theme.dark.contentPadding};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 50px;
    width: 100%;
    max-width: ${(props) => props.theme.dark.contentWidth};
    margin: 100px 0;
    
    .latestSingleInfo {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        gap: 30px;
    }

    .titleAndRating {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        
    }
    @media (max-width: 680px) {
        flex-direction: column;
        gap: 20px;
        margin: 50px 0;
    }

    &.desktopRecenzija {

        @media (max-width: 680px) {
            display: none;
        }
    }  

    
    &.mobileRecenzija {
        display: none;

        @media (max-width: 680px) {
            display: flex;
        }
    }  
`

export const RecenzijaTitle = styled.h2`
    display: inline-block;
    width: fit-content;
    font-size: ${(props) => props.theme.dark.textXXL};
    transition: .1s;

    &:hover {
        color: ${(props) => props.theme.dark.colorRED};
    }

    span {
        opacity: .5;
    }
`

export const RecenzijaSubTitle = styled.p`
    font-size: ${(props) => props.theme.dark.textS};

    span {
        opacity: .5;
    }
`

export const RecenzijaDescription = styled.p`
    font-size: ${(props) => props.theme.dark.textL};
    opacity: .8;

    display: -webkit-box;
    -webkit-line-clamp: 6; /* Change the number to the desired line limit */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    span {
        opacity: .5;
    }
    @media (max-width: 900px) {
        -webkit-line-clamp: 4; /* Change the number to the desired line limit */
    }
`

export const LatestSingleImage = styled.div`
    height: 100%;
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
    @media (max-width: 680px) {
        max-width: 425px;
        min-width: unset;
    }
`

export const LatestSingleDate = styled.p`
    font-size: 14px;
    color: ${(props) => props.theme.dark.grayText};
`
