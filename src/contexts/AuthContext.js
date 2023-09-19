import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from '../firebase'

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, SetCurrentUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
            SetCurrentUser(user);
            setIsLoading(false);
        })

        return () => {
            unsubscribe();
        }
    },[])

    return(
        <AuthContext.Provider value={{currentUser, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}