import React, { useState } from 'react'
import { InputContainer, InputField, InputLabel } from '../Dashboard/NewForm.styles'
import { AuthContainer, AuthForm, AuthPage, GoogleLoginButton, RedirectLink } from './Auth.styled'
import {ReactComponent as Logo} from '../../images/groblje-horora-logo.svg'
import homeCoverImage from '../../images/groblje-horora-bg-image.jpg'
import {ReactComponent as GoogleIcon} from '../../images/googleicon.svg'
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth"
import { auth } from '../../firebase/config'
import { useNavigate } from 'react-router-dom';
import { StyledButton } from '../../components/buttons/Buttons.styled'
import HelmetSettings from '../../components/HelmetSettings'
import Loading from '../../components/loading/Loading'

export default function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errors, setErrors] = useState([])

    const [creatingUser, setCreatingUser] = useState(false)
    

    // Handle registration form submission
    const handleRegister = async (e) => {
        e.preventDefault();
        console.log('Register Form Submitted')
        setCreatingUser(true)
        try {
            // Validate user input on backend
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
                setCreatingUser(false)
                return;
            }
            console.log('Validation success');

            // Create user in Firebase authentication
            const user = await createUserWithEmailAndPassword(auth, email, password);
            console.log('Firebase  User Created', user.user)

            // Update user profile with the provided username
            await updateProfile(user.user, {
                displayName: username
            });
            console.log('Firebase User Display Name Updated', user.user);

            // Prepare user data for MongoDB
            const userData = {
                username: username,
                email: email,
                role: 'user',
            };
            console.log('User Data prepared for storing to MongoDB')
    
            // Add user data to MongoDB
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
                setCreatingUser(false)
                return;
            }
            console.log('User Data stored to MongoDB', json);

            // Send email verification
            await sendEmailVerification(auth.currentUser);
            console.log('verification mail sent')


            // Redirect to the previous page stored in local storage
            const backURL = localStorage.getItem('lastVisitedUrl');
            localStorage.removeItem('lastVisitedUrl');
            navigate(backURL)
            console.log('Registration Successful, Navigating to login screen')
        } catch (err) {
            console.log(err);

            // Delete user from MongoDB if Firebase Registration is unsuccessful
            const deleteResponse = await fetch(`http://localhost:4000/api/users/${email}`, {
                method: 'DELETE',
            });
            const deleteJson = await deleteResponse.json();
            if (deleteResponse.ok) {
                console.log('User deleted from MongoDB', deleteJson);
            }
            setCreatingUser(false)
        }
    };

    return (

        <>
            <HelmetSettings
                title={`Registracija - Groblje Horora`}
                description={`
                    Registracija
                `}
                url={`https://www.groblje-horora.com/register`}
                image={`%PUBLIC_URL%/images/groblje-horora-og-image.webp`}
            />
            
            <AuthPage style={{backgroundImage: `url(${homeCoverImage})`}}>
                {creatingUser ? <Loading variant='transparent' mainText='Trenutak' altText='kreiram tvoj račun'/> : ''}
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
                        <StyledButton type='submit'>Register</StyledButton>
                    </AuthForm>
                    <p className='separator'>OR</p>
                    <GoogleLoginButton type="button" disabled>
                        <GoogleIcon /> Sign in with Google
                    </GoogleLoginButton>
                    <p>Already have an account? <RedirectLink to='/login'><span className='loginLink'>Login</span></RedirectLink></p>
                </AuthContainer>
            </AuthPage>
        </>
    )
}
