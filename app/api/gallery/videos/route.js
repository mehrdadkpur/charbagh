import { NextResponse } from "next/server";
import connectToMongodb from "@/lib/mongodb";
import Video from "@/models/video";

export const dynamic = 'force-static'

export async function POST(request) {
    try {
        await connectToMongodb()
        const data = await request.json()
        console.log(data);
        
        const videoData = {
            title: data.title,
            url: data.url,
            category: data.category,
            description: data.description,
            videoDate: data.videoDate,
            tags: Array.isArray(data.tags) ? data.tags : [data.tags]
        }

        const newVideo = new Video(videoData)
        await newVideo.save()

        return NextResponse.json({ 
            success: true, 
            message: 'Video added successfully',
            video: newVideo 
        })
    } catch (error) {
        console.log('Error creating video:', error)
        return NextResponse.json({ 
            success: false, 
            error: 'Failed to add Video' 
        }, { status: 500 })
    }
}

export async function GET() {
    await connectToMongodb()
    const videos = await Video.find().sort({ createdAt: -1 })
    
    return NextResponse.json({ videos })
}
