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


// import Thought from "@models/thought";
// import { connectToDB } from "@utils/database";
// import { NextResponse } from 'next/server';

// export async function GET(request) {
//   try {
//     await connectToDB()

//     const Thoughts = await Thought.find({}).populate('creator');

//     return new NextResponse(
//       async function* () {
//         for (const thought of Thoughts) {
//           yield `data: ${JSON.stringify(thought)}\n\n`;
//         }
//       },
//       {
//         headers: {
//           'Content-Type': 'text/event-stream',
//           'Cache-Control': 'no-cache, no-transform',
//           'Connection': 'keep-alive'
//         }
//       }
//     );
//   } catch (error) {
//     return new NextResponse("Failed to fetch all Thoughts", { status: 500 });
//   }
// }