import mongoose from "mongoose"

const connectToMongodb = async (): Promise<void> => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables')
        }

        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB successfully")
        
    } catch (error) {
        if (error instanceof Error) {
            console.log("MongoDB connection error:", error.message)
        }
        throw error
    }
}

export default connectToMongodb
