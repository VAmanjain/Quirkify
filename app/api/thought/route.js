// import { connectToDB } from "@utils/database";
// import Thought from "@models/thought";  

// export const GET =async(request)=>{
//     try {
//         await connectToDB();
    
//         const thoughts = await Thought.find({}).populate('creator');
//         return new Response (JSON.stringify(thoughts), {status:200})
//     } catch (error) {
//         return new Response( "Failed to fetch all the data", {status:500})
//     }
// }



// import { connectToDB } from "@utils/database";
// import Thought from "@models/thought";  

// export const GET = async (request) => {
//     try {
//         // Temporarily disable caching by bypassing any caching mechanisms
        
//         // Connect to the database
//         await connectToDB();
    
//         // Fetch fresh data from the database without relying on cached responses
//         const thoughts = await Thought.find({}).populate('creator');
        
//         // Return the response with fresh data
//         return new Response(JSON.stringify(thoughts), { status: 200 });
//     } catch (error) {
//         // Handle errors if any
//         return new Response("Failed to fetch all the data", { status: 500 });
//     }
// }

import Thought from "@models/thought";
import { connectToDB } from "@utils/database";

export const GET = async () => {
    try {
        await connectToDB()

        const Thoughts = await Thought.find({}).populate('creator')

        return new Response(JSON.stringify(Thoughts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all Thoughts", { status: 500 })
    }
} 