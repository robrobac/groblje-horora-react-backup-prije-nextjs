import styled from "styled-components";

export const CoverImage = styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;
    max-height: 800px;
    height: 90vh;
    max-width: 2560px;
    

    background-position: bottom;
    background-size: cover;
    background-repeat: no-repeat;

    @media (max-width: 1024px) {
        max-height: 700px;

    }

    @media (max-width: 768px) {
        max-height: 480px;
    }

    @media (max-width: 630px) {
        height: 400px;
    }

    @media (max-width: 425px) {
        height: 200px;
    }
`

export const CoverTrees = styled.div`
    width: 100vw;
    height: 100%;
    display: flex;
    justify-content: space-between;
`