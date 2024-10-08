// @ts-nocheck
import userModel from "../Models/userModel.js";
// import mongoose from 'mongoose';
// add to user cart
// const addtoCart = async (req,res)=>{
//     try {
//         let userData = await userModel.findOne({ _id: req.body.userId});
//         let CartData = await userData.CartData;
//         if(!CartData[req.body.itemId]){
//             CartData[req.body.itemId] = 1;
//         }
//         else{
//             CartData[req.body.itemId] += 1 ;
//         }
//         await userModel.findByIdAndUpdate(req.body.userId,{CartData});
//         res.json({success:true,message:"Added To Cart"});
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:"Error"})
//     }
// }
const addtoCart = async (req, res) => {
    try {
        // Find the user data by userId
        let userData = await userModel.findOne({ _id: req.body.userId });
        // Check if userData exists
        // if (!userData) {
        //     return res.json({ success: false, message: "User not found" });
        // }
        let CartData = userData.CartData || {};
        if (!CartData[req.body.itemId]) {
            CartData[req.body.itemId] = 1;
        } else {
            CartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { CartData });
        // Respond with success
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// remove to user cart
// const removeFromCart = async (req,res)=>{
//     try{
//         let userData = await userModel.findOne({_id:req.body.userId});
//         let CartData = await userData.CartData;
//         if(CartData[req.body.itemId]>0){
//             CartData[req.body.itemId]-=1;
//         }
//         await userModel.findByIdAndUpdate(req.body.userId,{CartData});
//         res.json({success:true,message:"Removed from Cart"});
//     }catch(error){
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
// }
const removeFromCart = async (req, res) => {
    try {
        // Find the user by userId
        let userData = await userModel.findOne({ _id: req.body.userId });
        
        // Check if userData exists
        // if (!userData) {
        //     return res.json({ success: false, message: "User not found" });
        // }

        // Check if CartData exists, if not, initialize it as an empty object
        let CartData = userData.CartData || {};

        // Check if the item exists in the cart and the quantity is greater than 0
        if (CartData[req.body.itemId] && CartData[req.body.itemId] > 0) {
            CartData[req.body.itemId] -= 1;

            // Optionally, remove the item from CartData if its quantity reaches 0
            if (CartData[req.body.itemId] === 0) {
                delete CartData[req.body.itemId];
            }

            // Update the user's CartData in the database
            await userModel.findByIdAndUpdate(req.body.userId, { CartData });

            // Respond with success
            res.json({ success: true, message: "Removed from Cart" });
        } else {
            res.json({ success: false, message: "Item not found in cart" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// ftech data of user cart
const getCart = async (req,res)=>{
    try {
        let userData = await userModel.findOne(req.body.userId);
        let CartData = await userData.CartData;
        res.json({success:true,message:"Data fetched from  Cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {addtoCart,removeFromCart,getCart};
