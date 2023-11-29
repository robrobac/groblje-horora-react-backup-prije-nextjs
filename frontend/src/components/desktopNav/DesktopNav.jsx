import React from 'react'
import { DesktopNavItem, DesktopNavigation } from './DesktopNav.styled'

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
                        <li>Login or Register</li>
                    </ul>
        </DesktopNavigation>
    )
}
