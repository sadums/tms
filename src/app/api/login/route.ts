'use server'
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
            return NextResponse.json({ error: 'User with this email does not exist' }, { status: 400 });
        }

        // Compare password
        const isPasswordCorrect = await existingUser.comparePassword(password);
        if (!isPasswordCorrect) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
        }
        await createSession(email);
        return NextResponse.json({ error: 'Sign up successful' }, { status: 200 })
    } catch (error) {
        console.error("Error during log in:", error);
        return NextResponse.json({ error: 'Error during log in' }, { status: 500 });
    }
}
