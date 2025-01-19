import connectToMongodb from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Song from "../../../../models/song";
import path from 'path';
import { unlink } from 'fs/promises';

interface RouteSegment {
    params: Promise<{
        id: string
    }>
}


export async function PUT(request: NextRequest, { params }: RouteSegment) {
    const { id } = await params;

    try {
        const instrumentData = await request.json();
        
        await connectToMongodb();

        const updatedInstrument = await Song.findByIdAndUpdate( id, {...instrumentData }, { new: true } );

        if (!updatedInstrument) {
            return NextResponse.json({ message: 'Instrument not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Instrument Edited!' }, { status: 200 });
    } catch (error) {
        console.error('Error updating Instrument:', error);
        return NextResponse.json({ message: 'Failed to update Instrument' }, { status: 500 });
    }
}

export const GET = async (request: NextRequest, { params }: RouteSegment) => {
    const {id} = await params;
    try {
        await connectToMongodb();
        const song = await Song.findById(id);
        
        if (!song) {
            return new Response('Song Not Found', { status: 404 });
        }

        return new Response(JSON.stringify(song), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.log('Error fetching song:', error);
        return new Response('Something Went Wrong', {
            status: 500
        });
    }
};


export async function DELETE(request: NextRequest, { params }: RouteSegment) {
    const { id } = await params;

    try {
        await connectToMongodb();
        
        const song = await Song.findById(id);
        if (!song) {
            return NextResponse.json({ message: 'Song not found' }, { status: 404 });
        }

        // Delete instrument image
        const instrumentImagePath = getAbsolutePath(song.instrument_img, 'instruments');
        await deleteFile(instrumentImagePath);

        // Delete all books' images and songs
        for (const book of song.books) {
            // Delete all songs in the book
            for (const songItem of book.songs) {
                // Delete song file
                const songFilePath = getAbsolutePath(songItem.song_url, 'audio');
                await deleteFile(songFilePath);
            }
        }

        // Delete the main document
        await Song.findByIdAndDelete(id);

        return NextResponse.json({ message: 'Song and all associated files deleted successfully' }, { status: 200 });
    } catch (error) {
        console.log('Delete error:', error);
        return NextResponse.json({ message: 'Failed to delete Song' }, { status: 500 });
    }
}

function getAbsolutePath(fileUrl: string, type: 'instruments' | 'books' | 'songs' | 'audio'): string {
    // Remove any leading slash
    const cleanUrl = fileUrl.startsWith('/') ? fileUrl.slice(1) : fileUrl;
    
    // For audio files
    if (type === 'audio') {
        return path.join(process.cwd(), 'public', cleanUrl);
    }
    
    // For image files
    return path.join(process.cwd(), 'public', 'uploads', 'images', 'songs', type, path.basename(cleanUrl));
}


async function deleteFile(filePath: string): Promise<void> {
    try {
        await unlink(filePath);
    } catch (error) {
        console.log(`File deletion warning for ${filePath}:`, error);
    }
}

