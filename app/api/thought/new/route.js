import { connectToDB } from "@utils/database";
import Thought from "@models/thought";

export const POST = async (req) => {
  const { userId, thought, tag } = await req.json();

  try {
    connectToDB();
    const newThought = new Thought({
      creator: userId,
      thought,
      tag,
    });

    await newThought.save();

    return new Response(JSON.stringify(newThought), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a Post", { status: 501 });
  }
};
