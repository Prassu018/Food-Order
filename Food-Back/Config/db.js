import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://prashant18:40410924@cluster0.shr4z.mongodb.net/FOODORDER').then(()=>console.log("DB Connected"));
}