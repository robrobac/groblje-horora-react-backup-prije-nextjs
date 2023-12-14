import React from 'react'
import { TopContainer, TopDescription, TopImage, TopTitle } from './Top.styled'
import { Link } from 'react-router-dom'
import topImage from '../../images/groblje-horora-top25-image.jpg'
import ButtonStandard from '../buttons/ButtonStandard'

export default function Top25component() {

    
    return (
        <TopContainer>
            <TopImage>
                <Link to={`/top25`}>
                    <img src={topImage} alt='movie-cover'></img>
                </Link>
            </TopImage>
            <div className="topInfo">
                <Link to={`/top25`}>
                    <TopTitle>Top 25 preporuka</TopTitle>
                </Link>
                <TopDescription>
                    Filmovi na ovoj top listi mijenjaju se kako dođe neki novi naslov na blogu koji zaslužuje jednaku pažnju ili ocjenu. Linkove na recenzije možete pronaći na Top 25 popisu.
                </TopDescription>
                <ButtonStandard path={`/top25`} />
            </div>
        </TopContainer>
    )
}
