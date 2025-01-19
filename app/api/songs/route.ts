import { NextRequest, NextResponse } from "next/server";
import connectToMongodb from "../../../lib/mongodb";
import Song from "../../../models/song";

export const dynamic = 'force-static'

export async function POST(request:NextRequest) {
    try {
        await connectToMongodb()
        const formData = await request.formData()

        const instrumentData = {
            instrument_name: formData.get('instrument_name'),
            instrument_img: formData.get('instrument_img'),
            books: formData.get('books') || []
        }

        const newInstrument = new Song(instrumentData)
        await newInstrument.save()

        return Response.json({ success: true, message: 'Instrument added successfully' })
    } catch (error) {
        return Response.json({ 
            success: false, 
            error: 'Failed to add Instrument' 
        })
    }
}

export async function GET (){
    await connectToMongodb();
    const songs = await Song.find();
    return NextResponse.json({songs})
}



