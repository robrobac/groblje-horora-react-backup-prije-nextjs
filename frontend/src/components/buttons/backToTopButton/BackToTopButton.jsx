import React, { useState, useEffect } from 'react'
import scrollToTop from '../../../helpers/scrollToTop'
import { StyledBackToTopButton } from './BackToTopButton.styled'
import { ReactComponent as UpIcon } from '../../../images/up.svg'

export default function BackToTopButton() {
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 1000) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <>
            {showButton && (
                <StyledBackToTopButton onClick={scrollToTop}>
                    <UpIcon />
                </StyledBackToTopButton>
            )}
        </>
    )
}
