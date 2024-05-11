import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets'
const Foooter = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-left">
          <img src={assets.logo} alt="" />
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias autem vitae maiores repudiandae, quis libero.</p>
          <div className="f-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>

        </div>
        <div className="footer-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy-Policy</li>
          </ul>
        </div>
        <div className="footer-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91 xxxxxxxxxxxx</li>
            <li>abc@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="f-copyright">Copyright 2024 Tomato.com - All Rights Reserved </p>       
    </div>
  )
}

export default Foooter
