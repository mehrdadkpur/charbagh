import connectToMongodb from "@/lib/mongodb"
import Guidance from "@/models/guidance"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = 'force-static'

export async function POST(request:NextRequest) {
    try {
        await connectToMongodb()
        
        const guidanceData = await request.json()
        
        const newGuidance = await Guidance.create(guidanceData)
        
        return NextResponse.json({ 
            success: true,
            message: 'Guidance created successfully',
            guidance: newGuidance 
        }, { status: 201 })
        
    } catch (error) {
        console.error('Guidance creation error:', error)
        return NextResponse.json({ 
            success: false, 
            message: 'Failed to create Guidance'
        }, { status: 500 })
    }
}

export async function GET() {
    await connectToMongodb();
    const guidances = await Guidance.find();
    return NextResponse.json({guidances})
}