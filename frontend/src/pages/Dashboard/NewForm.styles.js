import styled from "styled-components";

export const Tabs = styled.div`

`

export const TabList = styled.div`
    display: flex;
    text-align: center;
`

export const Tab = styled.div`
    cursor: pointer;
    padding: 10px 0;
    border-radius: ${(props) => props.theme.dark.radiusS} ${(props) => props.theme.dark.radiusS} 0 0;
    flex: 1;
    color: ${props => (props.$isActive ? props.theme.dark.colorWHITE80 : props.theme.dark.colorWHITE25)};
    background-color: ${props => (props.$isActive ? props.theme.dark.commentsBG : props.theme.dark.colorBLACK)};
    margin-top: 1rem;

    &:hover {
        background-color: ${(props) => props.theme.dark.commentsBG};
    }
`

export const TabPanel = styled.div`
    display: ${props => (props.$isActive ? 'block' : 'none')};
    padding: ${(props) => props.theme.dark.contentPadding};
    background-color: ${(props) => props.theme.dark.commentsBG};
    border-radius: 0 0 ${(props) => props.theme.dark.radiusM} ${(props) => props.theme.dark.radiusM};
    margin-bottom: 2rem;

    h3 {
        color: ${(props) => props.theme.dark.colorWHITE80};
        font-size: ${(props) => props.theme.dark.textM};
        span {
            font-size: ${(props) => props.theme.dark.textS};
            color: ${(props) => props.theme.dark.colorWHITE50};
        }
    }
`

export const FormContainer = styled.div`
    max-width: ${(props) => props.theme.dark.readingWidth};
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 1rem;

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
    border-radius: ${(props) => props.theme.dark.radiusM};
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
    border-radius: ${(props) => props.theme.dark.borderM};
    img {
        width: 100%;
        height: 460px;
        object-fit: cover;
        border-radius: ${(props) => props.theme.dark.radiusM};
    }
`

// FORM STYLES
export const FormContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
export const InputContainer = styled.div`
    width: 100%;
    display: flex; 
    flex-direction: column;
`
export const InputField = styled.input`
    padding: 10px 10px;
    border: 1px solid ${(props) => props.theme.dark.colorWHITE15};
    border-radius: ${(props) => props.theme.dark.radiusS};
    background-color: transparent;
    font-size: ${(props) => props.theme.dark.textM};
    color: ${(props) => props.theme.dark.colorWHITE80};

    &.error {
        border: 1px solid red;
    }

    &:focus {
        border: 1px solid ${(props) => props.theme.dark.colorWHITE50};
        outline: none;
    }

    &::placeholder {
        color: ${(props) => props.theme.dark.colorWHITE15};
    }
`
export const InputLabel = styled.label`
    color: ${(props) => props.theme.dark.colorWHITE80};
    padding-left: 10px;
    font-size: .9rem;
    font-weight: 600;

    span.error {
        color: red;
    }
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
        top: 85px;
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