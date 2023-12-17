import styled from "styled-components";

export const StyledPagination = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    & > ul {
        min-width: 240px;
        display: flex;
        justify-content: space-between;
        li {
            height: 40px;
            width: 40px;
            border-radius: ${(props) => props.theme.dark.radiusS};
            color: ${(props) => props.theme.dark.colorWHITE};
            a {
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 100%;
                font-size: ${(props) => props.theme.dark.textS};
                
            }

            &:hover {
                background-color: ${(props) => props.theme.dark.colorWHITE25};
            }
        }

        .previous {
            /* width: 100px; */
            border: 1px solid ${(props) => props.theme.dark.colorWHITE};
            margin-right: auto;
        }
        .next {
            /* width: 75px; */
            border: 1px solid ${(props) => props.theme.dark.colorWHITE};
            margin-left: auto;
        }
        .selected {
            border: 1px solid ${(props) => props.theme.dark.colorRED};
            background-color: ${(props) => props.theme.dark.colorRED};
            pointer-events: none;
        }
        .disabled {
            pointer-events: none;
            color: ${(props) => props.theme.dark.colorWHITE25};
            border-color: ${(props) => props.theme.dark.colorWHITE25};
        }
    }
`