import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { auth } from '../firebase/config';

export default function useAuthCheck() {
    const [userData, setUserData] = useState(null)
    const [loggingIn, setLoggingIn] = useState(false)
    const [firebaseUser, setFirebaseUser] = useState(null)
    console.log('AAAUUUUUUUTTTTTTHHHHHH', auth)

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

                        if (json === null) {
                            setLoggingIn(!loggingIn)
                        }
                    } else {
                        console.log('error fetchin user', json)
                    }
                } catch (err) {
                    console.log('error ferching user', err)
                }
            } else {
                // Reset user data if not authenticated
                setUserData(null)
                setFirebaseUser(null)
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