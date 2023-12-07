import React, { useState } from 'react'
import { InputContainer, InputField, InputLabel, } from '../Dashboard/NewForm.styles'
import { AuthContainer, AuthForm, AuthPage, GoogleLoginButton, RedirectLink } from './Auth.styled'
import {ReactComponent as Logo} from '../../images/groblje-horora-logo.svg'
import homeCoverImage from '../../images/groblje-horora-bg-image.jpg'
import {ReactComponent as GoogleIcon} from '../../images/googleicon.svg'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { AuthButton } from '../../components/Button.styles'
import { useNavigate } from 'react-router-dom';

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
                    <AuthButton type='submit'>Login</AuthButton>
                </AuthForm>
                <p>OR</p>
                <GoogleLoginButton type="button" disabled>
                    <GoogleIcon /> Sign in with Google
                </GoogleLoginButton>
                <p>Don't have an account? <RedirectLink to='/register'><span className='loginLink'>Register</span></RedirectLink></p>
            </AuthContainer>
        </AuthPage>
    )
}

export default Login
