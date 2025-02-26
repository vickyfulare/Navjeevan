import mongoose from "mongoose";
import colors from "colors"
import dotenv from 'dotenv'
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Server running on ${mongoose.connection.host}`.bgCyan.white)
        console.log("Connected to Database Successfully...")
    } catch (error) {
        console.log(`${error}`.bgRed)
    }

}
export default connectDB;

// const connectDB = async() => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGODB_URL)
//         console.log("Connected to mongodb database".bgBlue.white)
//     } catch (error) {
//         console.log(`Error in mongodb ${error}`.bgCyan.white)
//     }
// }

// export default connectDB;