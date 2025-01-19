import { NextResponse } from 'next/server'
import  connectToMongodb  from '@/lib/mongodb'
import Teacher from '@/models/teacher'

export const dynamic = 'force-static'

export async function GET(request: Request) {
    const nationalityNumber = request.url.split('/').pop()
    
    try {
        await connectToMongodb()
        
        const teacher = await Teacher.findOne({ nationalityNumber })
        return NextResponse.json({ exists: !!teacher })
        
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to check teacher' },
            { status: 500 }
        )
    }
}
