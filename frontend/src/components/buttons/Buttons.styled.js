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

    span {
        font-weight: 400;
        color: ${(props) => props.theme.dark.colorWHITE50};
        @media (max-width: 250px) {
            display: none;
        }
    }

    @media (hover: hover) {
        &:hover {
            background-color: ${(props) => props.theme.dark.colorREDhover};
        }
    }

    &.disabled {
        opacity: .5;
        cursor: default;

        &:hover {
            background-color: ${(props) => props.theme.dark.colorRED}
        }
    }
`
export const TextButton = styled(StyledButton)`
    font-size: ${(props) => props.theme.dark.textM};
    background-color: transparent;
    color: ${(props) => props.theme.dark.colorWHITE};
    padding: 0;

    @media (hover: hover) {
        &:hover {
            background-color: transparent;
            color: ${(props) => props.theme.dark.colorRED};
        }
    }
`

export const FilterButton = styled.button`
    min-height: 31px;
    height: fit-content;
    border: 1px solid ${(props) => props.theme.dark.colorWHITE50};
    background-color: transparent;
    color: ${(props) => props.theme.dark.colorWHITE50};
    padding: 5px 10px;
    cursor: pointer;
    border-radius: ${(props) => props.theme.dark.radiusS};
    font-size: ${(props) => props.theme.dark.textS};

    span {
        display: none;
    }

    @media (hover: hover) {
        &:hover {
            background-color: transparent;
            color: ${(props) => props.theme.dark.colorWHITE};
        }
    }

    &.active {
        background-color: ${(props) => props.theme.dark.colorRED};
        border: 1px solid transparent;
        color: ${(props) => props.theme.dark.primary};
        pointer-events: none;

        span {
            display: inline;
            color: ${(props) => props.theme.dark.colorWHITE50};
        }
    }



    @media (max-width: 768px) {
        font-size: ${(props) => props.theme.dark.textXS};
    }
`

export const SortButton = styled(FilterButton)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 31px;
    flex-wrap: wrap;
    gap: 5px;

    &.active {
        color: ${(props) => props.theme.dark.primary};
    }

    svg {
        fill: ${(props) => props.theme.dark.colorWHITE80};
    }
`

export const CommentsButton = styled(StyledButton)`

    font-size: ${(props) => props.theme.dark.textM};
    background-color: ${(props) => props.theme.dark.colorBLACK};
    color: ${(props) => props.theme.dark.colorWHITE};
    cursor: default;
    

    @media (hover: hover) {
        &:hover {
            background-color: ${(props) => props.theme.dark.commentsBG};
        }
    }

    &.active {
        background-color: ${(props) => props.theme.dark.commentsBG};
        border-radius: ${(props) => props.theme.dark.radiusS} ${(props) => props.theme.dark.radiusS} 0 0;
    }
`