import React from 'react'

import homeCoverImage from '../images/groblje-horora-main-image.jpg';
import { HomeIntroSection } from './Pages.styles';


export default function Home() {
  return (
        <HomeIntroSection>
            <img src={homeCoverImage} alt='cover'></img>
        </HomeIntroSection>
  )
}
