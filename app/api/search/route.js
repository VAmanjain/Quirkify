import { connectToDB } from "@utils/database";
import UserProfile from "@models/UserProfile";
import Thought from "@models/thought";

export const GET = async (request) => {
  try {
    await connectToDB();

    const query = request.nextUrl.searchParams.get("query");
    const tag = request.nextUrl.searchParams.get("tag");
    const quirkId = request.nextUrl.searchParams.get("quirkId");
    console.log({ query, quirkId, tag });

    if (!query && !tag && !quirkId)
      return new Response("query, tag, and quirkId are empty");

    const N = 10; // Overall number of user profiles you want to retrieve
    let matchQuery = {};
    let UserProfiles;
    if (tag) {
      matchQuery = { tag: { $regex: `^${tag}`, $options: "i" } };
      console.log(matchQuery);
      UserProfiles = await Thought.aggregate([
        // Match with tag
        { $match: { tag: { $regex: `^${tag}`, $options: "i" } } },

        // Sort descendingly with createAt
        { $sort: { createAt: -1 } },

        // Left Join with User model (ref a creator in thoughts model)
        {
          $lookup: {
            from: "users",
            localField: "creator",
            foreignField: "_id",
            as: "creator",
          },
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

        // Unwind the creator array
        { $unwind: "$creator" },

        // Unwind the creator.profile array
        { $unwind: "$creator.profile" },

        // Project the desired fields
        {
          $project: {
            _id: 1,
            "creator.profile": 1,
            thought: 1,
            tag: 1,
            star: 1,
            createAt: 1,
          },
        },
      ]);
      console.log(UserProfiles);
    } else if (quirkId) {
      matchQuery = { quirkId: { $regex: `^${quirkId}`, $options: "i" } };
      UserProfiles = await UserProfile.aggregate([
        // Match with quirkId
        { $match: matchQuery },

        // Sort descendingly with createAt
        { $sort: { createAt: -1 } },

        // Left Join with User model (ref a creator in UserProfile model)
        {
          $lookup: {
            from: "users",
            localField: "creator",
            foreignField: "_id",
            as: "creator",
          },
        },

        // Unwind the creator array
        { $unwind: "$creator" },

        // Left Join with Thought with the creator._id
        {
          $lookup: {
            from: "thoughts",
            localField: "creator._id",
            foreignField: "creator",
            as: "thoughts",
          },
        },

        // Unwind the thoughts array
        { $unwind: "$thoughts" },

        // Project the desired fields
        {
          $project: {
            _id: "$thoughts._id",
            "creator.profile": {
              _id: "$_id",
              creator: "$creator._id",
              quirkId: "$quirkId",
              bio: "$bio",
              image: "$image",
              createAt: "$createAt",
              updateAt: "$updateAt",
            },
            thought: "$thoughts.thought",
            tag: "$thoughts.tag",
            star: "$thoughts.star",
            createAt: "$thoughts.createAt",
          },
        },
      ]);
    } else {
      matchQuery = { quirkId: { $regex: `^${query}`, $options: "i" } };
      UserProfiles = await UserProfile.aggregate([
        // Match with quirkId
        { $match: matchQuery },

        // Sort descendingly with createAt
        { $sort: { createAt: -1 } },

        // Left Join with User model (ref a creator in UserProfile model)
        {
          $lookup: {
            from: "users",
            localField: "creator",
            foreignField: "_id",
            as: "creator",
          },
        },

        // Unwind the creator array
        { $unwind: "$creator" },

        // Left Join with Thought with the creator._id
        {
          $lookup: {
            from: "thoughts",
            localField: "creator._id",
            foreignField: "creator",
            as: "thoughts",
          },
        },

        // Unwind the thoughts array
        { $unwind: "$thoughts" },

        // Project the desired fields
        {
          $project: {
            _id: "$thoughts._id",
            "creator.profile": {
              _id: "$_id",
              creator: "$creator._id",
              quirkId: "$quirkId",
              bio: "$bio",
              image: "$image",
              createAt: "$createAt",
              updateAt: "$updateAt",
            },
            thought: "$thoughts.thought",
            tag: "$thoughts.tag",
            star: "$thoughts.star",
            createAt: "$thoughts.createAt",
          },
        },
      ]);
    }
    console.log("Aggregation results:", UserProfiles);

    return new Response(JSON.stringify(UserProfiles), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch all the data", { status: 500 });
  }
};
