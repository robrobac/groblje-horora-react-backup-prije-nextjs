import React from 'react'
import Pie from '../../components/pieAndCharts/Pie'
import useCountReviews from '../../hooks/useCountReviews'
import { AboutContainer, AboutSection, CounterContainer, CounterSection, CountersWrap, PieContainer, PieSection} from './About.styled'
import Counter from '../../components/pieAndCharts/Counter'
import HelmetSettings from '../../components/HelmetSettings'


export default function About() {
    const {
        count
    } = useCountReviews()

    return (
        <>
            <HelmetSettings
                title={`O Blogu - Groblje Horora`}
                description={`
                    Opis bloga i njegovog sadrzaja
                `}
                url={`https://www.groblje-horora.com/o-blogu`}
                image={`%PUBLIC_URL%/images/groblje-horora-og-image.webp`}
            />
            <AboutContainer>
                <AboutSection>
                    <h1>O Blogu</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Habitant morbi tristique senectus et. Eu facilisis sed odio morbi quis commodo odio. Eget duis at tellus at. Maecenas pharetra convallis posuere morbi leo urna molestie at elementum. Amet dictum sit amet justo donec.
                        <br></br><br></br>
                        Volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris. Libero nunc consequat interdum varius sit amet mattis vulputate. Nec dui nunc mattis enim ut. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Feugiat vivamus at augue eget. Augue interdum velit euismod in pellentesque massa placerat.
                    </p>
                </AboutSection>
                <CounterSection>
                    <CountersWrap>
                        <CounterContainer>
                            <Counter duration={1000} targetNumber={count.numberOfMovies}/>
                            <br></br>
                            <span>HORORA</span> 
                        </CounterContainer>
                        <CounterContainer>
                            <Counter duration={1000} targetNumber={count.numberOfReviews}/>
                            <br></br>
                            <span>OBJAVA</span> 
                        </CounterContainer>
                    </CountersWrap>
                </CounterSection>
                <PieSection>
                    <div>
                        <h2>Kratki Pregledi</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Habitant morbi tristique senectus et. Eu facilisis sed odio morbi quis commodo odio. Eget duis at tellus at. Maecenas pharetra convallis posuere morbi leo urna molestie at elementum. Amet dictum sit amet justo donec.
                        </p>
                    </div>
                    <PieContainer>
                        <Pie percentage={count.quadReviews} total={count.numberOfReviews}/>
                    </PieContainer>
                </PieSection>
                <PieSection>
                    <div>
                        <h2>Recenzije</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Habitant morbi tristique senectus et. Eu facilisis sed odio morbi quis commodo odio. Eget duis at tellus at. Maecenas pharetra convallis posuere morbi leo urna molestie at elementum. Amet dictum sit amet justo donec.
                        </p>
                    </div>
                    <PieContainer>
                        <Pie percentage={count.singleReviews} total={count.numberOfReviews}/>
                    </PieContainer>
                </PieSection>
            </AboutContainer>
        </>
    )
}
