import { NextResponse } from "next/server";
import connectToMongodb from "@/lib/mongodb";
import Instrument from "@/models/instrument";

export async function GET() {
    await connectToMongodb();
    const instruments = await Instrument.find();
    return NextResponse.json({instruments});
}


export const POST = async (request) => {
    try {
        await connectToMongodb()
        const formData = await request.formData();
        
        // Convert teachers string to array of ObjectIds
        const teacherIds = formData.get("instrument_teachers").split(',').map(id => id.trim())
        
        const instrumentData = {
            instrument_name: formData.get('instrument_name'),
            instrument_teachers: teacherIds,
            instrument_img: formData.get('instrument_img'),
            instrument_type: formData.get('instrument_type'),
            instrument_description: formData.get('instrument_description'),
            instrument_origin: formData.get('instrument_origin'),
        }

        const newInstrument = new Instrument(instrumentData);
        await newInstrument.save();

        return new Response(null, { status: 302, headers: { 'Location': '/dashboard/instruments' } });
    } catch (error) {
        return new Response('Failed To Add Instrument', { status: 500 })
    }
}

