import { connectToDB } from "@utils/database";
import UserProfile from "@models/UserProfile";

export const POST = async (req) => {
  try {
    const { userId, quirkId, bio, image } = await req.json();
    if (!userId || !quirkId || !bio || !image) {
      throw new Error("Missing required fields in the request body");
    }
    const UserExist = UserProfile.findOne({userId});

    // if(UserExist){
    //   return new Response ({message : 'quirkId is already exist , try something new '}, {status:201})
    // }
    await connectToDB();
    const newUserProfile = new UserProfile({
      creator: userId,
      quirkId,
      bio,
      image,
    });

    await newUserProfile.save();

    return new Response(
      JSON.stringify({ message: "Profile created successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create a Profile:", error);
    return new Response("Failed to create a Profile", { status: 500 });
  }
};
