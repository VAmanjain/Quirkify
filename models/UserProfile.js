import { Schema, model, models } from "mongoose";

const UserProfileSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User' // Ensure the 'User' model is properly defined
  },
  quirkId: {
    type: String,
    required: [true, "QuirkId is required"],
    unique: true // Ensure unique constraint is defined properly
  },
  bio: {
    type: String,
    required: [true, "Bio is required"],
  },
  image: String, // Shortened syntax for String type
  createAt: { type: Date, default: Date.now }, // Simplified definition
  updateAt: { type: Date, default: Date.now },
});

// Ensure that the collection name is pluralized ('userProfiles')
const UserProfile = models.UserProfile || model("UserProfile", UserProfileSchema, 'userProfiles');

export default UserProfile;
