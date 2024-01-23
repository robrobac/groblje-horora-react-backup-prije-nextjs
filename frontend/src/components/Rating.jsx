import React from 'react'
import styled from "styled-components";
const images = require.context('../../public/images/rating/', true)

export default function Rating({rating, detailed}) {
    

    const formatRating = (number) => {
        const validRatings = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
    
        if (!validRatings.includes(number)) {
            return 'rating0';
        }
    
        return 'rating' + number.toString().replace('.', '');
    };

    const image = images(`./${formatRating(rating)}.png`)

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
        color: ${(props) => props.theme.dark.colorWHITE50};
    }
`
