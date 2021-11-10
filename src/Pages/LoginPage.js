import React, { useRef } from 'react'
import { useAuth } from '../AuthPart/Context'
import "./Styles/Loginpage.css"


function LoginPage() {
    const numberref = useRef()
    const {phonelogin} = useAuth()


    async function handleLogin(e) {  
        e.preventDefault()
        const number = "+91" +  numberref.current.value;
        if(numberref.current.value.length === 10){
            await phonelogin(number)
        }
        else{
            alert("Please enter a valid phone number")
        }
    }
    
    return (
        <div className="login-container">
            <form className="hero" onSubmit={handleLogin}>
                <h2 className="hd">Login using your mobile Number</h2>
                <div className="group">
                    <input ref={numberref} type="number" className="txtbox" required placeholder="Mobile Number"/>
                    <button type="submit" className="sbtbtn">GET OTP</button>
                    <div id="recaptcha-container"></div>
                </div>
            </form>
        </div>
    )
}

export default LoginPage
