import React, { useState } from 'react'
import { InputContainer, InputField, InputLabel } from '../Dashboard/NewForm.styles'
import { AuthContainer, AuthForm, AuthPage, GoogleLoginButton, RedirectLink } from './Auth.styled'
import {ReactComponent as Logo} from '../../images/groblje-horora-logo.svg'
import homeCoverImage from '../../images/groblje-horora-bg-image.jpg'
import {ReactComponent as GoogleIcon} from '../../images/googleicon.svg'
import { AuthButton } from '../../components/Button.styles'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from '../../firebase/config'
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    console.log(errors)
    const navigate = useNavigate();

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
                setErrors(validationJson.errorMessages)
                return;
            }
            console.log('Validation success');

            // Prepare user data for MongoDB
            const userData = {
                username: username,
                email: email,
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

    
            // Create user in Firebase
            const user = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(user.user, {
                displayName: username
            });
            console.log('Firebase user created:', user.user);


            // Handle success, e.g., redirect to a success page
            const backURL = localStorage.getItem('lastVisitedUrl');
            localStorage.removeItem('lastVisitedUrl');
            navigate(backURL)
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
                <p className='error'>{errors.join(', ')}</p>
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
                <p className='separator'>OR</p>
                <GoogleLoginButton type="button" disabled>
                    <GoogleIcon /> Sign in with Google
                </GoogleLoginButton>
                <p>Already have an account? <RedirectLink to='/login'><span className='loginLink'>Login</span></RedirectLink></p>
            </AuthContainer>
        </AuthPage>
    )
}
