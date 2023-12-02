import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/config';

export default function useAuthCheck() {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (auth.currentUser) {
                try {
                    const response = await fetch(`http://localhost:4000/api/users/${user.email}`)
                    const json = await response.json()

                    if (response.ok) {
                        setUserData(json)
                    } else {
                        console.log('error fetchin user', json)
                    }
                } catch (err) {
                    console.log('error ferching user', err)
                }
            } else {
                setUserData(null)
            }
        })

        return () => {
            unsubscribe();
        };
        
    }, [])

    return userData
}


export const handleLogout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error)
    }
};