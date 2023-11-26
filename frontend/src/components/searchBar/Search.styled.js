import styled from "styled-components";

export const SearchComp = styled.div`
    display: flex;
    flex-direction: column;
`

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
    color: ${(props) => props.theme.dark.lightText};
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

export const SearchControls = styled.div`
    display: flex;
    justify-content: space-between;
`

export const SortControl = styled.div`

`
export const FilterControl = styled.div`

`
export const SortButton = styled.button`
    border: 1px solid ${(props) => props.theme.dark.lightInputBorder};
    background-color: transparent;
    color: ${(props) => props.theme.dark.lightInputBorder};
    padding: 5px 10px;
    cursor: pointer;

    &.active {
        color: ${(props) => props.theme.dark.primary};
    }
`
export const FilterButton = styled.button`
    border: 1px solid ${(props) => props.theme.dark.lightInputBorder};
    background-color: transparent;
    color: ${(props) => props.theme.dark.lightInputBorder};
    padding: 5px 10px;
    cursor: pointer;

    &.active {
        background-color: ${(props) => props.theme.dark.secondary};
        border: 1px solid transparent;
        color: ${(props) => props.theme.dark.primary};
    }
`