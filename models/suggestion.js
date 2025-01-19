import mongoose, {Schema} from "mongoose";

const suggestionSchema = new Schema (
    {
        name:String,
        members:[String],
    },
    {timestamps:true}
);

const Suggestion =mongoose.models.Suggestion || mongoose.model("Suggestion", suggestionSchema)

export default Suggestion;