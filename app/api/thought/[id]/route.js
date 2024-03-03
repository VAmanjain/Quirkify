import { connectToDB } from "@utils/database";
import Thought from "@models/thought";

//GET
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const thought = await Thought.findById(params.id).populate("creator");
    if (!thought) return new Response("Post not found", { status: 404 });
    return new Response(JSON.stringify(thought), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all the data", { status: 500 });
  }
};

//PATCH
export const PATCH = async (request, { params }) => {
  const { thought, tag } = await request.json();
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

//DELETE
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Thought.findByIdAndDelete(params.id);

    return new Response("Prompt delete Succesfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all the data", { status: 500 });
  }
};
