import styled from "styled-components";

export const StyledPagination = styled.div`

    display: flex;
    justify-content: center;
    & > ul {
        width: 500px;
        display: flex;
        gap: 8px;
        li {
            height: 40px;
            width: 40px;
            border-radius: 4px;
            a {
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 100%;
                font-size: 14px;
            }

            &:hover {
                background-color: ${(props) => props.theme.dark.inputBorder};
            }
        }

        .previous {
            /* width: 100px; */
            border: 1px solid ${(props) => props.theme.dark.lightText};
            margin-right: auto;
        }
        .next {
            /* width: 75px; */
            border: 1px solid ${(props) => props.theme.dark.lightText};
            margin-left: auto;
        }
        .selected {
            border: 1px solid ${(props) => props.theme.dark.lightText};
            pointer-events: none;
        }
        .disabled {
            pointer-events: none;
            color: ${(props) => props.theme.dark.grayText};
            border-color: ${(props) => props.theme.dark.grayText};
        }
    }
`