import styled from "styled-components";

export const StyledPie = styled.svg`

    circle:first-of-type {
        stroke: ${(props) => props.theme.dark.colorWHITE05};
    }
    circle:last-of-type {
        stroke: ${(props) => props.$percentage === 0 ? props.theme.dark.colorWHITE05 : props.theme.dark.colorRED};
        transition: all 0.7s ease-in-out;
    }
    text {
        fill: ${(props) => props.theme.dark.colorWHITE80};
    }

`