import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Foooter from './components/Footer/Foooter'
import './index.css'
import Loginpopup from './components/LoginPopUp/Loginpopup'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {


  const[showLogin,setShowLogin] = useState(false)



  return (
    <>
    {showLogin?<Loginpopup  setShowLogin={setShowLogin}/>:<></>}


    
    <div className = 'app'>
      <Navbar setShowLogin={setShowLogin} /> 
      <Routes>
        <Route path = '/'  element={<Home/>}/>
        <Route path = '/Cart'  element={<Cart/>}/>
        <Route path = '/Order'  element={<PlaceOrder/>}/>
        <Route path = '/myorders'  element={<MyOrders/>}/>
      </Routes>
    </div>
    <Foooter/>
    </>
  )
}

export default App
