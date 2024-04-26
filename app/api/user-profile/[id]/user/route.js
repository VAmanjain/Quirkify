import UserProfile from "@models/UserProfile";
import { connectToDB } from "@utils/database";
  

export const GET =async(request, {params})=>{
    try {
        await connectToDB();
        const UserProfiles = await UserProfile.find({creator: params.id}).populate('creator');
        return new Response (JSON.stringify({UserProfiles}), {status:200})
    } catch (error) {
        return new Response( "Failed to fetch all the data", {status:500})
    }
}