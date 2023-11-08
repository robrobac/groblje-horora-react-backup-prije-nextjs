import React from 'react'
import { CarouselContainer } from './Carousel.styles'
import CarouselItem from './CarouselItem'

export default function Carousel() {
    return (
        <CarouselContainer>
            <CarouselItem />
            <CarouselItem />
            <CarouselItem />
        </CarouselContainer>
    )
}
