import connectToMongodb from "@/lib/mongodb";
import Song from "@/models/song";
import { NextRequest } from "next/server";

interface RouteParams {
    params: Promise<{
        id: string;
        bookId: string;
    }>
}

export const dynamic = 'force-static'

export async function GET(request: NextRequest, { params }:  RouteParams) {
    await connectToMongodb()
    const { id, bookId } = await params;
    const instrument = await Song.findOne(
        { _id:id, "books._id":bookId },
        { "books.$": 1 }
    )
    
    return Response.json({ 
        success: true, 
        data: instrument?.books[0]
    })
}

export async function POST(request: NextRequest, { params }: RouteParams) {
    await connectToMongodb();
    const formData = await request.formData();
    const { id, bookId } = await params;

    const songData = {
        song_title: formData.get('song_title'),
        song_artist: formData.get('song_artist'),
        song_url: formData.get('song_url'),
        song_img: formData.get('song_img'),
        length: formData.get('length')
    };

    const newSong = await Song.findOneAndUpdate(
        { 
            _id: id,
            "books._id": bookId 
        },
        { 
            $push: { "books.$.songs": songData } 
        },
        { new: true }
    );

    return Response.json({
        success: true,
        message: 'Song added successfully',
        data: newSong
    });
}

export async function PUT(request: NextRequest, {params}:  RouteParams) {
    await connectToMongodb()
    const { id, bookId } = await params;
    const { book_name, book_img } = await request.json()

    const updatedInstrument = await Song.findOneAndUpdate(
        { 
            _id:id,
            "books._id":bookId 
        },
        { 
            $set: { 
                "books.$.book_name": book_name,
                "books.$.book_img": book_img
            } 
        },
        { new: true }
    )

    return Response.json({
        success: true,
        message: 'Book updated successfully',
        data: updatedInstrument
    })
}

export async function DELETE(request: NextRequest, {params}:  RouteParams) {
    try {
        await connectToMongodb()
        const { id, bookId } = await params;
        const updatedInstrument = await Song.findOneAndUpdate(
            { _id:id },
            { $pull: { books: { _id:bookId } } },
            { new: true }
        )

        return Response.json({ 
            success: true,
            message: "Book deleted successfully",
            data: updatedInstrument
        })

    } catch (error) {
        return Response.json({ 
            success: false,
            message: "Error deleting Book" 
        }, { status: 500 })
    }
}







