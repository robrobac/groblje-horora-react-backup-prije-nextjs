import styled from "styled-components";

export const CoverContainer = styled.div`
    width: ${(props) => props.theme.dark.contentWidth};
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);

`
export const CoverImage = styled.div`
    img {
        
        object-fit: cover;
        height: 100%;
        width: 100%;
    }

`