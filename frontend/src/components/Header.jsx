import React from 'react'
import { HeaderNavigation, MainHeader, NavigationWrap } from './Header.styles';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <MainHeader>
            <NavigationWrap>
                <HeaderNavigation>
                    <ul>
                        <Link className='headerLink' to='/'>LOGO</Link>
                        <Link className='headerLink' to='/'>Početna</Link>
                        <Link className='headerLink' to='/top25'>Top 25</Link>
                        <Link className='headerLink' to='/recenzije'>Recenzije</Link>
                        <Link className='headerLink' to='/top20smeca'>Top 20 Smeća</Link>
                        <Link className='headerLink' to='/o-blogu'>O Blogu</Link>
                        <Link className='headerLink' to='/dashboard'>ADMIN</Link>
                    </ul>
                    <ul>
                        <li>Login</li>
                    </ul>
                </HeaderNavigation>
            </NavigationWrap>
        </MainHeader>
    )
}
