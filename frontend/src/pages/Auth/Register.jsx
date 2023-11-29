import React from 'react'
import { InputContainer, InputField, InputLabel } from '../Dashboard/NewForm.styles'
import { AuthContainer, AuthForm, AuthPage, GoogleLoginButton, RedirectLink } from './Auth.styled'
import {ReactComponent as Logo} from '../../images/groblje-horora-logo.svg'
import homeCoverImage from '../../images/groblje-horora-bg-image.jpg'
import {ReactComponent as GoogleIcon} from '../../images/googleicon.svg'

export default function Register() {

    return (
        <AuthPage style={{backgroundImage: `url(${homeCoverImage})`}}>
            <RedirectLink to='/'>
                <Logo />
            </RedirectLink>
            <AuthContainer>
                <h3>REGISTRACIJA</h3>
                <AuthForm>
                    <InputContainer>
                        <InputLabel htmlFor='username'>Username</InputLabel>
                        <InputField id='username' type='email'/>
                    </InputContainer>
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
                <p>Already have an account? <RedirectLink to='/login'><span className='loginLink'>Login</span></RedirectLink></p>
            </AuthContainer>
        </AuthPage>
    )
}
