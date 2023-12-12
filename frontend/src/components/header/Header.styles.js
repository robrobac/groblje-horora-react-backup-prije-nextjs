import styled from "styled-components";
import { NavLink } from 'react-router-dom';

export const MainHeader = styled.header`
    position: sticky;
    top: 0;
    background-color: ${(props) => props.theme.dark.colorBLACK};
    color: ${(props) => props.theme.dark.colorWHITE};
    padding: 10px 0;
    display: flex;
    justify-content: center;
    z-index: 100;
`

export const NavigationWrap = styled.div`
    padding: 0 ${(props) => props.theme.dark.contentPadding};
    width: ${(props) => props.theme.dark.contentWidth};
    display: flex;
    align-items: center;
    gap: 50px;

    @media (max-width: 1024px) {
        justify-content: space-between;
    }
`

export const LogoContainer = styled(NavLink)`
    z-index: 100;
    svg {
        fill: ${(props) => props.theme.dark.colorWHITE};
    }
`

export const MenuIcon = styled.div`
    z-index: 100;
    cursor: pointer;
    display: none;
    transition: ease-in 1s;
    @media (max-width: 1024px) {
        display: block;
    }
    svg>path {
        fill: ${(props) => props.theme.dark.colorWHITE};
    }
`