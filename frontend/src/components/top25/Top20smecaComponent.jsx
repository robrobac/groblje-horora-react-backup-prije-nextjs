import React from 'react'
import { TopContainer, TopDescription, TopImage, TopTitle } from './Top.styled'
import { Link } from 'react-router-dom'
import topImage from '../../images/groblje-horora-top20-smeca-image.webp'
import ButtonStandard from '../buttons/ButtonStandard'

export default function Top20smecaComponent() {

    
    return (
        <TopContainer $reverse={1}>
            <div className="topInfo">
                <Link to={`/top20smeca`} target='_blank'>
                    <TopTitle>Top 20 smeća</TopTitle>
                </Link>
                <TopDescription>
                    Filmovi na ovoj top listi su najveće smeće ikada. Linkove na recenzije možete pronaći na Top 20 smeća popisu.
                </TopDescription>
                <ButtonStandard path={`/top20smeca`} content='Pročitaj više' newTab={true}/>
            </div>
            <TopImage>
                <Link to={`/top20smeca`} style={{display: 'flex'}} target='_blank'>
                    <img src={topImage} alt='movie-cover'></img>
                </Link>
            </TopImage>
        </TopContainer>
    )
}
