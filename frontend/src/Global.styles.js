import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`


    body {
        background-color: ${(props) => props.theme.dark.colorBLACK};
        color: ${(props) => props.theme.dark.colorWHITE};
        overflow-x: hidden;

        &.loading {
            overflow: hidden;
        }
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Lexend', sans-serif;
    }

    a {
        color: unset;
        text-decoration: none;
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

        @media (max-width: 780px) {
            font-size: 100px;
            
        }
        @media (max-width: 590px) {
            line-height: 95px;
        }
        @media (max-width: 320px) {
            font-size: 70px;
            line-height: 65px;
        }
    }

    h2 {
        font-size: 25px;
    }

    .centerHorizontally {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`

export default GlobalStyles