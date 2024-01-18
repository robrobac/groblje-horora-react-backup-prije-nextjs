import React from 'react'
import { PageNotFoundBox, PageNotFoundContainer, PageNotFoundContent } from './PageNotFound.styled'
import Loading from '../../components/loading/Loading'
import { TextButton } from '../../components/buttons/Buttons.styled'

export default function PageNotFound() {

    
    return (
        <>
        <PageNotFoundBox>
            
        </PageNotFoundBox>
        <PageNotFoundContent>
            <h5>
                4 0 4
                <br></br>
                <span>page not found</span>
                <br></br>
                <span><a href="/">POVRATAK NA NASLOVNU</a></span>
            </h5>
        </PageNotFoundContent>
        </>
        
    )
}
