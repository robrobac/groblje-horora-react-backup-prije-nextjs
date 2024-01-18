import React from 'react'
import { Copyright, StyledFooter } from './Footer.styled'
import { getYear } from 'date-fns'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <StyledFooter>
            <Copyright>
                Copyright © 2023. - {getYear(new Date())}.
                <br></br>
                <Link target='_blank' to={`https://www.behance.net/robertov`}>Roberto Vukomanović</Link> & <Link target='_blank' to={`https://www.behance.net/tenavuksani`}>Tena Vuksanić</Link>
                <br></br>
                Sva prava pridržana    
            </Copyright>
        </StyledFooter>
    )
}
