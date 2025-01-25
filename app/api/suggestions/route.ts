import { NextRequest, NextResponse } from "next/server";
import connectToMongodb from "../../../lib/mongodb";
import Suggestion from "../../../models/suggestion";

export async function POST (request:NextRequest){

    const {name:name,members:[members]} = await request.json();
    await connectToMongodb();
    await Suggestion.create({name:name,members:[members]})
    return NextResponse.json({message:"Suggestion Created"} , {status:201})

}


export async function GET (){
    await connectToMongodb();
    const suggestions = await Suggestion.find();
    return NextResponse.json({suggestions})
}


export async function DELETE (request:NextRequest){
    const id =request.nextUrl.searchParams.get("id");
    await connectToMongodb();
     await Suggestion.findByIdAndDelete(id);
    return NextResponse.json({message:"Suggestion Deleted"},{status:200})
}
