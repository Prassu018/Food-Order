import React ,{useContext, useEffect, useState} from 'react'
import './MyOrders.css'
import {StoreContext} from '../../Context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets.js'


const MyOrders = () => {
    const {url,token} = useContext(StoreContext) ;
    const [data,setData] = useState([]) ;
   

    // const fetchOrders = async ()=>{
    //     const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
    //     setData(response.data.data);
    //     console.log(response.data.data);
    // }
    const fetchOrders = async () => {
      try {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log("An error occurred while fetching orders:", error);
      }
    };
    
    useEffect(()=>{
        if (token) {
            fetchOrders();
        }
    },[token])



  return (
      <div>
        <div className="my-orders">
          <h2>My Orders </h2>
          <div className="container">
            {data.map((order,index)=>{
              return(
                <div key={index} className="MyOrders-order">
                  <img src={assets.parcel_icon} />
                  <p>{order.item.map((item,index)=>{
                    if (index === order.items.length-1) {
                        return item.name+" x "+item.quantity
                    }
                    else{
                      return item.name+" x "+item.quantity+", "
                    }
                  })}</p>
                  <p>${order.amount}.00</p>
                  <p>Items:{order.items.length}</p>
                  <p><span>&#x25cf;</span><b>{order.status}</b></p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
  )
}

export default MyOrders
