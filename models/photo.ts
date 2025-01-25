import mongoose from 'mongoose'

const photoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    photoDate:{type:String, required:true},
    tags: [{ type: String }]
}, 
{timestamps: true}
)

const Photo = mongoose.models.Photo || mongoose.model('Photo', photoSchema)
export default Photo
