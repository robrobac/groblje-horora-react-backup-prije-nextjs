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
        text-align: center;
        letter-spacing: 5px;
        font-family: 'Creepster', sans-serif;
        font-size: ${(props) => props.theme.dark.textXXXLtitle};
        text-align: center;
        color: ${(props) => props.theme.dark.colorRED};
        margin: 50px 0;


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