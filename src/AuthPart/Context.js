import {auth} from "./firebase.js"
import React, {useEffect,useContext, useState } from 'react'
import { RecaptchaVerifier, signInWithPhoneNumber } from "@firebase/auth"
import { useNavigate } from "react-router"


const AuthContext = React.createContext()


export function useAuth(){
    return useContext(AuthContext)
}
export default function AuthProvider({children}) {
    const [currentUser,setCurrentUser] = useState()
    const[loading,setLoading] = useState(true)
    const navigate = useNavigate()

    function phonelogin(number){
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth)
        const appVerifier = window.recaptchaVerifier;
        try {
            signInWithPhoneNumber(auth, number, appVerifier)
                .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                    const code = prompt('Enter the code from the SMS message ' + number);
                    confirmationResult.confirm(code).then((result) => {
                    // User signed in successfully.
                    const user = result.user;
                    navigate('/home')
                    // ...
                    }).catch((error) => {
                    // User couldn't sign in (bad verification code?)
                    // ...
                    });
                // ...
                }).catch((error) => {
                // Error; SMS not sent
                // ...
                });
        } catch (error) {
            console.log(error);
        }
    }

 
   
    const value = {
        phonelogin,
        currentUser,
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    },[])
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
