import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from '../firebase'

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, SetCurrentUser] = useState({});

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
            SetCurrentUser(user);
        })

        return () => {
            unsubscribe();
        }
    }, [])

    return(
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}