import React from 'react'
import { IntroductionContainer, MainTitle } from './Introduction.styled'

export default function Introduction() {
    return (
        <IntroductionContainer>
            <MainTitle>Groblje Horora</MainTitle>
            <p>
                Blog ''<strong>Groblje horrora</strong>'' napravljen je negdje u lipnju 2007. godine, a njegova namjena je prikaz dnevnika autora koji kako pogleda neki horror, tako baci omanji osvrt ili recenziju na određeni film. Moje ime je <strong>Bruno Koić</strong> i po struci sam magistar medijske kulture i kulturologije. Nadam se da će ti se svidjeti koncept onoga što radim i tebi prikazujem, hvala ti na posjeti!
            </p>
        </IntroductionContainer>
    )
}
