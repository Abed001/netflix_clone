import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen.jsx';
import { Routes, Route } from 'react-router-dom';
import LoginScreen from './LoginScreen.jsx';
import ProfileScreen from './ProfileScreen.jsx';
import { auth } from './firebase'
import { useDispatch, useSelector } from 'react-redux';
import { logout ,login, selectUser} from './features/userSlice';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch()
  //this useffect is used to maintain the user when he logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        //logged
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }))

      }
      else {
        //logged out
        dispatch(logout())
      }
    });
    return unsubscribe;
  }, [])

  return (
    <div className="app">
      {!user ? (<LoginScreen />) : (
        <Routes>

          <Route path='/profilescreen' element={<ProfileScreen/>} />
          <Route path='/' element={<HomeScreen />} />
          
          {/* <Route path='/loginscreen' element={<LoginScreen/>}/>)*/}

        </Routes>)}
    </div>
  );
}

export default App;
