import mongoose, {Schema} from "mongoose";

const instrumentSchema = new Schema (
    {
        instrument_name:{type:String , require:true},
        instrument_type:{type:String,require:true},
        instrument_origin:{type:String,require:true},
        instrument_description:{type:String,require:true},
        instrument_img:{type:String,require:true},
        instrument_teachers:[{ type: String }]
    },
    {timestamps:true}
);

const Instrument =mongoose.models.Instrument || mongoose.model("Instrument", instrumentSchema)

export default Instrument;