import User from "@/models/User";
import connect from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers'

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        await connect();

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return new Response('Invalid credentials', { status: 400 });
        }

        // Compare password
        const isPasswordCorrect = await existingUser.comparePassword(password);
        if (!isPasswordCorrect) {
            return new Response('Invalid credentials', { status: 400 });
        }
        console.log(process.env.JWT_TOKEN, "this is the secret")
        // Create JWT Token
        const token = jwt.sign(
            { userId: existingUser._id, email: existingUser.email },
            process.env.JWT_TOKEN ?? '',
            { expiresIn: '1h' }
        );
        const cookieStore = await cookies()
        // Send response with token
        cookieStore.set({
            name: 'tokentest',
            value: `${token}`,
        })
        return new Response(JSON.stringify({ message: 'Logged in successfully'}), {
            status: 200
        });
    } catch (error) {
        console.error("Error during log in:", error);
        return new Response('Error logging in', { status: 500 });
    }
}
