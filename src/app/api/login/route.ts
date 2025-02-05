import User from "@/models/User";
import connect from "@/lib/mongodb";
import { NextResponse } from 'next/server'
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
        await createSession(email);
        return NextResponse.redirect(new URL('/', request.url))
    } catch (error) {
        console.error("Error during log in:", error);
        return new Response('Error logging in', { status: 500 });
    }
}
