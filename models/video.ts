import mongoose from 'mongoose'

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    description:{type:String , required:true},
    category: { type: String, required: true },
    videoDate: { type: String, required: true }, 
    tags: [{ type: String }],
}, 
{timestamps:true}
)

const Video = mongoose.models.Video || mongoose.model('Video', videoSchema)
export default Video;
