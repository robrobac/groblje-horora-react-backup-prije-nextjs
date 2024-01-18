import styled from "styled-components";

export const StyledPagination = styled.div`
    display: flex;
    max-width: 425px;
    width: 100%;
    justify-content: space-between;
    padding: 0 ${(props) => props.theme.dark.contentPadding};
`

export const PaginationButton = styled.button`
    width: 48px;
    height: 48px;
    font-size: ${(props) => props.theme.dark.textL};
    background-color: transparent;
    color: ${(props) => props.theme.dark.colorWHITE};
    border-radius: ${(props) => props.theme.dark.radiusM};
    border: 1px solid ${(props) => props.theme.dark.colorWHITE50};
    cursor: pointer;

    @media (hover: hover) {
        &:hover {
            background-color: ${(props) => props.theme.dark.colorWHITE25};
        }
    }

    &.disabled {
        opacity: .3;
        cursor: default;

        &:hover {
            background-color: unset;
        }
    }
`

export const PageForm = styled.form`
    height: 48px;
    width: 140px;
    border: 1px solid ${(props) => props.theme.dark.colorWHITE15};
    border-radius: ${(props) => props.theme.dark.radiusM};
    
    display: flex;
    justify-content: center;
    align-items: center;

    p { 
        font-size: ${(props) => props.theme.dark.textL};
        color: ${(props) => props.theme.dark.colorWHITE80};
        
        
        &:last-child {
            width: 42%;
            margin: 0 8px;
            flex: 1;
        }
    }
`

export const PageInput = styled.input`
    width: 42%;
    -moz-appearance: textfield;
    border: unset;
    background-color: ${(props) => props.theme.dark.colorWHITE02};
    font-size: ${(props) => props.theme.dark.textL};
    font-weight: 800;
    color: ${(props) => props.theme.dark.colorWHITE80};
    text-align: right;
    border: unset;
    margin: 0 6px;
    padding: 3px 5px;
    border-radius: ${(props) => props.theme.dark.radiusS};
    

    &:focus {
        border: unset;
        outline: none;
    }

    &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`