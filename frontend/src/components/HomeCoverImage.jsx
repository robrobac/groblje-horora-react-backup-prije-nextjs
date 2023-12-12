import React from 'react'
import homeCoverImage from '../images/groblje-horora-home-page-cover.jpg'
import leftTree from '../images/groblje-horora-cover-left-tree.png'
import rightTree from '../images/groblje-horora-cover-right-tree.png'
import { CoverImage, CoverTrees } from './HomeCoverImage.styled'

export default function HomeCoverImage() {
    return (
        <CoverImage style={{backgroundImage: `url(${homeCoverImage})`}}>
            <CoverTrees>
                <img src={leftTree} alt='left-tree'/>
                <img src={rightTree} alt='right-tree'/>
            </CoverTrees>
        </CoverImage>
    )
}
