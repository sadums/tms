import User from "@/models/User";
import connect from "@/lib/mongodb";
import { createSession } from "@/lib/auth";

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

        createSession(email);
        return new Response(JSON.stringify({ message: 'Logged in successfully'}), {
            status: 200
        });
    } catch (error) {
        console.error("Error during log in:", error);
        return new Response('Error logging in', { status: 500 });
    }
}
