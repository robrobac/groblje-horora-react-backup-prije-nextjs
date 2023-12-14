import React from 'react'
import HomeCoverImage from '../../components/HomeCoverImage'
import LatestPregled from '../../components/latest/LatestPregled'
import LatestRecenzija from '../../components/latest/LatestRecenzija'

export default function Home() {
    return (
        <main className='centerHorizontally'>
            <HomeCoverImage />
            <LatestPregled />
            <LatestRecenzija />
        </main>
    )
    }
