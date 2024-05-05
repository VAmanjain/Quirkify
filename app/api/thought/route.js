import Thought from "@models/thought";
import { connectToDB } from "@utils/database";

export const GET = async () => {
    try {
        await connectToDB()

        const Thoughts = await Thought.find({}).populate('creator')

        return new Response(JSON.stringify(Thoughts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all Thoughts", { status: 500 })
    }
} 
