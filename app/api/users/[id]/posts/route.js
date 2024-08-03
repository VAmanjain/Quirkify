import { connectToDB } from "@utils/database";
// import ThoughtWithImages from "@models/thought";
// import ThoughtWithImages from "@models/thoughtWithImage";
import Thought from "@models/thought";
import mongoose, { Mongoose } from "mongoose";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    if (!params?.id) {
      return new Response("Params not found", { status: 404 });
    }
    console.log(params.id);
    // const thoughts = await ThoughtWithImages.find({creator: params.id}).populate('creator');
    const thoughts = await Thought.aggregate([
      {
        $match: { creator: new mongoose.Types.ObjectId(params.id) },
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
        $lookup: {
          from: "userProfiles",
          localField: "creator._id",
          foreignField: "creator",
          as: "creator.profile",
        },
      },
      {
        $sort: { createAt: -1 },
      },
      {
        $project: {
          _id: 1,
          "creator.profile": 1,
          thought: 1,
          tag: 1,
          star: 1,
          createAt: 1,
          images:1,
        },
      },
    ]);
    console.log(thoughts);
    return new Response(JSON.stringify(thoughts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all the data", { status: 500 });
  }
};
