import styled from "styled-components";

export const StyledButton = styled.button`
    width: 160px;
    font-size: 14px;
    padding: 20px 0;
    background-color: unset;
    border: 1px solid ${(props) => props.theme.dark.primary};
    color: ${(props) => props.theme.dark.primary};
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.dark.secondary};
        border: 1px solid ${(props) => props.theme.dark.secondary};
    }
`