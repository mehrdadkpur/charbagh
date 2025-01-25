import { NextRequest, NextResponse } from "next/server";
import connectToMongodb from "@/lib/mongodb";
import Instrument from "@/models/instrument";

interface InstrumentFormData {
    instrument_name: string;
    instrument_teachers: string[];
    instrument_img: string;
    instrument_type: string;
    instrument_description: string;
    instrument_origin: string;
  }

export async function GET() {
    await connectToMongodb();
    const instruments = await Instrument.find();
    return NextResponse.json({instruments});
}

export const POST = async (request: NextRequest) => {
  try {
    await connectToMongodb();
    const formData = await request.formData();
    
    const teacherIds = formData.get("instrument_teachers")?.toString().split(',')
      .map(id => id.trim())
      .filter(Boolean);

    const instrumentData: InstrumentFormData = {
      instrument_name: formData.get('instrument_name')?.toString() || '',
      instrument_teachers: teacherIds || [],
      instrument_img: formData.get('instrument_img')?.toString() || '',
      instrument_type: formData.get('instrument_type')?.toString() || '',
      instrument_description: formData.get('instrument_description')?.toString() || '',
      instrument_origin: formData.get('instrument_origin')?.toString() || '',
    };

    const newInstrument = new Instrument(instrumentData);
    await newInstrument.save();

    return new Response(null, { 
      status: 302, 
      headers: { 'Location': '/dashboard/instruments' } 
    });
  } catch (error) {
    return new Response('Failed To Add Instrument', { status: 500 });
  }
}


