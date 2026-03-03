import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext()    // for share state in entire app using useContext

const ShopContextProvider = (props) =>{ // ye provide krega app ko iske ander ka data as a prop isse wrap krenge app
      const currency = '$'
      const delivery_fee = 10;
      const backendUrl = import.meta.env.VITE_BACKEND_URL
      const [search,setSearch] = useState('');
      const [showSearch, setShowSearch] = useState(false); // if true then show searchbar otherwise hide it
      const [cartItems, setCartItems] = useState({});
      const [products, setProducts] = useState([]);
      const [token, setToken] = useState('');
      const navigate = useNavigate();


      const addToCart = async (itemId, size) => {

            if(!size){                                      //if size is not selected then it return
                  toast.error('Select Product Size');
                  return;
            }

            let cartData = structuredClone(cartItems) // it create copy of cartitems obj --> created deep copy

            if(cartData[itemId]){                     // if item already exist in cart
                  if(cartData[itemId][size]) {       //  if item with specific size already exist
                        cartData[itemId][size] += 1;  
                  }
                  else{
                        cartData[itemId][size] = 1    // if item with specific size does not exist set it to 1
                  }
                  // toast.success("Successfully added")
                  
            }
            else{
                  cartData[itemId] = {};              // if item id does not exist in cart create new entry with empty obj
                  cartData[itemId][size] = 1;         // set qty of specific size to 1
                  // toast.success("Successfully added")
            }
            setCartItems(cartData);

            if(token){
                  try {
                        await axios.post(backendUrl + '/api/cart/add',{itemId,size},{headers:{token}})
                  } catch (error) {
                        console.log(error)
                        toast.error(error.message);
                  }
            }


      }




     const getCartCount = () => {
      let totalCount = 0;
      for(const items in cartItems){                  // for item
            for(const item in cartItems[items]){  // for product size
                  
                  try {
                        if(cartItems[items][item] > 0){
                              totalCount += cartItems[items][item]; //If the quantity for that size is greater than zero, it adds it to the total count.
                        }
                  } catch (error) {
                        console.log(error)
                  }

            }
      }
      return totalCount;
     }

     const updateQuantity = async (itemId,size,quantity)=>{

      let cartData = structuredClone(cartItems);

      cartData[itemId][size] = quantity;
      setCartItems(cartData);

      if(token){
            
            try {
                  await axios.post(backendUrl + '/api/cart/update',{itemId,size,quantity} , {headers:{token}} )
            } catch (error) {
                  console.log(error)
                  toast.error(error.message) 
            }

      }

     }

     const getCartAmount = () => {
      let totalAmount = 0;
      for(const items in cartItems){
            let itemInfo = products.find((product)=>product._id === items);
            for(const item in cartItems[items]){
                  try {
                        if(cartItems[items][item]>0){
                              totalAmount += itemInfo.price * cartItems[items][item]
                        }
                  } catch (error) {
                        console.log(error);
                  }
            }            
      }
      return totalAmount;
     }



     const getProductData = async()=>{
      try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if(response.data.success){
                  setProducts(response.data.products);
                  // console.log(response.data.products)
            }
            else{
                  toast.error(response.data.message);
            }

      } catch (error) {
            console.log(error)
            toast.error(error.message)
      }
     }

     const getUserCart = async (token)=>{
      try {
            
            const response = await axios.post(backendUrl + '/api/cart/get', {} ,{headers:{token}})
            if(response.data.success){
                  setCartItems(response.data.cartData);
            }

      } catch (error) {
            console.log(error)
            toast.error(error.message)
      }
     }

     useEffect(()=>{
      getProductData()
     },[])

     useEffect(()=>{
      if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'))
      }
     },[])

      const value = {
            products,currency, delivery_fee,
            search, setSearch, showSearch, setShowSearch
            , cartItems, addToCart, getCartCount, updateQuantity,
            getCartAmount, navigate, backendUrl,
            setToken,token,setCartItems
      }
// 1:900
//The value object is passed into the provider, making it available to all child components.
//{props.children} ensures that whatever components are wrapped inside ShopContextProvider will be rendered and have access to the context
      return(
            <ShopContext.Provider value={value}>  
                  {props.children}
            </ShopContext.Provider>
      )
}

export default ShopContextProvider;

// context api