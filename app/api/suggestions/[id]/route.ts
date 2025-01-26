import { NextRequest, NextResponse } from "next/server";
import connectToMongodb from "@/lib/mongodb";
import Suggestion from "@/models/suggestion";

interface RouteSegment {
  params: Promise<{
    id: string
  }>
}

export async function GET(request: NextRequest, { params }: RouteSegment): Promise<NextResponse> {
  const { id } = await params;

  try {
    await connectToMongodb();
    const suggestion = await Suggestion.findById(id);

    if (!suggestion) {
      return NextResponse.json({ message: 'Suggestion not found' }, { status: 404 });
    }

    return NextResponse.json(suggestion);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch suggestion' }, { status: 500 });
  }
}


export async function PUT (request:NextRequest , { params }: RouteSegment): Promise<NextResponse>{
    const {id} = await params;
    const {
        newName:name ,
        newMembers:members , 
         
    } = await request.json();
    await connectToMongodb();
    await Suggestion.findByIdAndUpdate(id ,{name,members});
    return NextResponse.json({message:'Suggestion Category Edited!'}, {status:200});
}
