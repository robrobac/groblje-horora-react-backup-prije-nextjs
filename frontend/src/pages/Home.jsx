import React from 'react'
import HomeCoverImage from '../components/HomeCoverImage'
import LatestPregled from '../components/latest/LatestPregled'
import LatestRecenzija from '../components/latest/LatestRecenzija'
import Top25component from '../components/top25/Top25component'
import Top20smecaComponent from '../components/top25/Top20smecaComponent'
import RecenzijeHomeCover from '../components/recenzijeHomeCover/RecenzijeHomeCover'
import Introduction from '../components/introduction/Introduction'
import HelmetSettings from '../components/HelmetSettings'

export default function Home() {

        return (
            <>
                <HelmetSettings
                    title={`Naslovna - Groblje Horora`}
                    description={`
                        Blog ''Groblje horrora'' napravljen je negdje u lipnju 2007. godine, a njegova namjena je prikaz dnevnika autora koji kako pogleda neki horror, tako baci omanji osvrt ili recenziju na određeni film. Moje ime je Bruno Koić i po struci sam magistar medijske kulture i kulturologije. Nadam se da će ti se svidjeti koncept onoga što radim i tebi prikazujem, hvala ti na posjeti!
                    `}
                    url={`https://www.groblje-horora.com/`}
                    image={`%PUBLIC_URL%/images/groblje-horora-og-image.webp`}
                />
                <main className='centerHorizontally'>
                    <HomeCoverImage />
                    <Introduction />
                    <LatestPregled />
                    <LatestRecenzija />
                    <Top25component />
                    <RecenzijeHomeCover />
                    <Top20smecaComponent />
                </main>
            </>
        )
    }
