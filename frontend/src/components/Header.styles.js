import styled from "styled-components";

export const MainHeader = styled.header`
    background-color: ${(props) => props.theme.dark.header};
    color: ${(props) => props.theme.dark.darkText};
    padding: 20px 0;
    font-weight: 600;
    display: flex;
    justify-content: center;

`

export const NavigationWrap = styled.div`
    width: 1200px;
`

export const HeaderNavigation = styled.nav`
    display: flex;
    justify-content: space-between;
    width: 100%;

    ul {
        display: flex;
        flex-direction: row;
        gap: 50px;

        .headerLink {
            text-decoration: none;
            color: ${(props) => props.theme.dark.darkText};
            &:hover {
                cursor: pointer;
                color: ${(props) => props.theme.dark.secondary};
            }
        }
    }
`