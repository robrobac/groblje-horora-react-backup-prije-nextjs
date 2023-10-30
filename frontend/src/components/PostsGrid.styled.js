import styled from "styled-components";

export const Grid = styled.div`
    max-width: 1200px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 575px));
    gap: 50px;
    justify-content: center;
`