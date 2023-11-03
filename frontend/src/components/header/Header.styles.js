import styled from "styled-components";
import { NavLink } from 'react-router-dom';

export const MainHeader = styled.header`
    background-color: ${(props) => props.theme.dark.background};
    color: ${(props) => props.theme.dark.lightText};
    padding: 20px 0;
    
    display: flex;
    justify-content: center;
`

export const NavigationWrap = styled.div`
    width: ${(props) => props.theme.dark.contentWidth};
`

export const HeaderNavigation = styled.nav`
    width: 100%;

    display: flex;
    justify-content: space-between;

    ul {
        display: flex;
        flex-direction: row;
        gap: 50px;
    }
`

export const NavItem = styled(NavLink)`
    font-weight: 600;
    text-decoration: none;
    color: ${(props) => props.theme.dark.lightText};

    &.active {
        color: ${(props) => props.theme.dark.primary};
        border-bottom: 2px solid ${(props) => props.theme.dark.primary};
    }

    &:hover {
        cursor: pointer;
        color: ${(props) => props.theme.dark.primary};
        border-bottom: 2px solid ${(props) => props.theme.dark.primary};
    }
`