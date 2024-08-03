import { connectToDB } from "@utils/database";
import Thought from "@models/thought";
import mongoose from "mongoose";

//GET
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    if (!params?.id) {
      return new Response("Params not found", { status: 404 });
    }
    console.log(params?.id);
    // const Thoughts = await ThoughtWithImages.find({}).populate('creator')
    const Thoughts = await Thought.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(params?.id) },
      },
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "creator",
        },
      },

      {
        $sort: { createdAt: -1 },
      },
      // Left Join with UserProfile with the creator._id
      {
        $lookup: {
          from: "userProfiles",
          localField: "creator._id",
          foreignField: "creator",
          as: "creator.profile",
        },
      },

      {
        $project: {
          _id: 1,
          "creator.profile": 1,
          thought: 1,
          tag: 1,
          star: 1,
          createAt: 1,
          images: 1,
        },
      },
    ]);
    return new Response(JSON.stringify(Thoughts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all Thoughts", { status: 500 });
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
