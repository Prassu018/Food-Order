// @ts-nocheck
import userModel from "../Models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';



// login user
const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success:false,message:"user Doesn't Exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch) {
            return res.json({success:false,message:"Invalid Credentials"})   
        }
        const token = createToken(user._id);
        res.json({success:true,token}
        )
    } catch (error) {
        console.log("Error");
        res.json({success:false,message:'This is Error'});
    }
}
const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
// register user

const registerUser = async(req,res)=>{
    const {name,email,password} = req.body;
    try {
        // check if user already exist
        const exists = await userModel.findOne({email});
        if(exists) {
            return res.json({success:false,message:'user already exists'});
        }
        // validating email and strong pass
        if(!validator.isEmail(email)){
            return res.json({success:false,message:'please enter a valid Email'});
        }
        if(password.length<8){
            return res.json({success:false,message:'please enter a Strong password'});

        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
            // cartData: {}
        })

       const user = await newUser.save();
       const token = createToken (user._id)
       res.json({success:true,token})
    } catch (error) {
        console.log("Error")
         res.json({success:false,message:'This is Error'});
    }
}

export {loginUser,registerUser}