import styled from "styled-components";

export const AppContainer = styled.div`
    
    margin: 0 auto;
    background-color: ${(props) => props.theme.dark.background};
    color: ${(props) => props.theme.dark.primary};
`
export const AppPage = styled.main`
    display: flex;
    flex-direction: column;
    width: 100%;
`