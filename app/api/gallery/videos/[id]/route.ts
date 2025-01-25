import connectToMongodb from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Video from "@/models/video";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = params

  try {
    await connectToMongodb()
    const video = await Video.findById(id)
    
    if (!video) {
      return NextResponse.json({ message: 'Video not found' }, { status: 404 })
    }

    return NextResponse.json(video)
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch Video' }, { status: 500 })
  }
}


export async function PUT(request:NextRequest, { params }:RouteParams) {
    const { id } = params;

    try {
        const photoData = await request.json();

        console.log(photoData);
        
        
        await connectToMongodb();

        const updatedPhoto = await Video.findByIdAndUpdate( id, {...photoData }, { new: true } );

        if (!updatedPhoto) {
            return NextResponse.json({ message: 'Video not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Video Edited!' }, { status: 200 });
    } catch (error) {
        console.error('Error updating Video:', error);
        return NextResponse.json({ message: 'Failed to update Video' }, { status: 500 });
    }
}

export async function DELETE(request:NextRequest, { params }:RouteParams) {
  try {
    await connectToMongodb();
    const { id } = params;
    await Video.findByIdAndDelete(id);
    
    return NextResponse.json({ message: "Video deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting Video" }, { status: 500 });
  }
}
