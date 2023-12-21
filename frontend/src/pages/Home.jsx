import React from 'react'
import HomeCoverImage from '../components/HomeCoverImage'
import LatestPregled from '../components/latest/LatestPregled'
import LatestRecenzija from '../components/latest/LatestRecenzija'
import Top25component from '../components/top25/Top25component'
import Top20smecaComponent from '../components/top25/Top20smecaComponent'
import RecenzijeHomeCover from '../components/recenzijeHomeCover/RecenzijeHomeCover'
import HandleDocumentTitle from '../helpers/handleDocumentTitle'
import Loading from '../components/loading/Loading'

export default function Home() {
    HandleDocumentTitle('Naslovna - Groblje Horora')

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
