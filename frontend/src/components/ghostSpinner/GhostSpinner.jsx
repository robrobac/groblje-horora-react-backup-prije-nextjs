import React from 'react'
import {ReactComponent as GhostSpinnerIcon} from '../../images/ghostspinner.svg'
import { SpinnerContainer } from './GhostSpinner.styled'

export default function GhostSpinner() {
    return (
        <SpinnerContainer>
            <GhostSpinnerIcon />
        </SpinnerContainer>
    )
}
