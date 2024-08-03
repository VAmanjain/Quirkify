import { connectToCloudinary } from "@utils/cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// Configure Cloudinary with your credentials

export const POST = async (req) => {
  try {
    const { publicId } = await req.json();
    console.log("inside Api:", publicId);
    await connectToCloudinary();
    if (!publicId) {
      return NextResponse.json(
        { error: "publicId is required" },
        { status: 400 }
      );
    }
    if (Array.isArray(publicId)) {
      const result = await cloudinary.api.delete_resources(publicId, {
        type: "upload",
        resource_type: "image",
      });
      console.log(result);
      return NextResponse.json({ message: "Images deleted successfully" });
    } else {
      const result = await cloudinary.uploader.destroy(publicId, {
        invalidate: true, // Optional: Invalidate cached versions
      });
    }

    return NextResponse.json({ message: "Image deleted successfully" });
    // return result;
  } catch (error) {
    console.error("Error deleting image:", error);
    // throw error; // Rethrow the error for handling in your application
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
