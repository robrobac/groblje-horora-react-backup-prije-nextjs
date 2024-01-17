import React from 'react'
import { StyledLoadingButton } from './LoadingButton.styled'
import GhostSpinner from '../../ghostSpinner/GhostSpinner'

export default function LoadingButton({type, title, loading, minWidth, disabled, customClass, onClick}) {
    return (
        <StyledLoadingButton
            style={{minWidth: minWidth}}
            type={type}
            className={customClass ? customClass : ''}
            disabled={disabled}
            onClick={onClick}
        >
            {loading ? <GhostSpinner /> : title}
        </StyledLoadingButton>
    )
}
