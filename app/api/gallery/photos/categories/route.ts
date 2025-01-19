import  connectToMongodb  from '@/lib/mongodb'
import Photo from '@/models/photo'
import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

export async function GET() {
    await connectToMongodb()
    const categories = await Photo.distinct('category')
    return NextResponse.json({ categories })
}
