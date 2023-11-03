import React from 'react'
import { HeaderNavigation, MainHeader, NavItem, NavigationWrap } from './Header.styles';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <MainHeader>
            <NavigationWrap>
                <HeaderNavigation>
                    <ul>
                        <NavItem className='headerLink' to='/'>LOGO</NavItem>
                        <NavItem className='headerLink' to='/'>Početna</NavItem>
                        <NavItem className='headerLink' to='/top25'>Top 25</NavItem>
                        <NavItem className='headerLink' to='/recenzije'>Recenzije</NavItem>
                        <NavItem className='headerLink' to='/top20smeca'>Top 20 Smeća</NavItem>
                        <NavItem className='headerLink' to='/o-blogu'>O Blogu</NavItem>
                        <NavItem className='headerLink' to='/dashboard'>ADMIN</NavItem>
                    </ul>
                    <ul>
                        <li>Login</li>
                    </ul>
                </HeaderNavigation>
            </NavigationWrap>
        </MainHeader>
    )
}
