import React from 'react'
import { PageContainer } from '../Pages.styles'
import { HomeImage } from './Home.styles'
import homeCoverImage from '../../images/groblje-horora-main-image.jpg'
import LatestQuad from '../../components/LatestQuad'
import LatestSingle from '../../components/LatestSingle'

export default function Home() {
    return (
        <PageContainer>
                <HomeImage style={{backgroundImage: `url(${homeCoverImage})`}}>
                <h1 className='mainTitle'>Groblje Horora</h1>
                </HomeImage>
                <LatestQuad />
                <LatestSingle />
        </PageContainer>
    )
    }
