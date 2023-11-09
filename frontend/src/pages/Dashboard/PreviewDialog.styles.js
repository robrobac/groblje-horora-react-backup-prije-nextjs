import styled from "styled-components";

export const DialogContainer = styled.div`
    display: flex;
    justify-content: center;
`

export const PreviewDialogBox = styled.dialog`
    /* color: ${(props) => props.theme.dark.lightText}; */
    /* color: ${(props) => props.theme.dark.background}; */
    background-color: ${(props) => props.theme.dark.background};
    width: 100%;
    height: 100%;
    margin: auto;

    &::backdrop {
        background-color: ${(props) => props.theme.dark.background};
        opacity: 1;
    }
`