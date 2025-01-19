import { NextRequest, NextResponse } from 'next/server';
import connectToMongodb from "@/lib/mongodb";
import Song from "@/models/song";

export const dynamic = 'force-static'

interface RouteSegment {
    params: Promise<{
        id: string
    }>
}

export async function POST(request: NextRequest, { params }: RouteSegment) {
    await connectToMongodb();
    const {id} = await params;
    const formData = await request.formData();

    const bookData = {
        book_name: formData.get('book_name'),
        book_img: formData.get('book_img'),
        songs: []
    };

    const updatedInstrument = await Song.findByIdAndUpdate(
        id,
        { $push: { books: bookData } },
        { new: true }
    );

    return NextResponse.json({
        success: true,
        message: 'Book added successfully',
        data: updatedInstrument
    });
}

