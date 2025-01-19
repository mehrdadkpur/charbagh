import { NextResponse } from "next/server";
import connectToMongodb from "../../../lib/mongodb";
import Comment from "../../../models/comment";

export async function POST (request){

    const {author,text,date} = await request.json();
    await connectToMongodb();
    await Comment.create({author,text,date})
    return NextResponse.json({message:"Comment Created"} , {status:201})

}

export async function GET (){
    await connectToMongodb();
    const comments = await Comment.find();
    return NextResponse.json({comments})
}

export async function DELETE (request){
    const id =request.nextUrl.searchParams.get("id");
    await connectToMongodb();
     await Comment.findByIdAndDelete(id);
    return NextResponse.json({message:"Comment Deleted"},{status:200})
}

