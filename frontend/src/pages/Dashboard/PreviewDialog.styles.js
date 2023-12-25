import styled from "styled-components";

export const DialogContainer = styled.div`
    display: flex;
    justify-content: center;
`

export const PreviewDialogBox = styled.dialog`
    background-color: ${(props) => props.theme.dark.colorBLACK};
    width: 100%;
    height: 100%;
    margin: auto;
    padding: 2rem 0;
    -webkit-box-shadow: 0px 0px 21px 1px #000000; 
    box-shadow: 0px 0px 21px 1px #000000;
    border: none;
    border-radius: ${(props) => props.theme.dark.radiusL};

    &::backdrop {
        background-color: ${(props) => props.theme.dark.colorBLACK};
        opacity: 1;
    }

    .submitBtnContainer {
        display: flex;
        justify-content: center;
        margin-top: 2rem;
        max-width: 700px;
    }
`

export const CloseIcon = styled.div`
    position: fixed;
    top: 30px;
    right: 30px;
    fill: ${(props) => props.theme.dark.colorWHITE};
    background-color: ${(props) => props.theme.dark.colorBLACK};
    border-radius: ${(props) => props.theme.dark.radiusM};
    cursor: pointer;

    @media (hover: hover) {
        &:hover {
            fill: ${(props) => props.theme.dark.colorRED};
        }
    }
`