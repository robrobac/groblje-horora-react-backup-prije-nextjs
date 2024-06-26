import styled from "styled-components";

export const PreviewImage = styled.div`
    position: relative;
    aspect-ratio: 20800 / 30513;
    overflow: hidden;
    border-radius: ${(props) => props.theme.dark.radiusM};

    @media (hover: hover) {
        &:hover {
            -webkit-box-shadow: 0px 0px 21px 1px #000000; 
            box-shadow: 0px 0px 21px 1px #000000;
        }
    }
   
    .singleMovieImage {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: ${(props) => props.theme.dark.radiusM};
        background-color: ${(props) => props.theme.dark.colorWHITE15};
}

`

export const QuadImageContainer = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    aspect-ratio: 20800 / 30513;
    overflow: hidden;
    border-radius: ${(props) => props.theme.dark.radiusM};

    @media (hover: hover) {
        &:hover {
            -webkit-box-shadow: 0px 0px 21px 1px #000000; 
            box-shadow: 0px 0px 21px 1px #000000;
        }
    }
    
`

export const QuadImage = styled.div`
    width: 50%;
    height: 50%;

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        background-color: ${(props) => props.theme.dark.colorWHITE15};
    }

    .image01 {

            border-radius: ${(props) => props.theme.dark.radiusM} 0 0 0;

    }
    .image02 {

            border-radius: 0 ${(props) => props.theme.dark.radiusM} 0 0;
        
    }
    .image03 {

            border-radius: 0 0 0 ${(props) => props.theme.dark.radiusM};
        
    }
    .image04 {
        border-radius: 0 0 ${(props) => props.theme.dark.radiusM} 0;
    }
`