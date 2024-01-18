import styled from "styled-components";

export const StyledFooter = styled.footer`
    -webkit-box-shadow: 0px -5px 10px -3px rgba(0,0,0,0.5);
    -moz-box-shadow: 0px -5px 10px -3px rgba(0,0,0,0.5);
    box-shadow: 0px 5px -10px -3px rgba(0,0,0,0.5);

    background-color: ${(props) => props.theme.dark.colorBLACK};
    color: ${(props) => props.theme.dark.colorWHITE80};
    padding: 10px ${(props) => props.theme.dark.contentPadding};

    margin-top: 2rem;
`

export const Copyright = styled.p`
    text-align: center;
    font-size: ${(props) => props.theme.dark.textXS};
    line-height: 20px;
    color: ${(props) => props.theme.dark.colorWHITE50};


    a {
        color: ${(props) => props.theme.dark.colorWHITE80};
        text-decoration: underline;

        &:hover {
            color: ${(props) => props.theme.dark.colorRED};
        }
    }
`