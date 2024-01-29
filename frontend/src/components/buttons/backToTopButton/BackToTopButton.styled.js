import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const StyledBackToTopButton = styled.button`
    position: fixed;
    bottom: 4rem;
    right: 4rem;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 48px;
    height: 48px;

    border-radius: 50%;
    border: 2px solid ${(props) => props.theme.dark.colorWHITE15};
    z-index: 1000;
    background-color: ${(props) => props.theme.dark.colorWHITE05};
    cursor: pointer;

    svg {
        fill: ${(props) => props.theme.dark.colorWHITE25};
        height: 30px;
        width: 30px;
    }

    @media (max-width: 768px) {
        bottom: 1.5rem;
        right: 1.5rem;
    }

    @media (max-width: 425px) {
        bottom: .5rem;
        right: .5rem;
    }

    @media (hover: hover) {
        &:hover {
            border-color: ${(props) => props.theme.dark.colorRED};

            svg {
                fill: ${(props) => props.theme.dark.colorRED};
            }
        }
    }

    animation: ${fadeIn} 0.5s ease-in;
`;


