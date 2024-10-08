import React, {  useContext, useState } from 'react'
import './Loginpopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';

const Loginpopup = ({setShowLogin}) => {
const {url,setToken} = useContext(StoreContext)

    const[currState,setCurrState] = useState("Login")
    const [data, setData] = useState({
        name:"",
        email:"",
        password:""
    });
const onchangehandler =(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data,[name]:value}))

}

const onLogin = async(e)=>{
    e.preventDefault();
    let newUrl = url;
    if (currState ==="Login") {
        newUrl += "/api/user/login"
        
    }
    else{
        newUrl += "/api/user/register"
    }
    const response = await axios.post(newUrl,data);

    if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token)
        setShowLogin(false);
        
    }
    else{
        alert(response.data.message);
    }

}




  return (
    <div className="login-popup">
        <form  onSubmit={onLogin} className="login-container">
            <div className="login-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon}/>
            </div>
            <div className="login-inputs">
                {currState==="Login"?<></>:<input name='name' onChange={onchangehandler} value={data.name} type='text'  placeholder="Your name"  required/>}
                <input  name='email' onChange={onchangehandler} value={data.email}  type='email' placeholder="Email address"   required/>
                <input name='password' onChange={onchangehandler} value={data.password}  type='password' placeholder="Password"  required/>
            </div>
            <button type='submit'>{currState==="Sign Up"? "Create account":"Login"}</button>
            <div className="login-condition">
                <input type="checkbox" required />
                <p>By Continuing ,I agree to the all T&C!!</p>
            </div>
            {currState==="Login"?
            <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")} >Click Here</span></p>:
            <p>Already have an account?  <span onClick={()=>setCurrState("Login")}>Login Here!!</span></p>}
        </form>
    </div>
  )
}

export default Loginpopup 
