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
import Dashboard from './pages/Dashboard/Dashboard';
import Dashboard2 from './pages/Dashboard/Dashboard2';


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
                            <Route path='/dashboard/' element={<Dashboard />} />
                            <Route path='/dashboard2/' element={<Dashboard2 />} />
                        </Routes>
                    </AppPage>
                </BrowserRouter>
            </AppContainer>
        </Theme>
    );
}

export default App;
