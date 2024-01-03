import { createUserWithEmailAndPassword } from "firebase/auth"
import {auth, createUserDocument, getUserData} from "../../firebase"
import { SignupData } from "../Signup"
import { GameContextType } from "../context/GameContext"
import { UserContextType } from "../context/UserContext"
import { notifyError, notifySuccess } from "../../App"


export const signupWithUserData = (signupData: SignupData, gameData: GameContextType, userData: UserContextType) => {
    createUserWithEmailAndPassword(auth, signupData.email, signupData.password).then((userCredentials:unknown)=>{
        // console.log(userCredentials)
        createUserDocument(userCredentials, signupData).then(() => {
            getUserData(gameData, userData)
        }).catch(()=>{
            notifyError("Failed to create data for the new account")
            return
        });
        notifySuccess("Account created successfully")
    }).catch(()=>{
        notifyError("Something went wrong, please make sure you entered correct data and try again")
        return
    })
    
    
}