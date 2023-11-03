import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styled from "styled-components";

// Pages
import Home from './pages/Home';
import Top25 from './pages/Top25';
import Reviews from './pages/Reviews';
import About from './pages/About';
import Worse20 from './pages/Worse20';
import SinglePost from './pages/SinglePost';

// Styled Components
import Theme from './Theme';

// Components

import Dashboard from './pages/Dashboard/Dashboard';
import Dashboard2 from './pages/Dashboard/Dashboard2';
import GlobalStyles from './Global.styles';
import Header from './components/header/Header';




function App() {
    return (
        <Theme>
            <GlobalStyles />

            <BrowserRouter>
                <AppPage>
                    <Header
                    />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/top25/' element={<Top25 />} />
                        <Route path='/recenzije/' element={<Reviews />} />
                        <Route path='/recenzije/:id/' element={<SinglePost />} />
                        <Route path='/top20smeca/' element={<Worse20 />} />
                        <Route path='/o-blogu/' element={<About />} />
                        <Route path='/dashboard/' element={<Dashboard />} />
                        <Route path='/dashboard2/' element={<Dashboard2 />} />
                    </Routes>
                </AppPage>
            </BrowserRouter>

        </Theme>
    );
}

export default App;

export const AppPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`