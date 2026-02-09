import mongoose from 'mongoose';

export async function connect(){
    try {
        await mongoose.connect(process.env.MONGO_URL)
        const connection = mongoose.connection;
        connection.on("connected",()=>{
            console.log("connected to mongoDB successfully");
        }) 
        connection.on("error",()=>{
            console.log("error connecting to mongoDB");
            process.exit();
        })   
    } catch (error) {
        console.log("something went wrong",error);    
    }
}