// @ts-nocheck
import userModel from "../Models/userModel.js";
// import mongoose from 'mongoose';
// add to user cart
const addtoCart = async (req,res)=>{
    try {
        let userData = await userModel.findOne({ _id: req.body.userId});
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1 ;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added To Cart"});
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}
// const addtoCart = async (req, res) => {
//     try {
//         // Find the user data by userId
//         let userData = await userModel.findOne({ _id: req.body.userId });
//         // Check if userData exists
//         // if (!userData) {
//         //     return res.json({ success: false, message: "User not found" });
//         // }
//         let cartData = userData.cartData || {};
//         if (!cartData[req.body.itemId]) {
//             cartData[req.body.itemId] = 1;
//         } else {
//             cartData[req.body.itemId] += 1;
//         }
//         await userModel.findByIdAndUpdate(req.body.userId, { cartData });
//         // Respond with success
//         res.json({ success: true, message: "Added To Cart" });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" });
//     }
// };

// remove to user cart
const removeFromCart = async (req,res)=>{
    try{
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from Cart"});
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
// const removeFromCart = async (req, res) => {
//     try {
//         // Find the user by userId
//         let userData = await userModel.findOne({ _id: req.body.userId });
        
//         // Check if userData exists
//         // if (!userData) {
//         //     return res.json({ success: false, message: "User not found" });
//         // }
//         // Check if CartData exists, if not, initialize it as an empty object
//         let cartData = userData.cartData || {};

//         // Check if the item exists in the cart and the quantity is greater than 0
//         if (cartData[req.body.itemId] && cartData[req.body.itemId] > 0) {
//             cartData[req.body.itemId] -= 1;

//             // Optionally, remove the item from CartData if its quantity reaches 0
//             if (cartData[req.body.itemId] === 0) {
//                 delete cartData[req.body.itemId];
//             }

//             // Update the user's CartData in the database
//             await userModel.findByIdAndUpdate(req.body.userId, { cartData });

//             // Respond with success
//             res.json({ success: true, message: "Removed from Cart" });
//         } else {
//             res.json({ success: false, message: "Item not found in cart" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" });
//     }
// };

// ftech data of user cart
const getCart = async (req,res)=>{
    try {
        let userData = await userModel.findOne({_id: req.body.userId});
        let cartData = await userData.cartData;
        res.json({success:true,cartData});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {addtoCart,removeFromCart,getCart};
