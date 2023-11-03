import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body {
        background-color: #191919;
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

    h1 {
        font-size: 32px;
        line-height: 48px;
    }
`

export default GlobalStyles