import mongoose from "mongoose";

const uri: string = process.env.MONGO_URI ?? '';

export default async function connect() {
    // Check if MONGO_URI is defined and valid
    if (!uri) {
        console.error("MONGO_URI is not defined. Please check your environment variables.");
        process.exit(1); // Exit the process if no URI is provided
    }

    try {
        // Connect to MongoDB using the uri
        await mongoose.connect(uri);
        console.log("Mongoose connected");

        // Optional: Add event listeners to mongoose connection for more detailed error handling
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connection established.');
        });

        mongoose.connection.on('error', (err) => {
            console.error('Mongoose connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose connection disconnected.');
        });

    } catch (e) {
        console.error("Error connecting to MongoDB:", e);
        process.exit(1);  // Exit the process if connection fails
    }
}
