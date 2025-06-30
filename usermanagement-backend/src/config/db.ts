import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config({path:".env.development"})

export const connectDb= async ()=>{
    try{
       const Connection= await mongoose.connect(process.env.MONGO_URI || "")
       console.log(`MONGO-DB Connected:${Connection.connection.name}`)
         console.log("✅ Connected DB URI:", process.env.MONGO_URI);
    }
    catch(error: any){
       console.error(`ERROR:${error.message}`)
       process.exit(1)
    }

}