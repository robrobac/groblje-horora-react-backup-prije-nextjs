import React from 'react'
import HandleDocumentTitle from '../../helpers/handleDocumentTitle'
import Pie from '../../components/pieAndCharts/Pie'
import useCountReviews from '../../hooks/useCountReviews'
import { AboutContainer, CounterContainer, CountersWrap, PieContainer, PieTitle, PiesWrap, Statistics } from './About.styled'
import Counter from '../../components/pieAndCharts/Counter'
import { useCountUp } from '../../hooks/useCountUp'


export default function About() {
    HandleDocumentTitle('O Blogu - Groblje Horora')


    const {
        count
    } = useCountReviews()


    console.log(count)
    return (
        <AboutContainer>
            <Statistics>
                
                <CountersWrap>
                    <CounterContainer>
                        <Counter duration={1000} targetNumber={count.numberOfMovies ? count.numberOfMovies : 0}/>
                        <br></br>
                        <span>HORORA</span> 
                    </CounterContainer>
                    <CounterContainer>
                        <Counter duration={1000} targetNumber={count.numberOfReviews ? count.numberOfReviews : 0}/>
                        <br></br>
                        <span>OBJAVA</span> 
                    </CounterContainer>
                </CountersWrap>
                <PiesWrap>
                    <PieContainer>
                        <Pie percentage={count.singleReviews} total={count.numberOfReviews}/>
                        <PieTitle>RECENZIJE</PieTitle>
                    </PieContainer>
                    <PieContainer>
                        <Pie percentage={count.quadReviews} total={count.numberOfReviews}/>
                        <PieTitle>KRATKI PREGLEDI</PieTitle>
                    </PieContainer>
                </PiesWrap>
            </Statistics>
        </AboutContainer>
    )
}
