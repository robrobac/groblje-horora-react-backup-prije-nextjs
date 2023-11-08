import React from 'react'
import { CarouselItemContainer, CarouselItemDetails, CarouselItemImage } from './CarouselItem.styles'
import Rating from '../Rating'
import { ReadMoreButton } from '../Button.styles'

export default function CarouselItem() {
    return (
        <CarouselItemContainer>
            <CarouselItemImage>
                <img src='https://firebasestorage.googleapis.com/v0/b/groblje-horora-89186.appspot.com/o/coverImages%2FCetiri-cover-image?alt=media&token=52e892c3-77a6-4c54-ae82-50521952ce0e&_gl=1*1vbteic*_ga*MTg4ODI0NzA1NC4xNjkwMDUwOTk3*_ga_CW55HF8NVT*MTY5OTQyMzIwMy4yMTUuMS4xNjk5NDIzMjM0LjI5LjAuMA..' alt='movie-cover'></img>
            </CarouselItemImage>
            <CarouselItemDetails>
                <h3>a</h3>
                <Rating rating='2'/>
            </CarouselItemDetails>
            <ReadMoreButton>Pročitaj više</ReadMoreButton>
        
        </CarouselItemContainer>
    )
}