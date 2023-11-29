import styled from "styled-components";
import { NavLink } from 'react-router-dom';

export const MobileNavigation = styled.nav`
    background-color: ${(props) => props.theme.dark.background};
    position: fixed;
    top: 0;
    right: -100vw;
    opacity: .5;
    display: none;
    width: calc(100% + 1px);
    height: 100vh;
    gap: 20px;
    flex-direction: column;
    justify-content: start;
    padding-top: 120px;
    padding-right: 10px;
    transition: ease-in-out .2s;

    &.isOpen {
        right: -1px;
        opacity: .9;
        
    }

    @media (max-width: 1024px) {
        display: flex;
    }

    ul {
        display: flex;
        flex-direction: column;
        align-items: end;
        gap: 20px;
    }
`

export const MobileNavItem = styled(NavLink)`
    font-weight: 600;
    text-decoration: none;
    color: ${(props) => props.theme.dark.lightText};
    height: 30px;

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