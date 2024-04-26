import UserProfile from "@models/UserProfile";
import { connectToDB } from "@utils/database"

export const GET = async( {params})=>{
    try {
        await connectToDB();
        const user = await UserProfile.findById(params.id).populate("creator");
        if(!user) return new Response("user not found", {status:404});
        return new Response(JSON.stringify(user), {status:200});
    } catch (error) {
        return new Response("Error in retrive user", {status:500});
    }
}


export const PATCH = async (request, { params }) => {
    const { quirkId, bio, image } = await request.json();
    try {
      await connectToDB();
  
      const existingThought = await Thought.findById(params.id);
      if (!existingThought)
        return new Response(" Post not found", { status: 404 });
  
      existingThought.thought = thought;
      existingThought.tag = tag;
  
      await existingThought.save();
      return new Response(JSON.stringify(existingThought), { status: 200 });
    } catch (error) {
      return new Response("Failed to fetch all the data", { status: 500 });
    }
  };