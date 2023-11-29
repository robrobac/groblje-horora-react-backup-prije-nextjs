import React, { useState } from 'react'
import { LogoContainer, MainHeader, MenuIcon, NavigationWrap } from './Header.styles';
import {ReactComponent as Logo} from '../../images/groblje-horora-logo.svg'
import {ReactComponent as MenuX} from '../../images/xicon.svg'
import {ReactComponent as Hamburger} from '../../images/menuicon.svg'
import DesktopNav from '../desktopNav/DesktopNav';
import MobileNav from '../mobileNav/MobileNav';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    return (
        <MainHeader>
            <NavigationWrap>
                <LogoContainer className='headerLink' to='/'>
                    <Logo />
                </LogoContainer>
                <DesktopNav menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
                <MobileNav menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
                {menuOpen ? (
                    <MenuIcon onClick={() => setMenuOpen(false)}>
                        <MenuX />
                    </MenuIcon>
                ) : (
                    <MenuIcon onClick={() => setMenuOpen(true)}>
                        <Hamburger />
                    </MenuIcon>
                )}
            </NavigationWrap>
        </MainHeader>
    )
}
