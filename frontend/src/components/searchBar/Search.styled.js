import styled from "styled-components";

export const SearchComp = styled.div`
z-index: 90;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0 ${(props) => props.theme.dark.contentPadding};
    max-width: ${(props) => props.theme.dark.normalWidth};
    width: 100%;
`

export const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    
`
export const SearchIcon = styled.label`
    position: absolute;
    display: flex;
    padding: 10px;
    
    svg {
        fill: ${(props) => props.theme.dark.colorWHITE50};
    }
`
export const SearchBar = styled.input`
    border: 1px solid ${(props) => props.theme.dark.colorWHITE50};
    background-color: transparent;
    font-size: 1rem;
    color: ${(props) => props.theme.dark.colorWHITE};
    padding: 10px;
    padding-left: 40px;
    width: 100%;
    border-radius: ${(props) => props.theme.dark.radiusS};

    &:focus {
        border: 1px solid ${(props) => props.theme.dark.colorWHITE};
        outline: none;
    }

    &::placeholder {
        color: ${(props) => props.theme.dark.colorWHITE25};
    }
`

export const SearchControls = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 2rem;
`

export const SortControl = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-content: flex-start
`
export const FilterControl = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-content: flex-start
`

