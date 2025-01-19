import connectToMongodb from "@/lib/mongodb";
import Song from "@/models/song";
import { NextRequest } from "next/server";
import { unlink } from 'fs/promises';
import path from 'path';

interface RouteParams {
    params: Promise<{
        id: string;
        bookId: string;
    }>
}

export async function GET( request: NextRequest, { params }: RouteParams) {
    const { id, bookId } = await params
    await connectToMongodb()
    
    const instrument = await Song.findOne(
        { _id: id, "books._id": bookId },
        { "books.$": 1 }
    )
    
    return Response.json({ 
        success: true, 
        data: instrument?.books[0]
    })
}

export async function POST(request: NextRequest, {params}: RouteParams) {
    const { id, bookId } = await params
    await connectToMongodb()
    const formData = await request.formData()

    const songData = {
        song_title: formData.get('song_title'),
        song_artist: formData.get('song_artist'),
        song_url: formData.get('song_url'),
        song_img: formData.get('song_img'),
        length: formData.get('length')
    }

    const newSong = await Song.findOneAndUpdate(
        { 
            _id:id,
            "books._id": bookId 
        },
        { 
            $push: { "books.$.songs": songData } 
        },
        { new: true }
    )

    return Response.json({
        success: true,
        message: 'Song added successfully',
        data: newSong
    })
}

export async function PUT(request: NextRequest, {params}: RouteParams) {
    const { id, bookId } = await params

    await connectToMongodb()
    const { book_name, book_img } = await request.json()

    const updatedInstrument = await Song.findOneAndUpdate(
        { 
            _id:id,
            "books._id": bookId 
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

export async function DELETE(request: NextRequest, {params}: RouteParams) {
    const { id, bookId } = await params

    try {
        await connectToMongodb();

        // First, get the book details to access file paths
        const instrument = await Song.findById(id);
        const book = await instrument.books.id(bookId);

        // Delete book cover image
        if (book.book_img) {
            const bookImagePath = path.join(process.cwd(), 'public', book.book_img);
            await unlink(bookImagePath);
        }

        // Delete all song files and images in the book
        for (const song of book.songs) {
            if (song.song_img) {
                const songImagePath = path.join(process.cwd(), 'public', song.song_img);
                await unlink(songImagePath);
            }
            if (song.song_url) {
                const songFilePath = path.join(process.cwd(), 'public', song.song_url);
                await unlink(songFilePath);
            }
        }

        // Remove book from database
        const updatedInstrument = await Song.findOneAndUpdate(
            { _id: id },
            { $pull: { books: { _id:bookId } } },
            { new: true }
        );

        return Response.json({ 
            success: true,
            message: "Book and associated files deleted successfully",
            data: updatedInstrument
        });

    } catch (error) {
        return Response.json({ 
            success: false,
            message: "Error deleting Book" 
        }, { status: 500 });
    }
}







