import Thought from "@models/thought"
import { connectToDB } from "@utils/database"

export const PATCH = async (request, { params }) => {
  try {
    await connectToDB();

    const body = await request.json();
    const { thoughtId } = body;
    const userId = params.id;

    if (!thoughtId) {
      // If thoughtId is empty, respond with an error
      return new Response("ThoughtId is required", { status: 400 });
    }

    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      {
        $pull: { star: userId },
      },
      {
        new: true,
      }
    );

    if (updatedThought) {
      console.log("Star added successfully");
      return new Response("Star is updated", { status: 200 });
    } else {
      console.log("Thought not found");
      return new Response("Thought not found", { status: 404 });
    } 
  } catch (error) {
    console.error(error);
    return new Response("Failed to add Star", { status: 500 });
  }
};