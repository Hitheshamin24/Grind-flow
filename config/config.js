 const mongoose=require("mongoose")
const uri=process.env.MONGO_URI
const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(uri)
        console.log("MongoDB Connected: "+conn.connection.host)
    }
    catch(e){
        console.log("Error connecting to MongoDB: "+e.message)
    }
}

module.exports=connectDB