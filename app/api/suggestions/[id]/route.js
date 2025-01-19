import connectToMongodb from "@/lib/mongodb";
import Suggestion from "@/models/suggestion";
import { NextResponse } from "next/server";

export const dynamic = 'force-static'

export async function PUT (request , {params}){
    const {id} = params;
    const {
        newName:name ,
        newMembers:members , 
         
    } = await request.json();
    await connectToMongodb();
    await Suggestion.findByIdAndUpdate(id ,{name,members});
    return NextResponse.json({message:'Suggestion Category Edited!'}, {status:200});
}

export async function GET (request , {params}){
    const {id} = params
    await connectToMongodb();
    const suggestion = await Suggestion.findOne({_id:id});
    return NextResponse.json({suggestion},{status:200})
}