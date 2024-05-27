import { connectToDB } from "@utils/database";
import UserProfile from "@models/UserProfile";

export const POST = async (req) => {
  try {
    const { userId, quirkId, bio, image } = await req.json();
    if (!userId || !quirkId || !bio || !image) {
      throw new Error("Missing required fields in the request body");
    }

    await connectToDB();

    // Check if a user profile with the same userId already exists
    const existingUserProfile = await UserProfile.findOne({ creator: userId });
    if (existingUserProfile) {
      return new Response(
        JSON.stringify({ message: "A profile with the same userId already exists" }),
        { status: 409 } // Conflict status code
      );
    }

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