import React from 'react'
import { RecenzijeHomeCoverContainer } from './RecenzijeHomeCover.styled'
import recenzijeHomeCoverImage from '../../images/groblje-horora-recenzije-home-image.webp'
import ButtonStandard from '../buttons/ButtonStandard'
import useCountReviews from '../../hooks/useCountReviews'
import { Link } from 'react-router-dom'

export default function RecenzijeHomeCover() {
    const {
        count
    } = useCountReviews()

    return (
        <RecenzijeHomeCoverContainer >
            <img className='coverImage' src={recenzijeHomeCoverImage} alt='movie-cover'></img>
            <div className="coverContent">
                <Link to={`/recenzije?page=1&sort=createdAt&order=desc`} target='_blank'>
                    <h2>Recenzije</h2>
                </Link>
                <ButtonStandard type='right' path={`/recenzije?page=1&sort=createdAt&order=desc`} content='Pogledaj sve' span={`(${count?.numberOfMovies})`} newTab={true}/>
            </div>
        </RecenzijeHomeCoverContainer>
    )
}
