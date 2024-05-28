import Thought from "@models/thought";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
      await connectToDB();
  
      const thought = await Thought.findById(params.id);
      if (!thought) return new Response("Post not found", { status: 404 });
      return new Response(JSON.stringify(thought), { status: 200 });
    } catch (error) {
      return new Response("Failed to fetch all the data", { status: 500 });
    }
  };