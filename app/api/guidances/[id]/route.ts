import connectToMongodb from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Guidance from "../../../../models/guidance";

interface RouteSegment {
    params: Promise<{
        id: string
    }>
}

export const dynamic = 'force-static'


export async function PUT(request: NextRequest, { params }: RouteSegment) {
    const { id } = await params;

    try {
        const guidanceData = await request.json();
        
        await connectToMongodb();

        const updatedGuidance = await Guidance.findByIdAndUpdate( id, {...guidanceData }, { new: true } );

        if (!updatedGuidance) {
            return NextResponse.json({ message: 'Guidance not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Guidance Edited!' }, { status: 200 });
    } catch (error) {
        console.error('Error updating Guidance:', error);
        return NextResponse.json({ message: 'Failed to update Guidance' }, { status: 500 });
    }
}

export async function GET (request: NextRequest, { params }: RouteSegment) {
    const {id} = await params;
    try {
        await connectToMongodb();
        const guidance = await Guidance.findById(id);
        
        if (!guidance) {
            return new Response('Guidance Not Found', { status: 404 });
        }

        return new Response(JSON.stringify(guidance), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.log('Error fetching Guidance:', error);
        return new Response('Something Went Wrong', {
            status: 500
        });
    }
};

export async function DELETE(request: NextRequest, { params }: RouteSegment) {
    const{id} = await params;
    try {
        await connectToMongodb()
        
        const guidance = await Guidance.findById(id)
        if (!guidance) {
            return NextResponse.json({ message: 'Guidance not found' }, { status: 404 })
        }
        // Delete guidance from database
        await Guidance.findByIdAndDelete(id)

        return NextResponse.json({ message: 'Guidance deleted successfully' }, { status: 200 })
    } catch (error) {
        console.log('Delete error:', error)
        return NextResponse.json({ message: 'Failed to delete Instrument' }, { status: 500 })
    }
}


