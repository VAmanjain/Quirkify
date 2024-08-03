import { Schema, model, models } from "mongoose";

const ThoughtWithImageSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  thought: {
    type: String,
    required: [true, "Thought is required"],
  },
  tag: [{
    type: String,
  }],
  star: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  images: [{
    public_id: {
      type: String,
      required: [true, "public_id is required"],
    },
    url: {
      type: String, 
      required: [true, "URL is required"],
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const ThoughtWithImages = models.ThoughtWithImages || model("ThoughtWithImages", ThoughtWithImageSchema);

export default ThoughtWithImages;