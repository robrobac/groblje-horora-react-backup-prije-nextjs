import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'; // Import HelmetProvider
import styled from "styled-components";

// Pages
import Home from './pages/Home';
import Top25 from './pages/Top25';
import Reviews from './pages/reviews/Reviews';
import About from './pages/About/About';
import Worse20 from './pages/Worse20';
import SinglePost from './pages/SinglePost/SinglePost';

// Styled Components
import Theme from './Theme';

// Components

import GlobalStyles from './Global.styles';
import Header from './components/header/Header';
import NewForm from './pages/Dashboard/NewForm';
import EditForm from './pages/Dashboard/EditForm';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import useAuthCheck from './hooks/useAuthCheck';
import { createContext, useState } from 'react';
import VerifyEmail from './pages/Auth/VerifyEmail';
import Footer from './components/footer/Footer';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import BackToTopButton from './components/buttons/backToTopButton/BackToTopButton';
import ScrollAfterRouteChange from './components/scrollAfterRouteChange/ScrollAfterRouteChange';


export const AuthContext = createContext();
export const LoadingContext = createContext()


function App() {
    const { userData, firebaseUser, loadingUser } = useAuthCheck()
    // console.log('auth', useAuthCheck()) 
    const [loading, setLoading] = useState(true)
    const handleLoading = (loadingState) => {
        setLoading(loadingState)
    }

    return (
        <HelmetProvider>
            <Theme>
                <GlobalStyles />
                <BrowserRouter>
                    <AuthContext.Provider value={{ userData, firebaseUser }}>
                        <LoadingContext.Provider value={{ loading, handleLoading }}>
                            <AppPage>
                                <ScrollAfterRouteChange />
                                <Header />
                                {firebaseUser && !firebaseUser.emailVerified && <VerifyEmail />}
                                <Routes>
                                    <Route path='/' element={<Home />} />
                                    <Route path='/top25/' element={<Top25 />} />
                                    <Route path='/recenzije/' element={<Reviews />} />
                                    <Route path='/recenzije/:slug/' element={<SinglePost />} />

                                    <Route path='/top20smeca/' element={<Worse20 />} />
                                    <Route path='/o-blogu/' element={<About />} />

                                    <Route
                                        path='/recenzije/:slug/edit'
                                        element={
                                            loadingUser
                                                ? <div style={{ height: '100vh' }}></div>
                                                : userData?.role === "admin"
                                                    ? <EditForm />
                                                    : <Navigate to='/' />
                                        }
                                    />

                                    <Route
                                        path='/dashboard/nova-recenzija'
                                        element={
                                            loadingUser
                                                ? <div style={{ height: '100vh' }}></div>
                                                : userData?.role === "admin"
                                                    ? <NewForm numberOfMovies={1} />
                                                    : <Navigate to='/' />
                                        }
                                    />
                                    <Route
                                        path='/dashboard/novi-kratki-pregled'
                                        element={
                                            loadingUser
                                                ? <div style={{ height: '100vh' }}></div>
                                                : userData?.role === "admin"
                                                    ? <NewForm numberOfMovies={4} />
                                                    : <Navigate to='/' />
                                        }
                                    />

                                    <Route path='/login/' element={<Login />} />
                                    <Route path='/register/' element={<Register />} />

                                    <Route path="/*" element={<PageNotFound />} />
                                    <Route path='/recenzije/*/' element={<PageNotFound />} />
                                </Routes>
                                <BackToTopButton />
                                <Footer />
                            </AppPage>
                        </LoadingContext.Provider>
                    </AuthContext.Provider>
                </BrowserRouter>
            </Theme>
        </HelmetProvider>
    );
}

export default App;

export const AppPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`