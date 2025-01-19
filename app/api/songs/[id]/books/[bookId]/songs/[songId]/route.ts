import connectToMongodb from "@/lib/mongodb";
import Song from "@/models/song";
import { unlink } from 'fs/promises';
import path from 'path';
import { NextRequest } from "next/server";

export const dynamic = 'force-static'


interface RouteParams {
    params: Promise<{
        id: string;
        bookId: string;
        songId: string;
    }>
}

interface SongUpdateData {
    song_title: string;
    song_artist: string;
    song_url: string;
    song_img: string;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    await connectToMongodb()
    const { id, bookId, songId } = await params
    const { song_title, song_artist, song_url, song_img }: SongUpdateData = await request.json()

    const updatedInstrument = await Song.findOneAndUpdate(
        { 
            _id: id,
            "books._id": bookId,
            "books.songs._id": songId 
        },
        { 
            $set: { 
                "books.$[book].songs.$[song].song_title": song_title,
                "books.$[book].songs.$[song].song_artist": song_artist,
                "books.$[book].songs.$[song].song_url": song_url,
                "books.$[book].songs.$[song].song_img": song_img,
            } 
        },
        { 
            new: true,
            arrayFilters: [
                { "book._id": bookId },
                { "song._id": songId }
            ]
        }
    )    

    return Response.json({
        success: true,
        message: 'Song updated successfully',
        data: updatedInstrument
    })
}

export async function DELETE(request: NextRequest, { params }:RouteParams) {
    try {
        await connectToMongodb();
        const { id, bookId,songId } = await params;

        // First, get the song details to access file paths
        const instrument = await Song.findById(id);
        const book = await instrument.books.id(bookId);
        const song = await book.songs.id(songId);

        // Delete song image and audio file
        if (song.song_img) {
            const songImagePath = path.join(process.cwd(), 'public', song.song_img);
            await unlink(songImagePath);
        }
        
        if (song.song_url) {
            const songFilePath = path.join(process.cwd(), 'public', song.song_url);
            await unlink(songFilePath);
        }

        // Remove song from database
        const updatedInstrument = await Song.findOneAndUpdate(
            { 
                _id:id,
                "books._id":bookId 
            },
            { 
                $pull: { 
                    "books.$.songs": { 
                        _id:songId 
                    } 
                } 
            },
            { new: true }
        );

        return Response.json({ 
            success: true,
            message: "Song and associated files deleted successfully",
            data: updatedInstrument
        });

    } catch (error) {
        console.error('Delete error:', error);
        return Response.json({ 
            success: false,
            message: "Error deleting song" 
        }, { status: 500 });
    }
}









