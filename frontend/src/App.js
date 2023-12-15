import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import styled from "styled-components";

// Pages
import Home from './pages/home/Home';
import Top25 from './pages/Top25';
import Reviews from './pages/reviews/Reviews';
import About from './pages/About';
import Worse20 from './pages/Worse20';
import SinglePost from './pages/SinglePost';

// Styled Components
import Theme from './Theme';

// Components

import GlobalStyles from './Global.styles';
import Header from './components/header/Header';
import Dashboard from './pages/Dashboard/Dashboard';
import NewForm from './pages/Dashboard/NewForm';
import EditForm from './pages/Dashboard/EditForm';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import useAuthCheck from './hooks/useAuthCheck';
import { createContext } from 'react';


export const AuthContext = createContext();


function App() {
    const isAuth = useAuthCheck()

    return (
        <Theme>
            <GlobalStyles />
            <BrowserRouter>
                <AuthContext.Provider value={{ isAuth }}>
                    <AppPage>
                        <Header />
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/top25/' element={<Top25 />} />
                            <Route path='/recenzije/' element={<Reviews />} />
                            <Route path='/recenzije/:id/' element={<SinglePost />} />

                            {/* Restricted */} <Route path='/recenzije/:id/edit' element={isAuth?.role === 'admin' ? <EditForm /> : <Navigate to='/' />} />


                            <Route path='/top20smeca/' element={<Worse20 />} />
                            <Route path='/o-blogu/' element={<About />} />

                            {/* Restricted */} <Route path='/dashboard/' element={isAuth?.role === 'admin' ? <Dashboard /> : <Navigate to='/' />} />
                            {/* Restricted */} <Route path='/dashboard/add-new' element={isAuth?.role === 'admin' ? <NewForm /> : <Navigate to='/' />} />
                            {/* Restricted */} <Route path='/dashboard/nova-recenzija' element={isAuth ? <NewForm numberOfMovies={1} /> : <Navigate to='/' />} />
                            {/* Restricted */} <Route path='/dashboard/novi-kratki-pregled' element={isAuth?.role === 'admin' ? <NewForm numberOfMovies={4} /> : <Navigate to='/' />} />

                            <Route path='/login/' element={<Login />} />
                            <Route path='/register/' element={<Register />} />
                        </Routes>
                    </AppPage>
                </AuthContext.Provider>
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