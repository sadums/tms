import User from '@/models/User'
import connect from "@/lib/mongodb";
import { NextResponse } from 'next/server'
import { createSession } from "@/lib/auth";

 
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    if(!(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email))){
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    if(password.length < 8){
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
    }

    await connect();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    const user = new User({ 
      email: email,
      password: password
    });

    await user.save();

    console.log('User created:', user);
    await createSession(email);
    return NextResponse.json({ error: 'Sign up successful' }, { status: 200 })
  } catch (error) {
    console.error("Error during user creation:", error);
    return NextResponse.json({ error: 'Error during sign up' }, { status: 500 })
  }
}
