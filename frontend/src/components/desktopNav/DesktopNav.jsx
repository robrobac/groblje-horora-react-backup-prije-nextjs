import React, { useContext } from 'react'
import { DesktopNavItem, DesktopNavigation } from './DesktopNav.styled'
import { LogoutLink, RedirectLink } from '../../pages/Auth/Auth.styled'
import { AuthContext } from '../../App'
import { handleLogout } from '../../hooks/useAuthCheck'

export default function DesktopNav() {
    const {isAuth} = useContext(AuthContext)

    const handleLastVisitedURL = () => {
        const relativePath = window.location.pathname + window.location.search;
        localStorage.setItem('lastVisitedUrl', relativePath);
    }

    return (
        <DesktopNavigation>
                    <ul>
                        <DesktopNavItem className='headerLink' to='/'>Početna</DesktopNavItem>
                        <DesktopNavItem className='headerLink' to='/top25'>Top 25</DesktopNavItem>
                        <DesktopNavItem className='headerLink' to='/recenzije'>Recenzije</DesktopNavItem>
                        <DesktopNavItem className='headerLink' to='/top20smeca'>Top 20 Smeća</DesktopNavItem>
                        <DesktopNavItem className='headerLink' to='/o-blogu'>O Blogu</DesktopNavItem>
                        {isAuth?.role === 'admin' ? (
                            <DesktopNavItem className='headerLink' to='/dashboard'>Dashboard</DesktopNavItem>
                        ) : ''}
                    </ul>
                    <ul>
                        {isAuth ? (
                            <li>{isAuth.username}, <LogoutLink onClick={handleLogout}>Logout</LogoutLink></li>
                        ) : (
                            <li><RedirectLink to='/login' onClick={handleLastVisitedURL}>Login</RedirectLink> or <RedirectLink to='/register' onClick={handleLastVisitedURL}>Register</RedirectLink></li>
                        )}
                    </ul>
        </DesktopNavigation>
    )
}
