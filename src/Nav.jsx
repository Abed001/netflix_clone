import React, { useEffect, useState } from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'


function Nav() {
    const [show, handleShow] = useState(false)
    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true)
        } else {
            handleShow(false)
        }
    }

    //as we scroll th use effect will trigger the transition navbar function
    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar)
        //you have to clean after
        return () => window.removeEventListener("scroll", transitionNavBar)

    }, []);

    return (
        <div className={`nav ${show &&'nav__black'}`}>
            <div className="nav__contents">

                <img className='nav__logo' src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="" />
              <Link to="/profilescreen">  <img  className='nav__avatar' src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" /></Link>


            </div>
        </div>
    )
}

export default Nav
