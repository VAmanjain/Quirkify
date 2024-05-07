import { connectToDB } from "@utils/database";
import UserProfile from "@models/UserProfile";
import Thought from "@models/thought";

export const GET = async (request) => {
  try {
    await connectToDB();

    const query = request.nextUrl.searchParams.get('query');
    const tag = request.nextUrl.searchParams.get('tag');
    const quirkId = request.nextUrl.searchParams.get('quirkId');

    if (!query && !tag && !quirkId) return new Response("query, tag, and quirkId are empty");

    const N = 10; // Overall number of user profiles you want to retrieve
    let matchQuery = {};
    let UserProfiles 
    if (tag) {
     
 matchQuery = { tags: { $regex: `^${tag}`, $options: 'i' } };
console.log(matchQuery);
     matchQuery = { tags: { $regex: `^${tag}`, $options: 'i' } };
//      UserProfiles = await Thought.aggregate([
//   { $match: matchQuery },
//   { $sort: { createAt: -1 } },
//   { $lookup: {
//     from: 'users',
//     localField: 'creator',
//     foreignField: '_id',
//     as: 'creator'
//   }},
//   { $unwind: '$creator' },
//   { $addFields: { 'creator.image': '$image' } },
//   { $lookup: {
//     from: 'userprofiles',
//     localField: 'creator._id',
//     foreignField: 'creator',
//     as: 'userprofile'
//   }},
//   { $unwind: '$userprofile' },
//   { $sort: { 'userprofile.createdAt': -1 } },
//   { $limit: N },
//   { $group: {
//     _id: '$_id',
//     creator: { $first: '$creator' },
//     thoughts: { $push: '$thought' },
//     quirkId: { $first: '$quirkId' },
//     tags: { $first: '$tags' }
//   }},
//   { $project: {
//     _id: 1,
//     creator: 1,
//     thoughts: 1,
//     quirkId: 1,
//     tags: 1
//   }}
// ]);
//     } else if (quirkId ) {
//       matchQuery = { quirkId: { $regex: `^${quirkId}`, $options: 'i' } };
//        UserProfiles = await UserProfile.aggregate([
//         { $match: matchQuery },
//         { $sort: { createdAt: -1 } },
//         { $lookup: {
//           from: 'users',
//           localField: 'creator',
//           foreignField: '_id',
//           as: 'creator'
//         }},
//         { $unwind: '$creator' },
//         { $addFields: { 'creator.image': '$image' } },
//         { $lookup: {
//           from: 'thoughts',
//           localField: 'creator._id',
//           foreignField: 'creator',
//           as: 'thoughts'
//         }},
//         { $unwind: '$thoughts' },
//         { $sort: { 'thoughts.createdAt': -1 } },
//         { $limit: N },
//         { $group: {
//           _id: '$_id',
//           creator: { $first: '$creator' },
//           thoughts: { $push: '$thoughts' },
//           quirkId: { $first: '$quirkId' },
//           tags: { $first: '$tags' }
//         }},
//         { $project: {
//           _id: 1,
//           creator: 1,
//           thoughts: 1,
//           quirkId: 1,
//           tags: 1
//         }}
//       ]);
UserProfiles = await Thought.aggregate([
  { $match: matchQuery }, // Match documents based on the query criteria
  { $sort: { createAt: -1 } }, // Sort the matched documents by 'createAt' field in descending order
  { $lookup: {
    from: 'users',
    localField: 'creator',
    foreignField: '_id',
    as: 'creator'
  }}, // Perform a lookup to fetch user details
  { $unwind: '$creator' }, // Deconstruct the 'creator' array
  { $addFields: { 'creator.image': '$image' } }, // Add the 'image' field from thought to creator
  { $lookup: {
    from: 'userprofiles',
    localField: 'creator._id',
    foreignField: 'creator',
    as: 'userprofile'
  }}, // Perform a lookup to fetch user profile details
  { $unwind: '$userprofile' }, // Deconstruct the 'userprofile' array
  { $sort: { 'userprofile.createdAt': -1 } }, // Sort the user profiles by 'createdAt' field in descending order
  { $limit: N }, // Limit the number of results to N
  { $group: {
    _id: '$_id',
    creator: { $first: '$creator' },
    thoughts: { $push: '$thought' },
    quirkId: { $first: '$quirkId' },
    tags: { $first: '$tags' }
  }}, // Group the results
  { $project: {
    _id: 1,
    creator: 1,
    thoughts: 1,
    quirkId: 1,
    tags: 1
  }} // Project the desired fields
]);
    } else {
      matchQuery = { quirkId: { $regex: `^${query}`, $options: 'i' } };
       UserProfiles = await UserProfile.aggregate([
        { $match: matchQuery },
        { $sort: { createdAt: -1 } },
        { $lookup: {
          from: 'users',
          localField: 'creator',
          foreignField: '_id',
          as: 'creator'
        }},
        { $unwind: '$creator' },
        { $addFields: { 'creator.image': '$image' } },
        { $lookup: {
          from: 'thoughts',
          localField: 'creator._id',
          foreignField: 'creator',
          as: 'thoughts'
        }},
        { $unwind: '$thoughts' },
        { $sort: { 'thoughts.createdAt': -1 } },
        { $limit: N },
        { $group: {
          _id: '$_id',
          creator: { $first: '$creator' },
          thoughts: { $push: '$thoughts' },
          quirkId: { $first: '$quirkId' },
          tags: { $first: '$tags' }
        }},
        { $project: {
          _id: 1,
          creator: 1,
          thoughts: 1,
          quirkId: 1,
          tags: 1
        }}
      ]);
    }
  console.log('Aggregation results:', UserProfiles);

    return new Response(JSON.stringify(UserProfiles), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch all the data", { status: 500 });
  }
};