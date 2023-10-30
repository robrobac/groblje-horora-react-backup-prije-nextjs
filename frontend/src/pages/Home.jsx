import React from 'react'

import homeCoverImage from '../images/groblje-horora-main-image.jpg';
import { ContentSection, CoverSection, HomeIntroSection, LatestSection, Section1280, SectionFullWidth } from './Home.styles';


export default function Home() {
  return (
        <HomeIntroSection>
            <img src={homeCoverImage} alt='cover'></img>
        </HomeIntroSection>
  )
}
