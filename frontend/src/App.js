import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages
import Home from './pages/Home';
import Top25 from './pages/Top25';
import Reviews from './pages/Reviews';
import Top20smeca from './pages/Top20smeca';
import About from './pages/About';

import RecenzijaSingle from './pages/RecenzijaSingle';

// Styled Components
import Theme from './Theme';
import { AppContainer, AppPage } from './App.styles';

// Components
import Header from './components/Header';


function App() {
    return (
        <Theme>
            <AppContainer>
                <BrowserRouter>
                    <AppPage>
                        <Header />
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/top25/' element={<Top25 />} />
                            <Route path='/recenzije/' element={<Reviews />} />
                            <Route path='/recenzije/:id/' element={<RecenzijaSingle />} />
                            <Route path='/top20smeca/' element={<Top20smeca />} />
                            <Route path='/o-blogu/' element={<About />} />
                        </Routes>
                    </AppPage>
                </BrowserRouter>
            </AppContainer>
        </Theme>
    );
}

export default App;
