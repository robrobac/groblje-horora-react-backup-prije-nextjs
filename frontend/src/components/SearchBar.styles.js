import styled from "styled-components";

export const SearchContainer = styled.div`
    display: flex;
    align-items: center;
`
export const SearchIcon = styled.label`
    position: absolute;
    display: flex;
    padding: 10px;
    svg {
        fill: ${(props) => props.theme.dark.lightInputBorder};
    }
`
export const SearchBar = styled.input`
    border: 1px solid ${(props) => props.theme.dark.lightInputBorder};
    background-color: transparent;
    font-size: 1rem;
    color: white;
    padding: 10px;
    padding-left: 40px;
    width: 100%;

    &:focus {
        border: 1px solid ${(props) => props.theme.dark.primary};
        outline: none;
    }

    &::placeholder {
        color: ${(props) => props.theme.dark.inputBorder};
    }
`