import { Schema, model, models } from "mongoose";
// import {User} from "@models/user"

const ThoughtSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref:'User'
  },
  thought: {
    type: String,
    required: [true, "Thoughts is required"],
  },
  tag: [{
    type: String,
  }],
  star:[{
    type:Schema.Types.ObjectId,
    ref:'User'
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
const Thought = models.Thought || model("Thought", ThoughtSchema);

export default Thought;