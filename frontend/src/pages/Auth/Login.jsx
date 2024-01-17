import React, { useState } from 'react'
import { InputContainer, InputField, InputLabel, } from '../Dashboard/NewForm.styles'
import { AuthContainer, AuthForm, AuthPage, GoogleLoginButton, RedirectLink } from './Auth.styled'
import {ReactComponent as Logo} from '../../images/groblje-horora-logo.svg'
import homeCoverImage from '../../images/groblje-horora-bg-image.jpg'
import {ReactComponent as GoogleIcon} from '../../images/googleicon.svg'
import { sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { useNavigate } from 'react-router-dom';
import { TextButton } from '../../components/buttons/Buttons.styled'
import HelmetSettings from '../../components/HelmetSettings'
import LoadingButton from '../../components/buttons/LoadingButton/LoadingButton'

function Login() {

    const navigate = useNavigate();

    const [loggingIn, setLoggingIn] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const [error, setError] = useState('')

    const [forgotPassword, setForgotPassword] = useState(false)

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault()
        console.log('Login Form Submitted')
        setLoggingIn(true)
        try {
            // Sign in with email and password using Firebase
            const user = await signInWithEmailAndPassword(auth, email, password)
            console.log('Firebase User Signed In', user.user);

            // Redirect to the previous page stored in local storage
            const backURL = localStorage.getItem('lastVisitedUrl');
            localStorage.removeItem('lastVisitedUrl');
            navigate(backURL)
            console.log('Login Successful, Navigating back to last visited URL')
            setLoggingIn(false)
        } catch (err) {
            console.log(err.message)
            setError('Neispravan email ili lozinka')
            setLoggingIn(false)
        }
    }

    const handleForgotPassword = async (e) => {
        e.preventDefault()
        setLoggingIn(true)
        try {
            const response = await fetch(`http://localhost:4000/api/users/${email}`)
            const json = await response.json()

            if (json === null) {
                setError('Email nije registriran')
                setLoggingIn(false)
                return
            }

            sendPasswordResetEmail(auth, email)
            setError(`Email za oporavak lozinke poslan na ${email}`)
            setLoggingIn(false)
            
        } catch (err) {
            console.log(err)
            setLoggingIn(false)
        }
    }

    const handleSwitch = (val) => {
        setForgotPassword(val)
        setError('')
        setPassword('')
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
                {!forgotPassword ? (
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
                            <LoadingButton type={loggingIn ? 'button' : 'submit'} title='Prijava' loading={loggingIn} minWidth='110px'/>
                        </AuthForm>
                        <p>OR</p>
                        <GoogleLoginButton type="button" disabled>
                            <GoogleIcon /> Sign in with Google
                        </GoogleLoginButton>
                        <p>Nemate korisnički račun? <RedirectLink to='/register'><span className='loginLink'>Registrirajte se</span></RedirectLink></p>
                        <TextButton onClick={() => handleSwitch(true)}>Zaboravili ste lozinku?</TextButton>
                    </AuthContainer>
                ) : (
                    <AuthContainer>
                        <h3>ZABORAVLJENA LOZINKA</h3>
                        <p className='error'>{error}</p>
                        <AuthForm onSubmit={handleForgotPassword}>
                            <InputContainer>
                                <InputLabel htmlFor='email'>Email</InputLabel>
                                <InputField id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </InputContainer>
                            <LoadingButton type={loggingIn ? 'button' : 'submit'} title='Pošalji' loading={loggingIn} minWidth='110px'/>
                        </AuthForm>
                        <TextButton onClick={() => handleSwitch(false)}>Povratak na prijavu</TextButton>
                    </AuthContainer>
                )}
            </AuthPage>
        </>
    )
}

export default Login
