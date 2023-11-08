import React from 'react'
import { PageContainer, PageSection } from '../Pages.styles'
import { HomeImage } from './Home.styles'
import homeCoverImage from '../../images/groblje-horora-main-image.jpg'
import LatestQuad from '../../components/LatestQuad'
import LatestSingle from '../../components/LatestSingle'
import CarouselItem from '../../components/carousel/CarouselItem'
import Carousel from '../../components/carousel/Carousel'

export default function Home() {
    return (
        <PageContainer>
                <HomeImage style={{backgroundImage: `url(${homeCoverImage})`}}>
                <h1 className='mainTitle'>Groblje Horora</h1>
                </HomeImage>
                <LatestSingle />
                <LatestQuad />
                <Carousel />
        </PageContainer>
        
        
    )
    }
