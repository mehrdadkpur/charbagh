import connectToMongodb from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Photo from "@/models/photo";
import path from "path";
import fs from 'fs/promises'

export const dynamic = 'force-static'

interface RouteSegment {
    params: Promise<{
        id: string
    }>
}

export async function GET(request: NextRequest, { params }: RouteSegment) {
  const { id } = await params
  
  try {
      await connectToMongodb()
      const photo = await Photo.findById(id)
      
      if (!photo) {
          return NextResponse.json({ message: 'Photo not found' }, { status: 404 })
      }

      return NextResponse.json(photo)
  } catch (error) {
      return NextResponse.json({ message: 'Failed to fetch photo' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: RouteSegment) {
    const { id } =await params;

    try {
        const photoData = await request.json();

        console.log(photoData);
        
        
        await connectToMongodb();

        const updatedPhoto = await Photo.findByIdAndUpdate( id, {...photoData }, { new: true } );

        if (!updatedPhoto) {
            return NextResponse.json({ message: 'Photo not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Photo Edited!' }, { status: 200 });
    } catch (error) {
        console.error('Error updating Photo:', error);
        return NextResponse.json({ message: 'Failed to update Photo' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: RouteSegment ) {
  const{id} = await params;
  try {
      await connectToMongodb()
      
      const photo = await Photo.findById(id)
      if (!photo) {
          return NextResponse.json({ message: 'Photo not found' }, { status: 404 })
      }

      // Extract image path from URL
      const imageUrl = photo.url
      const relativePath = imageUrl.replace('/uploads/images/gallery/photos', '')
      const absolutePath = path.join(process.cwd(), 'public/uploads/images/gallery/photos', relativePath)

      // Delete image file
      try {
          await fs.unlink(absolutePath)
      } catch (fileError) {
          console.log('File deletion error:', fileError)
      }
      
      // Delete photo from database
      await Photo.findByIdAndDelete(id)

      return NextResponse.json({ message: 'Photo deleted successfully' }, { status: 200 })
  } catch (error) {
      console.log('Delete error:', error)
      return NextResponse.json({ message: 'Failed to delete Photo' }, { status: 500 })
  }
}
