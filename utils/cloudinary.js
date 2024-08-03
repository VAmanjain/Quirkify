import { v2 as cloudinary } from "cloudinary";

let isConnected = false;

export const connectToCloudinary = async () => {
  if (isConnected) {
    console.log("Cloudinary is already connected.");
  }

  try {
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    isConnected = true;
    console.log("Cloudinry is connected.");
  } catch (error) {
    console.log(error);
  }
};
