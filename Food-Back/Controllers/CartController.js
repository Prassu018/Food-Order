// @ts-nocheck
import userModel from "../Models/userModel.js";
// add to user cart
const addtoCart = async (req,res)=>{
    try {
        let userData = await userModel.findOne({_id:req.body.userId});
        let CartData = await userData.CartData;
        if(!CartData[req.body.itemId]){
            CartData[req.body.itemId] = 1;
        }
        else{
            CartData[req.body.itemId] += 1 ;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{CartData});
        res.json({success:true,message:"Added To Cart"});
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}
// remove to user cart
const removeFromCart = async (req,res)=>{
    try{
        let userData = await userModel.findOne({_id:req.body.userId});
        let CartData = await userData.CartData;
        if(CartData[req.body.itemId]>0){
            CartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{CartData});
        res.json({success:true,message:"Removed from Cart"});
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
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
