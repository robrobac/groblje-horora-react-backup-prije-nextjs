import styled from "styled-components";

export const Tabs = styled.div`

`

export const TabList = styled.div`
    display: flex;
    text-align: center;
`

export const Tab = styled.div`
cursor: pointer;
    flex: 1;
    color: ${props => (props.$isActive ? props.theme.dark.lightText : props.theme.dark.grayText)};
`

export const TabPanel = styled.div`
    display: ${props => (props.$isActive ? 'block' : 'none')};
`

export const FormContainer = styled.div`
    max-width: ${(props) => props.theme.dark.readingWidth};
    display: flex;
    flex-wrap: wrap;

    .dualInput {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
`
export const StyledForm = styled.form`
    width: ${(props) => props.theme.dark.readingWidth};
`

export const TextEditorContainer = styled.div`
    max-width: ${(props) => props.theme.dark.readingWidth};
`
// IMAGE UPLOAD
export const File = styled.input`
    opacity: 0;
    position: absolute;
    z-index: -1;
`
export const FileLabel = styled.label`
    border: 1px solid ${(props) => props.theme.dark.inputBorder};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 320px;
    height: 460px;

    &.error {
        border: 1px solid red;
    }
`
export const FormImage = styled.div`
    cursor: pointer;
    width: 322px;
    height: 460px;
    img {
        width: 100%;
        height: 460px;
        object-fit: cover;
    }
`

// FORM STYLES
export const FormContent = styled.div`
    flex: 1;
`
export const InputContainer = styled.div`
width: 100%;
    display: flex; 
    flex-direction: column;
    
`
export const InputField = styled.input`
    padding: 10px 10px;
    border: 1px solid ${(props) => props.theme.dark.inputBorder};
    background-color: transparent;
    font-size: 1rem;
    color: white;

    &.error {
        border: 1px solid red;
    }

    &:focus {
        border: 1px solid ${(props) => props.theme.dark.primary};
        outline: none;
    }

    &::placeholder {
        color: ${(props) => props.theme.dark.inputBorder};
    }
`
export const InputLabel = styled.label`
    padding-left: 10px;
    font-size: .9rem;
    font-weight: 600;
`

// TEXT EDITOR
export const StyledEditor = styled.div`

    .rdw-editor-wrapper {
        border: 1px solid ${(props) => props.theme.dark.inputBorder};
    }
    .error {
        border: 1px solid red;
    }
    .rdw-editor-main {
        overflow: auto;
        min-height: 200px;
        padding: 0 20px;
    }
    .rdw-editor-toolbar {
        background-color: ${(props) => props.theme.dark.background};
        border: none;
        border-bottom: 1px solid ${(props) => props.theme.dark.inputBorder};
        border-top: 1px solid ${(props) => props.theme.dark.inputBorder};
        padding: 10px 20px 5px 20px;
        position: sticky;
        top: 87px;
        background-color: ${(props) => props.theme.dark.background};
        z-index: 80;
    }
    .rdw-image-modal, .rdw-link-modal {
        background-color: ${(props) => props.theme.dark.background};
        box-shadow: none;
        border: 1px solid ${(props) => props.theme.dark.inputBorder};
        height: unset;
    }
    .rdw-image-modal-header {
        display: none;
    }
    .rdw-image-mandatory-sign {
        display: none;
    }
    .rdw-image-modal-url-input {
        width: 100%;
        margin: 0;
    }
    .rdw-image-modal-size {
        display: none;
    }
`