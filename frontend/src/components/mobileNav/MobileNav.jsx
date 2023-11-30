import React from 'react'
import { MobileNavItem, MobileNavigation } from './MobileNav.styled'
import { RedirectLink } from '../../pages/Auth/Auth.styled'

export default function MobileNav({menuOpen, setMenuOpen}) {
    return (
        <MobileNavigation className={menuOpen ? 'isOpen' : ''}>
                    <ul>
                        <MobileNavItem className='headerLink' to='/' onClick={() => setMenuOpen(false)}>Početna</MobileNavItem>
                        <MobileNavItem className='headerLink' to='/top25' onClick={() => setMenuOpen(false)}>Top 25</MobileNavItem>
                        <MobileNavItem className='headerLink' to='/recenzije' onClick={() => setMenuOpen(false)}>Recenzije</MobileNavItem>
                        <MobileNavItem className='headerLink' to='/top20smeca' onClick={() => setMenuOpen(false)}>Top 20 Smeća</MobileNavItem>
                        <MobileNavItem className='headerLink' to='/o-blogu' onClick={() => setMenuOpen(false)}>O Blogu</MobileNavItem>
                        <MobileNavItem className='headerLink' to='/dashboard' onClick={() => setMenuOpen(false)}>Dashboard</MobileNavItem>
                    </ul>
                    <ul>
                        <li><RedirectLink to='/login'>Login</RedirectLink> or <RedirectLink to='/register'>Register</RedirectLink></li>
                    </ul>
        </MobileNavigation>
    )
}
