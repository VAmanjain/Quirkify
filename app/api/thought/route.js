import Thought from "@models/thought";
// import ThoughtWithImages from "@models/thoughtWithImage";
import { connectToDB } from "@utils/database";

export const GET = async () => {
  try {
    await connectToDB();

    // const Thoughts = await ThoughtWithImages.find({}).populate('creator')
    const Thoughts = await Thought.aggregate([
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
          images:1,
        },
      },
    ]);
    return new Response(JSON.stringify(Thoughts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all Thoughts", { status: 500 });
  }
};
