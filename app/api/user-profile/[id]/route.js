import UserProfile from "@models/UserProfile";
import { connectToDB } from "@utils/database"


export const GET = async( {params})=>{
    try {
        await connectToDB();
        const user = await UserProfile.findById(params.id).populate("creator");
        if(!user) return new Response("user not found", {status:404});
        return new Response(JSON.stringify(user), {status:200});
    } catch (error) {
        return new Response("Error in retrive user", {status:500});
    }
}
export const PATCH = async (request, { params }) => {
    const { quirkId, bio, image } = await request.json();

    try {
        await connectToDB();

        
        const existingPrompt = await UserProfile.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        existingPrompt.quirkId = quirkId;
        existingPrompt.bio = bio;
        existingPrompt.image = image;
        existingPrompt.updateAt = Date.now();
        

        await existingPrompt.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};


