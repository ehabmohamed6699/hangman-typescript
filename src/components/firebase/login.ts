import { signInWithEmailAndPassword } from "firebase/auth"
import {auth} from "../../firebase"
import { LoginData } from "../Login"
import { notifyError, notifySuccess } from "../../App"

export const loginWithUserData = (loginData: LoginData) => {
    signInWithEmailAndPassword(auth, loginData.email, loginData.password).then((userCredentials:unknown)=>{
        // console.log(userCredentials)
        notifySuccess("Logged in successfully")
    }).catch((e)=>{
        notifyError("Something went wrong, please make sure you entered correct data and try again")
    })
    
}