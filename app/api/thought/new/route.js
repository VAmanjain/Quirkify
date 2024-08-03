// import { connectToDB } from "@utils/database";
import Thought from "@models/thought";

// export const POST = async (req) => {
//   const { userId, thought, tag } = await req.json();

//   try {
//     await connectToDB();
//     console.log(tag)
  
//     // Split the tag string into an array of tags
//     const tagArray = tag.split("#").filter(item => item !== '').filter(item => !item.includes("#"));

//     console.log(tagArray);

//     const newThought = new Thought({
//       creator: userId,
//       thought,
//       tag:tagArray, 
      
//     });

//     await newThought.save();

//     return new Response(JSON.stringify(newThought), { status: 201 });
//   } catch (error) {
//     return new Response("Failed to create a Post", { status: 501 });
//   }
// };

import { connectToDB } from "@utils/database";
// import ThoughtWithImages from "@models/thoughtWithImage";

export const POST = async (req) => {
  const { userId, thought, tag, images } = await req.json();

  try {
    await connectToDB();
    console.log(tag);
    console.log(images);

    // Split the tag string into an array of tags
    const tagArray = tag
      .split("#")
      .filter((item) => item !== "")
      .filter((item) => !item.includes("#"));
    console.log(tagArray);

    const newThought = new Thought({
      creator: userId,
      thought,
      tag: tagArray,
      images:images, // Assign the tagArray to the tag field of the Thought model
    });

    await newThought.save();

    return new Response(JSON.stringify(newThought), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a Post", { status: 501 });
  }
};
