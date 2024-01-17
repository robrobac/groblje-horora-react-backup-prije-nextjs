import styled from "styled-components";

export const StyledLoadingButton = styled.button`
    width: fit-content;
    font-size: ${(props) => props.theme.dark.textL};
    background-color: ${(props) => props.theme.dark.colorRED};
    color: ${(props) => props.theme.dark.colorWHITE};
    border-radius: ${(props) => props.theme.dark.radiusS};
    border: none;
    cursor: pointer;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 65px;

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

    @media (max-width: 425px) {
        width: 100%;
    }

    &.disabled {
        opacity: .5;
        cursor: default;

        &:hover {
            background-color: ${(props) => props.theme.dark.colorRED}
        }
    }
`