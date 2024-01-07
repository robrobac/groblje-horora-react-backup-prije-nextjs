import React from 'react'
import { LoaderContainer } from './Loading.styled'
// import './loadingEffect.css'

export default function Loading({variant, mainText, altText}) {
    return (
        <LoaderContainer $variant={`${variant}`}>
            <h5>{mainText ? mainText : "Loading"}<br></br><span>{altText ? altText : "please wait"}</span></h5>
        </LoaderContainer>
    )
}
