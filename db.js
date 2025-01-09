const mongoose = require('mongoose');

const connectDB = async () => {
    try {
       const conn = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING) 
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error}`)
        // Status code 1 mean failure to connect
       process.exit(1) 
    }
}

module.exports = connectDB