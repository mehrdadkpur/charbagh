import { writeFile, unlink, mkdir } from 'fs/promises'
import { join } from 'path'
import { verifyToken } from '@/lib/jwt'
import Teacher from '@/models/teacher'
import Student from '@/models/student'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value
    const decoded = await verifyToken(token as string)
    const formData = await req.formData()
    const file = formData.get('file') as File
    
    // Different directories based on role
    const baseDir = decoded.role === 'teacher' 
      ? 'public/uploads/images/teachers/profile'
      : 'public/uploads/images/students/profile'
    
    const uploadDir = join(process.cwd(), baseDir)
    const filename = `${decoded.id}-${decoded.firstname}-${decoded.lastname}.${file.name.split('.').pop()}`
    const filepath = join(uploadDir, filename)
    
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(new Uint8Array(bytes))
    await writeFile(filepath, buffer)
    
    const imageUrl = `/${baseDir.replace('public/', '')}/${filename}`
    
    // Update correct collection based on role
    if (decoded.role === 'teacher') {
      await Teacher.findByIdAndUpdate(decoded.id, { profileImg: imageUrl })
    } else {
      await Student.findByIdAndUpdate(decoded.id, { profileImg: imageUrl })
    }

    return Response.json({ url: imageUrl })
  } catch (error) {
    return Response.json({ error: 'Upload failed' }, { status: 500 })
  }
}

