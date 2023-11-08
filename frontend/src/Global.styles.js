import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    body {
        background-color: ${(props) => props.theme.dark.background};
        color: #fff;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Lexend', sans-serif;
        line-height: 24px;
    }

    li {
        list-style: none;
    }
    ::-webkit-scrollbar {
        width: 0;
    }

    p {
        font-size: 16px;
        line-height: 24px;
    }

    h1.mainTitle {
        font-family: 'Creepster', sans-serif;
        font-size: 128px;
        margin-bottom: 50px;
        text-align: center;
        color: ${(props) => props.theme.dark.secondary};
        line-height: 120px;
    }

    h1.reviewTitleH1 {
        width: 100%;
        font-size: 40px;
        line-height: 60px;
    }

    h2 {
        font-size: 25px;
        line-height: 36px;
    }

    h2.movieTitleH2 {
        font-size: 32px;
        line-height: 48px;
    }

    
`

export default GlobalStyles