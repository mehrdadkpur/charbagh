import mongoose, {Schema} from "mongoose";

const guidanceSchema = new Schema (
    {
        fullname:{type:String , require:true},
        mobile:{type:String,require:true},
        status:{type:String , require:true , enum: ['در انتظار مشاوره', 'مشاوره شد'],}
    },
    {timestamps:true}
);

const Guidance =mongoose.models.Guidance || mongoose.model("Guidance", guidanceSchema)

export default Guidance;