import React from 'react'
import { InputContainer, InputField, InputLabel, } from '../Dashboard/NewForm.styles'
import { AuthContainer, AuthForm, AuthPage, GoogleLoginButton, RedirectLink } from './Auth.styled'
import {ReactComponent as Logo} from '../../images/groblje-horora-logo.svg'
import homeCoverImage from '../../images/groblje-horora-bg-image.jpg'
import {ReactComponent as GoogleIcon} from '../../images/googleicon.svg'

function Login() {

    return (
        <AuthPage style={{backgroundImage: `url(${homeCoverImage})`}}>
            <RedirectLink to='/'>
                <Logo />
            </RedirectLink>
            <AuthContainer>
                <h3>PRIJAVA</h3>
                <AuthForm>
                    <InputContainer>
                        <InputLabel htmlFor='email'>Email</InputLabel>
                        <InputField id='email' type='email'/>
                    </InputContainer>
                    <InputContainer>
                        <InputLabel htmlFor='password'>Password</InputLabel>
                        <InputField id='password' type='password'/>
                    </InputContainer>
                </AuthForm>
                <p>OR</p>
                <GoogleLoginButton type="button" >
                    <GoogleIcon /> Sign in with Google
                </GoogleLoginButton>
                <p>Don't have an account? <RedirectLink to='/register'><span className='loginLink'>Register</span></RedirectLink></p>
            </AuthContainer>
        </AuthPage>
    )
}

export default Login
