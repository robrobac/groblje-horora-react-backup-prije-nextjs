import styled from "styled-components";

export const StyledPie = styled.svg`

    circle {
        transition: all 1s ease-in-out;
    }

    circle:first-of-type {
        stroke: ${(props) => props.theme.dark.colorWHITE05};
    }
    circle:last-of-type {
        stroke: ${(props) => props.$percentage === 0 ? props.theme.dark.colorWHITE05 : props.theme.dark.colorRED};
        
    }
    text {
        fill: ${(props) => props.theme.dark.colorWHITE80};
    }

`