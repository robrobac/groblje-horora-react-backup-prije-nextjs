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

export const FilterButton = styled.button`
    height: fit-content;
    border: 1px solid ${(props) => props.theme.dark.colorWHITE50};
    background-color: transparent;
    color: ${(props) => props.theme.dark.colorWHITE50};
    padding: 5px 10px;
    cursor: pointer;
    border-radius: ${(props) => props.theme.dark.radiusS};
    font-size: ${(props) => props.theme.dark.textS};

    &.active {
        background-color: ${(props) => props.theme.dark.colorRED};
        border: 1px solid transparent;
        color: ${(props) => props.theme.dark.primary};
        pointer-events: none;
    }

    &:hover {
        color: ${(props) => props.theme.dark.colorWHITE};
    }

    @media (max-width: 768px) {
        font-size: ${(props) => props.theme.dark.textXS};
    }
`

export const SortButton = styled(FilterButton)`

    &.active {
        color: ${(props) => props.theme.dark.primary};
    }
`