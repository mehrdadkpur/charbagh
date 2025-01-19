// import { readdir } from 'fs/promises'
// import { NextRequest } from 'next/server'
// import { join } from 'path'

// export const dynamic = 'force-static'

// interface RouteSegment {
//   params: Promise<{
//       type: string
//   }>
// }



// export async function GET( request: NextRequest, { params }: RouteSegment) {
//   const { type } = await params

//   try {
//       // Validate type parameter
//       const validTypes = ['images', 'songs', 'videos']
//       if (!validTypes.includes(type)) {
//           return Response.json({ error: 'Invalid type' }, { status: 400 })
//       }

//       // Read directory contents
//       const dir = join(process.cwd(), 'public/uploads', type)
//       const files = await readdir(dir)

//       // Convert to URLs
//       const urls = files.map(file => `/uploads/${type}/${file}`)

//       return Response.json({ files: urls })
//   } catch (error) {
//       return Response.json({ error: 'Failed to read files' }, { status: 500 })
//   }
// }

import { readdir } from 'fs/promises'
import { NextRequest } from 'next/server'
import { join } from 'path'

export const dynamic = 'force-static'

interface RouteSegment {
  params: Promise<{
    type: string
  }>
}

// Define the generateStaticParams function
export async function generateStaticParams() {
  // Define the valid types
  const validTypes = ['images', 'songs', 'videos'];

  // Return the array of parameters
  return validTypes.map(type => ({ type }));
}

export async function GET(request: NextRequest, { params }: RouteSegment) {
  const { type } = await params;

  try {
    // Validate type parameter
    const validTypes = ['images', 'songs', 'videos'];
    if (!validTypes.includes(type)) {
      return Response.json({ error: 'Invalid type' }, { status: 400 });
    }

    // Read directory contents
    const dir = join(process.cwd(), 'public/uploads', type);
    const files = await readdir(dir);

    // Convert to URLs
    const urls = files.map(file => `/uploads/${type}/${file}`);

    return Response.json({ files: urls });
  } catch (error) {
    return Response.json({ error: 'Failed to read files' }, { status: 500 });
  }
}

