import mongoose, {Schema}from "mongoose";

const SongsSchema = new Schema(
    {
    instrument_name:{type:String,require:true},
    instrument_img:{type:String,require:true},
    books:[
        {
            book_name:{type:String,require:true},
            songs:[
                {
                    song_title:{type:String,require:true},
                    song_artist:{type:String,require:true},
                    song_url:{type:String,require:true},
                }
            ]
        }
    ]
},
{timestamps:true}
);
const Song =mongoose.models.Song || mongoose.model("Song", SongsSchema)

export default Song;
