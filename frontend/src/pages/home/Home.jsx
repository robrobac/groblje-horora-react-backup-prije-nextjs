import React from 'react'
import LatestSingle from '../../components/LatestSingle'
import HomeCoverImage from '../../components/HomeCoverImage'
import LatestPregled from '../../components/latestPregled/LatestPregled'

export default function Home() {
    return (
        <main className='centerHorizontally'>
            <HomeCoverImage />
            <LatestPregled />
            <LatestSingle />
        </main>
    )
    }
