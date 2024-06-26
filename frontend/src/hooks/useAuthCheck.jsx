import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { auth } from '../firebase/config';

export default function useAuthCheck() {
    const [userData, setUserData] = useState(null)
    const [loggingIn, setLoggingIn] = useState(false)
    const [firebaseUser, setFirebaseUser] = useState(null)
    const [loadingUser, setLoadingUser] = useState(true)

    // Effect hook to subscribe to authentication state changes
    useEffect(() => {
        
        // Function to be called on authentication state changes
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            
            if (auth.currentUser) {
                try {
                    // Fetch user data from MongoDB based on Firebase Auth email
                    const response = await fetch(`http://localhost:4000/api/users/${user.email}`)
                    const json = await response.json()

                    if (response.ok) {
                        // Set user data if the fetch is successful
                        setUserData(json)
                        setFirebaseUser(auth.currentUser)
                        setLoadingUser(false)

                        if (json === null) {
                            setLoggingIn(!loggingIn)
                            setLoadingUser(false)
                        }
                    } else {
                        setLoadingUser(false)
                        console.log('error fetchin user', json)
                    }
                } catch (err) {
                    setLoadingUser(false)
                    console.log('error ferching user', err)
                }
            } else {
                // Reset user data if not authenticated
                setUserData(null)
                setFirebaseUser(null)
                setLoadingUser(false)
            }
        })

        // Cleanup function to unsubscribe from the authentication state changes
        return () => {
            unsubscribe();
        };
        
    }, [loggingIn])

    return {
        userData,
        firebaseUser,
        loadingUser
    }
}

// Function to handle user logout.
export const handleLogout = async () => {
    try {
        // Sign out the user using Firebase authentication
        await signOut(auth);
    } catch (error) {
        console.log(error)
    }
};