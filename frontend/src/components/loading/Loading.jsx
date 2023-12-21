import React from 'react'
import { LoaderContainer } from './Loading.styled'
// import './loadingEffect.css'

export default function Loading({variant}) {
    return (
        <LoaderContainer $variant={`${variant}`}>
            <h1>Loading<br></br><span>Please Wait</span></h1>
        </LoaderContainer>
    )
}
