import User from "@/models/User";
import connect from "@/lib/mongodb";

export async function POST(request: Request) {
    try{
        const { email, password } = await request.json()

        await connect();

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return new Response('Invalid credentials', { status: 400 });
        }
        const compare = await existingUser.comparePassword(password)

        // invalid password
        if(!compare){
            return new Response('Invalid credentials', { status: 400 });
        }

        // log user in, send jwt
        return new Response('Logged in!', { status: 200 })
    } catch (error) {
        console.error("Error during log in:", error);
        return new Response('Error logging in', { status: 500 });
  }
}