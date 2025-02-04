import User from "@/models/User";
import connect from "@/lib/mongodb";
import jwt from "jsonwebtoken";

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

        // Create JWT Token
        const token = jwt.sign(
            { userId: existingUser._id, email: existingUser.email },
            process.env.JWT_SECRET ?? '',
            { expiresIn: '1h' }
        );

        // Send response with token
        return new Response(JSON.stringify({ message: 'Logged in successfully', token }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("Error during log in:", error);
        return new Response('Error logging in', { status: 500 });
    }
}
