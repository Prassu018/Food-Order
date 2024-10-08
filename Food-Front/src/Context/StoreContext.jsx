import { createContext, useEffect, useState } from "react";
import axios from "axios";


  export const StoreContext = createContext(null);
  const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url ="http://localhost:4000";
  const [token ,setToken]= useState("")
  const [food_list,setFood_list] = useState([])


  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      // console.log(itemId);
      await axios.post(url + "/api/cart/add",{itemId},{headers:{token}})
    }
  };

  
  const removeFromCart =  async (itemId) => { 
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    if (token) {
      await axios.post(url + "/api/cart/remove",{itemId},{headers:{token}})
    }
  };


  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

const fetchFoodlist = async()=>{
  const response = await axios.get(url+"/api/food/list")
  setFood_list(response.data.data)
}


const loadCartData = async(token)=>{
  const response = await axios.post (url +"api/cart/get",{},{headers:{token}})
  setCartItems(response.data.CartData);
}

// useEffect(()=>{
//   async function loadData() {
//     await fetchFoodlist();
//     if (localStorage.getItem("token")) { 
//       setToken(localStorage.getItem("token"));
//       await loadCartData(localStorage.getItem("token"))
//     }
//   }
//   loadData();
// },[token])
useEffect(() => {
  async function loadData() {
    try {
      await fetchFoodlist();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  }
  loadData();
}, []);


// window.addEventListener('unhandledrejection', (event) => {
//   event.preventDefault();
// });

  const ContextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  }
  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
