import styled from "styled-components";
import { NavLink } from 'react-router-dom';

export const DesktopNavigation = styled.nav`
    width: 100%;
    display: flex;
    justify-content: space-between;

    @media (max-width: 1024px) {
        display: none;
    }

    ul {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 50px;
    }
    ul:last-of-type {
        color: ${(props) => props.theme.dark.colorRED};
    }
`

export const DesktopNavItem = styled(NavLink)`
    font-weight: 600;
    text-decoration: none;
    color: ${(props) => props.theme.dark.colorWHITE};
    height: 30px;
    transition: .1s;

    &.active {
        color: ${(props) => props.theme.dark.colorRED};
        border-bottom: 2px solid ${(props) => props.theme.dark.colorRED};
        transition: .1s;
    }

    &:hover {
        cursor: pointer;
        color: ${(props) => props.theme.dark.colorRED};
        /* border-bottom: 2px solid ${(props) => props.theme.dark.colorRED}; */
    }
`