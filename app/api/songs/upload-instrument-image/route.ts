import { writeFile, mkdir, unlink } from 'fs/promises'
import { NextRequest } from 'next/server'
import { join } from 'path'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const instrument_name = formData.get('instrumentName') as string
    const previousUrl = formData.get('previousUrl') as string | null;

    const baseDir = 'public/uploads/images/songs/instruments'

    // Extract the previous filename correctly from the full URL path
    if (previousUrl) {
      const previousFileName = previousUrl.split('/uploads/images/songs/instruments').pop();
      if (previousFileName) {
        const previousFilePath = join(process.cwd(), baseDir, previousFileName);
        await unlink(previousFilePath);
      }
    }

    const uploadDir = join(process.cwd(), baseDir)
    await mkdir(uploadDir, { recursive: true })

    // Add a timestamp or unique identifier to the filename
    const timestamp = Date.now();
    const filename = `${instrument_name}_${timestamp}.${file.name.split('.').pop()}`
    const filepath = join(uploadDir, filename)

    const bytes = await file.arrayBuffer()
    const buffer = new Uint8Array(bytes) // Convert ArrayBuffer to Uint8Array
    await writeFile(filepath, buffer) // Use the Uint8Array directly

    const imageUrl = `/uploads/images/songs/instruments/${filename}`

    return new Response(JSON.stringify({ url: imageUrl }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Upload failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
