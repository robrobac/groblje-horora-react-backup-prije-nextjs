import styled from "styled-components";

export const StyledButton = styled.button`
    width: fit-content;
    font-size: ${(props) => props.theme.dark.textL};
    background-color: ${(props) => props.theme.dark.colorRED};
    color: ${(props) => props.theme.dark.colorWHITE};
    border-radius: ${(props) => props.theme.dark.radiusS};
    border: none;
    cursor: pointer;
    padding: 20px;
    &:hover {
        background-color: ${(props) => props.theme.dark.colorREDhover};
    }
`