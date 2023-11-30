import React from 'react'
import { DesktopNavItem, DesktopNavigation } from './DesktopNav.styled'
import { RedirectLink } from '../../pages/Auth/Auth.styled'

export default function DesktopNav() {
    return (
        <DesktopNavigation>
                    <ul>
                        <DesktopNavItem className='headerLink' to='/'>Početna</DesktopNavItem>
                        <DesktopNavItem className='headerLink' to='/top25'>Top 25</DesktopNavItem>
                        <DesktopNavItem className='headerLink' to='/recenzije'>Recenzije</DesktopNavItem>
                        <DesktopNavItem className='headerLink' to='/top20smeca'>Top 20 Smeća</DesktopNavItem>
                        <DesktopNavItem className='headerLink' to='/o-blogu'>O Blogu</DesktopNavItem>
                        <DesktopNavItem className='headerLink' to='/dashboard'>Dashboard</DesktopNavItem>
                    </ul>
                    <ul>
                        <li><RedirectLink to='/login'>Login</RedirectLink> or <RedirectLink to='/register'>Register</RedirectLink></li>
                    </ul>
        </DesktopNavigation>
    )
}
