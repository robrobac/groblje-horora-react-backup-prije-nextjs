import styled from "styled-components";
import { Editor } from 'react-draft-wysiwyg';

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
`
export const FormImage = styled.div`
    cursor: pointer;
    width: 320px;
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
    display: flex; 
    flex-direction: column;
    
`
export const InputField = styled.input`
    padding: 10px 10px;
    border: 1px solid ${(props) => props.theme.dark.inputBorder};
    background-color: transparent;
    font-size: 1rem;
    color: white;

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

// CHECKBOX
export const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 10px;
`
export const Checkbox = styled.input`
    -webkit-appearance: none;
    appearance: none;
    color: red;
    width: 16px;
    height: 16px;
    padding: 10px;
    border: 1px solid black;
`
// TEXT EDITOR
export const StyledEditor = styled.div`
    .rdw-editor-wrapper {
        border: 1px solid ${(props) => props.theme.dark.inputBorder};
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
        padding: 10px 20px 5px 20px;
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