import React from 'react'
import HomeCoverImage from '../components/HomeCoverImage'
import LatestPregled from '../components/latest/LatestPregled'
import LatestRecenzija from '../components/latest/LatestRecenzija'
import Top25component from '../components/top25/Top25component'
import Top20smecaComponent from '../components/top25/Top20smecaComponent'
import RecenzijeHomeCover from '../components/recenzijeHomeCover/RecenzijeHomeCover'
import useCountReviews from '../hooks/useCountReviews'

export default function Home() {
    return (
        <main className='centerHorizontally'>
            <HomeCoverImage />
            <LatestPregled />
            <LatestRecenzija />
            <Top25component />
            <RecenzijeHomeCover />
            <Top20smecaComponent />
        </main>
    )
    }
