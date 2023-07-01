import React, { useRef } from 'react'
import './SignUpScreen.css'
import { auth } from './firebase'
import { collection, addDoc, getDocs, serverTimestamp, onSnapshot, orderBy, query } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { db } from './firebase';

function SignUpScreen() {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const register = (e) => {
    e.preventDefault();


    const auth = getAuth();
    createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        // Continue with the signed-in user...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle error...
      });
  }



  const signIn = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <div className='signupScreen'>
      <h2>Sign In</h2>
      <form >
        <input ref={emailRef} type="Email" placeholder='Email' />
        <input ref={passwordRef} type="password" placeholder='Password' />
        <button onClick={signIn} type='submit'>Sign In</button>
        <h4>
          <span className='signupScreen__grey'>New to Netflix?</span>
          <span onClick={register} className='signupScreen__link'> Sign Up now.</span>
        </h4>
      </form>
    </div >
  )
}

export default SignUpScreen
