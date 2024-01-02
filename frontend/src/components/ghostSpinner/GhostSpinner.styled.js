import styled from "styled-components";

export const SpinnerContainer = styled.div`
    animation: rotate-center 1s ease-in-out 0s infinite normal none;
    svg {
        height: 30px;
        width: 30px;
        path {
            fill: ${(props) => props.theme.dark.colorWHITE};
        }
    }

    @keyframes rotate-center {
        0% {
            transform:rotate(0);
        }
        100% {
            transform:rotate(360deg);
        }
    }
`