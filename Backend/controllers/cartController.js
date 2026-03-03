import userModel from '../models/userModel.js'

// add product to user cart
const addToCart =async(req,res)=>{

      try {
            
            const {userId, itemId, size} = req.body 

            const userData = await userModel.findById(userId);
            const cartData = await userData.cartData;

            if(cartData[itemId]){  // if item id available in cart data
                  if(cartData[itemId][size]){  // for this item id check size
                        cartData[itemId][size] += 1;
                  }
                  else{
                        cartData[itemId][size] = 1; 
                  }
            }else{
                  cartData[itemId] = {}         // agar wo item cartData me available nhi hai oske liye
                  cartData[itemId][size] = 1
            }

            await userModel.findByIdAndUpdate(userId, {cartData})

            res.json({ success: true, message: 'Added to Cart'})

      } catch (error) {
            console.log(error)
            res.json({ success: false, message:error.message})
      }
      

}

// update user cart
const updateCart = async(req,res)=>{

      try {
            const {userId, itemId, size, quantity} = req.body;
            const userData = await userModel.findById(userId);
            let cartData = await userData.cartData;

            cartData[itemId][size] = quantity // cart data me item id se related size ki qty add ho jayegi

            await userModel.findByIdAndUpdate(userId, {cartData})

            res.json({ success: true, message: 'Cart Updated'})


      } catch (error) {
             console.log(error)
            res.json({ success: false, message:error.message})
      }
}


// get user cart data
const getUserCart = async (req,res)=>{
      try {
            const {userId} = req.body

            const userData = await userModel.findById(userId);
            let cartData = await userData.cartData;

            res.json({success:true, cartData: userData.cartData});

      } catch (error) {
              console.log(error)
            res.json({ success: false, message:error.message})
      }
}

export {addToCart, updateCart, getUserCart}
