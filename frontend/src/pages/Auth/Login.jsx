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
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const user = await signInWithEmailAndPassword(auth, email, password)
            console.log('user logged in: ', user.user)
            const backURL = localStorage.getItem('lastVisitedUrl');
            navigate(backURL)
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <AuthPage style={{backgroundImage: `url(${homeCoverImage})`}}>
            <RedirectLink to='/'>
                <Logo />
            </RedirectLink>
            <AuthContainer>
                <h3>PRIJAVA</h3>
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
