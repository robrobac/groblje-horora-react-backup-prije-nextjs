import React, { useState } from 'react'
import { InputContainer, InputField, InputLabel, } from '../Dashboard/NewForm.styles'
import { AuthContainer, AuthForm, AuthPage, GoogleLoginButton, RedirectLink } from './Auth.styled'
import {ReactComponent as Logo} from '../../images/groblje-horora-logo.svg'
import homeCoverImage from '../../images/groblje-horora-bg-image.jpg'
import {ReactComponent as GoogleIcon} from '../../images/googleicon.svg'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { useNavigate } from 'react-router-dom';
import { StyledButton } from '../../components/buttons/Buttons.styled'
import HelmetSettings from '../../components/HelmetSettings'

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const [error, setError] = useState('')

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault()
        console.log('Login Form Submitted')

        try {
            // Sign in with email and password using Firebase
            const user = await signInWithEmailAndPassword(auth, email, password)
            console.log('Firebase User Signed In', user.user);

            if (!user.user.emailVerified) {
                await signOut(auth)
                alert('Potvrdite e-adresu i pokušajte ponovo');
                window.location.reload()
                return
            }

            // Redirect to the previous page stored in local storage
            const backURL = localStorage.getItem('lastVisitedUrl');
            localStorage.removeItem('lastVisitedUrl');
            navigate(backURL)
            console.log('Login Successful, Navigating back to last visited URL')
        } catch (err) {
            console.log(err.message)
            setError('Invalid email or password')
        }
    }

    return (

        <>
            <HelmetSettings
                title={`Prijava - Groblje Horora`}
                description={`
                    Prijava
                `}
                url={`https://www.groblje-horora.com/login`}
                image={`%PUBLIC_URL%/images/groblje-horora-og-image.webp`}
            />
            <AuthPage style={{backgroundImage: `url(${homeCoverImage})`}}>
                <RedirectLink to='/'>
                    <Logo />
                </RedirectLink>
                <AuthContainer>
                    <h3>PRIJAVA</h3>
                    <p className='error'>{error}</p>
                    <AuthForm onSubmit={handleLogin}>
                        <InputContainer>
                            <InputLabel htmlFor='email'>Email</InputLabel>
                            <InputField id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </InputContainer>
                        <InputContainer>
                            <InputLabel htmlFor='password'>Password</InputLabel>
                            <InputField id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </InputContainer>
                        <StyledButton type='submit'>Login</StyledButton>
                    </AuthForm>
                    <p>OR</p>
                    <GoogleLoginButton type="button" disabled>
                        <GoogleIcon /> Sign in with Google
                    </GoogleLoginButton>
                    <p>Don't have an account? <RedirectLink to='/register'><span className='loginLink'>Register</span></RedirectLink></p>
                </AuthContainer>
            </AuthPage>
        </>
    )
}

export default Login
