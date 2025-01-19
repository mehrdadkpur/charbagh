import { NextResponse } from "next/server";
import connectToMongodb from "@/lib/mongodb";
import Photo from "@/models/photo";

export const dynamic = 'force-static'

export async function POST(request) {
    try {
        await connectToMongodb()
        const formData = await request.formData()

        const photoData = {
            title: formData.get('title'),
            url: formData.get('url'),
            category: formData.get('category'),
            description: formData.get('description'),
            photoDate:formData.get("photoDate"),
            tags: formData.get('tags') || []
        }

        const newPhoto = new Photo(photoData)
        await newPhoto.save()

        return Response.json({ success: true, message: 'Photo added successfully' })
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: 'Failed to add Photo' 
        })
    }
}

export async function GET() {
    await connectToMongodb()
    const photos = await Photo.find().sort({ createdAt: -1 })
    
    return NextResponse.json({ photos })
}
