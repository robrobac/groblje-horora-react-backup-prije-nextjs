import styled from "styled-components";

export const ReadMoreButton = styled.button`
    width: 160px;
    font-size: 14px;
    padding: 20px 0;
    background-color: unset;
    border: 1px solid ${(props) => props.theme.dark.primary};
    color: ${(props) => props.theme.dark.primary};
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.dark.secondary};
        border: 1px solid ${(props) => props.theme.dark.secondary};
    }
`

export const ReadMoreButtonRed = styled(ReadMoreButton)`
    background-color: ${(props) => props.theme.dark.secondary};
    border: 1px solid ${(props) => props.theme.dark.secondary};

    &:hover {
        background-color: unset;
        border: 1px solid ${(props) => props.theme.dark.primary};
        color: ${(props) => props.theme.dark.primary};
    }
`

export const AuthButton = styled(ReadMoreButton)`
    width: 100%;
    padding: 10px 0;
    background-color: ${(props) => props.theme.dark.secondary};
    border: 1px solid ${(props) => props.theme.dark.secondary};

    &:hover {
        -webkit-box-shadow: 0px 0px 24px 1px rgba(0,0,0,0.5); 
        box-shadow: 0px 0px 15px 5px rgba(0,0,0,0.5);
    }

    &:disabled {
        opacity: .5;
        cursor: not-allowed;
        -webkit-box-shadow: none; 
        box-shadow: none;
    }
`