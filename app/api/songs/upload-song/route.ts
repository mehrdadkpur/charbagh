import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { unlink } from 'fs/promises';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const song_name = formData.get('songTitle') as string;
        const song_artist = formData.get('songArtist') as string;
        const song_url = formData.get('previousSongUrl') as string;
        const previousSongUrl = formData.get('previousUrl') as string | null;

        const baseDir = 'public/uploads/songs';

        console.log('Previous URL:', previousSongUrl); // Log for debugging

        if (previousSongUrl) {
            const previousSongFileName = previousSongUrl.split('/uploads/songs/').pop();
            console.log('Previous Filename:', previousSongFileName); // Log for debugging

            if (previousSongFileName) {
                const previousFilePath = join(process.cwd(), baseDir, previousSongFileName);
                console.log('Previous File Path:', previousFilePath); // Log for debugging

                await unlink(previousFilePath);
                console.log('Successfully deleted:', previousSongFileName); // Log for debugging
            }
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const originalExtension = file.name.split('.').pop();
        const uniqueFileName = `${song_name}_${song_artist}_${Date.now()}.${originalExtension}`;
        const filePath = join(process.cwd(), baseDir, uniqueFileName);

        console.log('New File Path:', filePath); // Log for debugging

        await writeFile(filePath, new Uint8Array(buffer));
        const url = `/uploads/songs/${uniqueFileName}`;

        return new Response(JSON.stringify({ url }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Upload failed:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}




