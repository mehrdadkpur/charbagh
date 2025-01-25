import mongoose, {Schema} from "mongoose";

const commentSchema = new Schema (
    {
        author:{type:String , require:true},
        text:{type:String , require:true},
        date:{type:String , require:true}
    },
    {timestamps:true}
);

const Comment =mongoose.models.Comment || mongoose.model("Comment", commentSchema)

export default Comment;