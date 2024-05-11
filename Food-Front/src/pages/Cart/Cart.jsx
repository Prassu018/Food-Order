import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
// import { food_list } from '../../assets/assets';

const Cart = () => {
  const {cartItems, food_list ,removeFromCart,getTotalCartAmount} = useContext(StoreContext);

  const navigate = useNavigate();
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Qunatity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item)=>{
          if(cartItems[item.id]>0){
            return(
              <div>
              <div className="cart-items-title  cart-items-item"> 
              <img src={item.image}/>
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>{cartItems[item.id]}</p>
              <p>${item.price*cartItems[item.id]}</p>
              <p  onClick={()=>removeFromCart(item.id)}  className='cross'>x</p>
              </div>
              <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
          <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotalCartAmount()===0?0:9}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+9}</b>
            </div>
            
          </div>
          <button onClick={()=>navigate('/Order')}>Proceed to Checkout</button>
        </div>
        <div className="cart-promo">
          <div>
            <p>If you have promocode enter it here!!</p>
            <div className="cart-promo-input">
              <input type="text" placeholder='Promocode' />
              <button>Submitt</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
