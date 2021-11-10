import { doc, setDoc, updateDoc } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../AuthPart/Context'
import { db } from '../AuthPart/firebase'
import "./Styles/Homepage.css"
import moment from 'moment'


function Homepage() {
    const {currentUser} = useAuth()
    const [statemessage, setStatemessage] = useState(1)
    const phonenumber = (currentUser.phoneNumber).slice(3)

    async function changestate()
    {
        if(statemessage === 1)
        {
            setStatemessage(0)
        }
        else{
            setStatemessage(1)
        }
        
        
    }


    const time = moment(new Date().getTime()).format('h:mm')
    const con =(time > "11:45" && time < "11:55") ? true : false

    useEffect(() => {
        async function updatechange(){
            const time = moment(new Date().getTime()).format('h:mm')
            await setDoc(doc(db, "Users", `${currentUser.uid}`), {
                state: statemessage,
                time:time
            });
            await updateDoc(doc(db, "Users", `${currentUser.uid}`), {
                state: statemessage,
                time:time
            });
            // alert("State updated!");
            
        }

        updatechange()
        sendtext()
    }, [statemessage])

    const sendtext = () => {
        const recipient= `${phonenumber}`;
        const textmessage= `State is ${statemessage}`;
        fetch(`https://backend000.herokuapp.com/send-text?recipient=${recipient}&textmessage=${textmessage}`)
        .catch(err => console.log(err))
    }
    return (
        <div className="homecontainer">
            <div className="top-container">
                <div className="topd">
                    <div className={con ? "circle grclr" : "circle rrclr"}></div>
                    <p>{con ? "Device Online" : "Device Offline"}</p>
                </div>
            </div>

            <div className="sec-container">
                <button className={statemessage === 1 ? "statebtn blgrchange" : "statebtn grwhchange"} onClick={changestate}>State {statemessage}</button>
            </div>
        </div>
    )
}

export default Homepage
