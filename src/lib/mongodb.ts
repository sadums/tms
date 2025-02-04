import mongoose from "mongoose";

const uri: string = process.env.MONGO_URI ?? '';

export default async function connect() {
    if (!uri) {
        console.error("MONGO_URI is not defined. Please check your environment variables.");
        process.exit(1);
    }

    try {
        // Connect to MongoDB using the uri
        await mongoose.connect(uri);
        console.log("Mongoose connected");

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
        process.exit(1);
    }
}
