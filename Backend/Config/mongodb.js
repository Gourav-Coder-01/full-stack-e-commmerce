import mongoose, { mongo } from "mongoose";

const connectDB = async () => {

      mongoose.connection.on("connected",()=>{ // jab bhi mongodb connection established hoga to ye fn chalega
            console.log('DB Connected');
      })

      await mongoose.connect(`${process.env.MONGODB_URI}e-commerce`)// e-commerce our collection name

}

export default connectDB;
