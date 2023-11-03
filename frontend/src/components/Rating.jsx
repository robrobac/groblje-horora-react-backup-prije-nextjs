import React from 'react'
import styled from "styled-components";
const images = require.context('../../public/images/rating/', true)

export default function Rating({rating, detailed}) {
    

    const formatRating = (number) => {
        if (typeof number !== 'number') {
            return 'rating0'
        }

        if (number === 5) {
            return 'rating5';
        }

        const numberString = number.toString();
        const replaced = numberString.replace('.', '')
        return "rating" + replaced
    }

    const image = images(`./${formatRating(rating)}.png`)
    console.log(image)
    console.log(`./${formatRating(rating)}.png`)

    return (
        <RatingContainer>
            <img src={image} alt={`rating: ${rating}/5`}/>
            {detailed ? <span>{rating} / 5</span> : ''}
            
        </RatingContainer>
    )
}

const RatingContainer = styled.div`
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 10px;

    span {
        font-size: 14px;
        opacity: .5;
    }
`
