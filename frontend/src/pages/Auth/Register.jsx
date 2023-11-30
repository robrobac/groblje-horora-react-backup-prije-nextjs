import React, { useState } from 'react'
import { InputContainer, InputField, InputLabel } from '../Dashboard/NewForm.styles'
import { AuthContainer, AuthForm, AuthPage, GoogleLoginButton, RedirectLink } from './Auth.styled'
import {ReactComponent as Logo} from '../../images/groblje-horora-logo.svg'
import homeCoverImage from '../../images/groblje-horora-bg-image.jpg'
import {ReactComponent as GoogleIcon} from '../../images/googleicon.svg'
import { AuthButton } from '../../components/Button.styles'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth"
import { auth } from '../../firebase/config'

export default function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault();
    
        try {
            // Validate user on the server
            const validation = await fetch('http://localhost:4000/api/validateNewUser', {
                method: 'POST',
                body: JSON.stringify({ username, email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            const validationJson = await validation.json();
    
            if (!validation.ok) {
                console.log(validationJson);
                return;
            }
    
            console.log('Validation success');
    
            // Create user in Firebase
            const user = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(user.user, {
                displayName: username
            });
    
            console.log('Firebase user created:', user.user);
    
            // Prepare user data for MongoDB
            const userData = {
                username: user.user.displayName,
                email: user.user.email,
                role: 'user',
            };
    
            // Send user data to MongoDB
            const response = await fetch('http://localhost:4000/api/users', {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            const json = await response.json();
    
            if (!response.ok) {
                console.log(json);
                return;
            }
    
            console.log('User added to MongoDB:', json);
            // Handle success, e.g., redirect to a success page
        } catch (err) {
            console.log(err);
            // Handle other errors, e.g., show a generic error message to the user
        }
    };

    return (
        <AuthPage style={{backgroundImage: `url(${homeCoverImage})`}}>
            <RedirectLink to='/'>
                <Logo />
            </RedirectLink>
            <AuthContainer>
                <h3>REGISTRACIJA</h3>
                <AuthForm onSubmit={handleRegister}>
                    <InputContainer>
                        <InputLabel htmlFor='username'>Username</InputLabel>
                        <InputField id='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </InputContainer>
                    <InputContainer>
                        <InputLabel htmlFor='email'>Email</InputLabel>
                        <InputField id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </InputContainer>
                    <InputContainer>
                        <InputLabel htmlFor='password'>Password</InputLabel>
                        <InputField id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </InputContainer>
                    <AuthButton type='submit'>Register</AuthButton>
                </AuthForm>
                <p>OR</p>
                <GoogleLoginButton type="button" disabled>
                    <GoogleIcon /> Sign in with Google
                </GoogleLoginButton>
                <p>Already have an account? <RedirectLink to='/login'><span className='loginLink'>Login</span></RedirectLink></p>
            </AuthContainer>
        </AuthPage>
    )
}
