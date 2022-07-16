// firebase functional imports

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import toast from 'react-hot-toast';

// firebase configurations

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);

// firebase AuthImpl object(stores all the configs etc.)
const auth = getAuth();

// registering a new user with firebase
export const register = async (email, password, fname, lname,navigate) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password, fname, lname)
    toast.success('User succesfully registered')
    navigate("/")
    return user
  } catch (err) {
    toast.error(err.message)
  }
}

//logging in a user with firebase with email and password
export const login = async (email, password,navigate) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    toast.success('user succesfully logged in')
    navigate("/")
    return user
  } catch (err) {
    toast.error(err.message)
  }
}

//logging out the user 
export const logout = async (navigate) => {
  try {
    await signOut(auth)
    toast.success('Logged out succesfully')
    navigate("/")
  } catch (err) {
    toast.error(err.message)
  }
}

//For each of your app's pages that need information about the signed-in user, attach an observer to the global authentication object. This observer gets called whenever the user's sign-in state changes.
// Attach the observer using the onAuthStateChanged method. When a user successfully signs in, you can get information about the user in the observer.
export const currentUser = async (setUser)=>{
  try{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setUser(user.email)
      }else{
        setUser('')
      }
    })
  }catch(err){
    toast.error(err.message)
  }
}

// enabling signing in with google account
const provider = new GoogleAuthProvider();

export const googleSignIn = (navigate)=>{
  try{
     signInWithPopup(auth, provider)
    .then(()=>{
      navigate('/')
    })

  }catch(err){
    toast.error(err)
  }
}