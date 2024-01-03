// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import 'firebase/firestore';
import { SignupData } from "./components/Signup";
import { getFirestore, doc, setDoc, DocumentSnapshot, getDoc, getDocs, collection, updateDoc } from "firebase/firestore";
import { UserData } from "./components/System";
import { GameContextType } from "./components/context/GameContext";
import { UserContextType } from "./components/context/UserContext";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAV18vElNL9VAVGgR6SaY5lz0Y97p492X4",
  authDomain: "hangman-384bc.firebaseapp.com",
  projectId: "hangman-384bc",
  storageBucket: "hangman-384bc.appspot.com",
  messagingSenderId: "562800687045",
  appId: "1:562800687045:web:ad7fc92784ffcd5e02fdac",
  measurementId: "G-SZ6J3NN24C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
console.log(auth.currentUser?.uid)
export const firestore = getFirestore(app);

export const createUserDocument = async (user: any, signupData: SignupData) => {
    if (!user) return;
    // console.log(user);
    const userRef = doc(firestore, `users/${user.user.uid}`);
    const snapshot: DocumentSnapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
        const { username } = signupData;
        // console.log(user)
        try {
            await setDoc(userRef, {username: username, wins: 0, loses: 0 });
            // console.log('User document created successfully!');
        } catch (error) {
            // console.error('Error creating user document:', error);
        }
    } else {
        // console.log('User document already exists.');
    }
};

export const getUserData = async (GameContext: GameContextType, UserContext: UserContextType) => {
    const docRef = doc(firestore, `users/${auth.currentUser?.uid}`);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data())
    const data = {wins: docSnap.data()?.wins, loses: docSnap.data()?.loses, username: docSnap.data()?.username}
    if(GameContext.game){
        GameContext.setGame({...GameContext.game, wins: data?.wins, loses: data?.loses})
    }else{
        GameContext.setGame({started:false, wrongLetters: [], correctLetters: [], wins: data?.wins, loses: data?.loses})
    }
    UserContext.setUser({username: data.username})
    return
    // setUserData(docSnap.data() as UserData)
}

export const userSignout = async () => {
    signOut(auth).then(()=>{

    }).catch((e)=>{
        console.log(e)
    })
}

export const getAllUsersStats = async () => {
    const querySnapshot = await getDocs(collection(firestore, 'users'));
    const data: UserData[] = []
    // data = []
    querySnapshot.forEach((doc) => {
        // console.log(doc.id, ' => ', doc.data());
        data.push(doc.data() as UserData)
    });
    return data;
}

export const updateUser = async (wins: number, loses: number, gameData: GameContextType, userData: UserContextType) => {
    const userRef = doc(firestore, `users/${auth.currentUser?.uid}`);
    try{
        await updateDoc(userRef, {wins: wins, loses: loses})

    }catch(e){
        console.log(e)
    }finally{
        // getUserData(gameData, userData)
    }
}