import connectToMongodb from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Instrument from "../../../../models/instrument";
import path from 'path'
import fs from 'fs/promises'

interface RouteSegment {
    params: Promise<{
        id: string
    }>
}

export const dynamic = 'force-static'

export async function PUT(request: NextRequest, { params }: RouteSegment) {
    const { id } =await params;

    try {
        const instrumentData = await request.json();
        
        await connectToMongodb();

        const updatedInstrument = await Instrument.findByIdAndUpdate( id, {...instrumentData }, { new: true } );

        if (!updatedInstrument) {
            return NextResponse.json({ message: 'Instrument not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Instrument Edited!' }, { status: 200 });
    } catch (error) {
        console.error('Error updating Instrument:', error);
        return NextResponse.json({ message: 'Failed to update Instrument' }, { status: 500 });
    }
}

export async function GET (request: NextRequest, { params }: RouteSegment) {
    const {id} = await params;
    try {
        await connectToMongodb();
        const instrument = await Instrument.findById(id);
        
        if (!instrument) {
            return new Response('instrument Not Found', { status: 404 });
        }

        return new Response(JSON.stringify(instrument), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.log('Error fetching instrument:', error);
        return new Response('Something Went Wrong', {
            status: 500
        });
    }
};

export async function DELETE(request: NextRequest, { params }: RouteSegment) {
    const{id} = await params;
    try {
        await connectToMongodb()
        
        const instrument = await Instrument.findById(id)
        if (!instrument) {
            return NextResponse.json({ message: 'Instrument not found' }, { status: 404 })
        }

        // Extract image path from URL
        const imageUrl = instrument.instrument_img
        const relativePath = imageUrl.replace('/uploads/images/instruments', '')
        const absolutePath = path.join(process.cwd(), 'public/uploads/images/instruments', relativePath)

        // Delete image file
        try {
            await fs.unlink(absolutePath)
        } catch (fileError) {
            console.log('File deletion error:', fileError)
        }
        
        // Delete instrument from database
        await Instrument.findByIdAndDelete(id)

        return NextResponse.json({ message: 'Instrument deleted successfully' }, { status: 200 })
    } catch (error) {
        console.log('Delete error:', error)
        return NextResponse.json({ message: 'Failed to delete Instrument' }, { status: 500 })
    }
}


