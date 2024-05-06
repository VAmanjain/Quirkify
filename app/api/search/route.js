// import { connectToDB } from "@utils/database";
// import UserProfile from "@models/UserProfile";

// export const GET = async (request) => {
//   try {
//     await connectToDB();

//     const query = request.nextUrl.searchParams.get('query')

//     console.log(query);

//     if(!query) return new Response ("query is empty");

//     // Fetch data using the aggregation pipeline
//     // const UserProfiles = await UserProfile.aggregate([
//     //     // Match by quirkId using the query parameter
//     //     { $match: { quirkId: { $regex: `${query}`, $options: 'i' } } },
//     //     // Optionally, sort by createdAt time if needed
//     //     { $sort: { createdAt: -1 } },
//     //     // Optionally, populate the creator field if needed
//     //     { $lookup: {
//     //       from: 'users',
//     //       localField: 'creator',
//     //       foreignField: '_id',
//     //       as: 'creator'
//     //     }},
//     //     // Optionally, unwind the creator field if needed
//     //     // { $unwind: '$creator' }
//     //   ]);


// const N = 10; // Overall number of thoughts you want to retrieve
// const queryRegex = `^${query}`; // Construct the regex pattern with ^ anchor

// const UserProfiles = await UserProfile.aggregate([
//   // Match by quirkId using the query parameter with ^ anchor
//   { $match: { quirkId: { $regex: queryRegex, $options: 'i' } } },
//   // Optionally, sort by createdAt time if needed
//   { $sort: { createdAt: -1 } },
//   // Optionally, populate the creator field if needed
//   { $lookup: {
//     from: 'users',
//     localField: 'creator',
//     foreignField: '_id',
//     as: 'creator'
//   }},
//   // Unwind the creator field to get a single document for each user
//   { $unwind: '$creator' },
//   // Include the image field from UserProfile
//   { $addFields: { 'creator.image': '$image' } },
//   // Lookup thoughts made by the user
//   { $lookup: {
//     from: 'thoughts',
//     localField: 'creator._id',
//     foreignField: 'creator',
//     as: 'thoughts'
//   }},
//   // Unwind the thoughts array
//   { $unwind: '$thoughts' },
//   // Sort thoughts by createdAt in descending order
//   { $sort: { 'thoughts.createdAt': -1 } },
//   // Limit the overall number of thoughts to the dynamic value of N
//   { $limit: N },
//   // Group the results by UserProfiles
//   { $group: {
//     _id: '$_id',
//     creator: { $first: '$creator' },
//     thoughts: { $push: '$thoughts' },
//     quirkId: { $first: '$quirkId' }
//   }},
//   // Project the fields you want in the final result
//   { $project: {
//     _id: 1,
//     creator: 1,
//     thoughts: 1,
//     quirkId: 1
//   }}
// ]);


// console.log('Aggregation results:', UserProfiles);

//     // Return the response with the aggregated data
//     return new Response(JSON.stringify(UserProfiles), { status: 200 });
//   } catch (error) {
//     // Handle errors if any
//     console.error(error);
//     return new Response("Failed to fetch all the data", { status: 500 });
//   }
// };

import { connectToDB } from "@utils/database";
import UserProfile from "@models/UserProfile";

export const GET = async (request) => {
  try {
    await connectToDB();

    const query = request.nextUrl.searchParams.get('query');
    const tag = request.nextUrl.searchParams.get('tag');
    const quirkId = request.nextUrl.searchParams.get('quirkId');

    if (!query && !tag && !quirkId) return new Response("query, tag, and quirkId are empty");

    const N = 10; // Overall number of user profiles you want to retrieve
    let matchQuery = {};

    if (tag) {
      matchQuery = { tags: { $regex: `^${tag}`, $options: 'i' } };
    } else if (quirkId) {
      matchQuery = { quirkId: { $regex: `^${quirkId}`, $options: 'i' } };
    } else {
      matchQuery = { quirkId: { $regex: `^${query}`, $options: 'i' } };
    }

    const UserProfiles = await UserProfile.aggregate([
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

    console.log('Aggregation results:', UserProfiles);

    return new Response(JSON.stringify(UserProfiles), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch all the data", { status: 500 });
  }
};