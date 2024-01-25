import React, { useContext } from 'react'
import { MobileNavItem, MobileNavigation } from './MobileNav.styled'
import { LogoutLink, RedirectLink } from '../../pages/Auth/Auth.styled'
import { AuthContext } from '../../App'
import { handleLogout } from '../../hooks/useAuthCheck'


export default function MobileNav({menuOpen, setMenuOpen}) {
    const {userData} = useContext(AuthContext)
    

    const handleLastVisitedURL = () => {
        const relativePath = window.location.pathname + window.location.search;
        localStorage.setItem('lastVisitedUrl', relativePath);
        setMenuOpen(false)
    }

    return (
        <MobileNavigation className={menuOpen ? 'isOpen' : ''}>
                    <ul>
                        <MobileNavItem className='headerLink' to='/' onClick={() => setMenuOpen(false)}>Naslovna</MobileNavItem>
                        <MobileNavItem className='headerLink' to='/top25' onClick={() => setMenuOpen(false)}>Top 25</MobileNavItem>
                        <MobileNavItem className='headerLink' to='/recenzije?page=1&sort=createdAt&order=desc' onClick={() => setMenuOpen(false)}>Recenzije</MobileNavItem>
                        <MobileNavItem className='headerLink' to='/top20smeca' onClick={() => setMenuOpen(false)}>Top 20 Smeća</MobileNavItem>
                        <MobileNavItem className='headerLink' to='/o-blogu' onClick={() => setMenuOpen(false)}>O Blogu</MobileNavItem>
                        <br></br>
                        {userData?.role === 'admin' ? (
                            <MobileNavItem className='headerLink' to='/dashboard' onClick={() => setMenuOpen(false)}>Dashboard</MobileNavItem>
                        ) : ''}
                        
                    </ul>
                    <ul>
                        {userData ? (
                            <li>{userData.username}, <LogoutLink onClick={handleLogout}>Logout</LogoutLink></li>
                        ) : (
                            <li><RedirectLink to='/login' onClick={handleLastVisitedURL}>Login</RedirectLink> or <RedirectLink to='/register' onClick={handleLastVisitedURL}>Register</RedirectLink></li>
                        )}
                    </ul>
        </MobileNavigation>
    )
}
