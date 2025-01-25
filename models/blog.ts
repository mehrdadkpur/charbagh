import mongoose, {Schema} from "mongoose";

const blogSchema = new Schema (
    {
        blog_author:{type:String , require:true},
        blog_title:{type:String,require:true},
        blog_text:{type:String,require:true},
        blog_img:{type:String,require:true},
    },
    {timestamps:true}
);

const Blog =mongoose.models.Blog || mongoose.model("Blog", blogSchema)

export default Blog;