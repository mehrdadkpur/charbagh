import  connectToMongodb  from '@/lib/mongodb'
import Video from '@/models/video'
import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

export async function GET() {
    await connectToMongodb()
    const categories = await Video.distinct('category')
    return NextResponse.json({ categories })
}
