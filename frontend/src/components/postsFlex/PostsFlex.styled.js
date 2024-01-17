import styled from "styled-components";

export const PostsFlexContainer = styled.div`
    max-width: ${(props) => props.theme.dark.normalWidth};
    margin: 0 auto;
`
export const PostsFlexRow = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    width: ${(props) => props.theme.dark.normalWidth};
    row-gap: 50px;
    
    

    @media(max-width: ${(props) => props.theme.dark.normalWidth}) {
        width: 100%;
        max-width: ${(props) => props.theme.dark.normalWidth};
    }

    @media(max-width: 425px) {
        gap: 60px;
    }
`