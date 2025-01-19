import  connectToMongodb  from '@/lib/mongodb'
import Teacher from '@/models/teacher'
import Student from '@/models/student'
import Song from '@/models/song'
import Courese from '@/models/course'
import Photos from '@/models/photo'
import Videos from '@/models/video'
import Instruments from '@/models/instrument'
import Blogs from '@/models/blog'

export async function GET() {
  try {
    await connectToMongodb()

    const [students, teachers, songs , courses , photos , videos , instruments , blogs] = await Promise.all([
      Student.countDocuments(),
      Teacher.countDocuments(),
      Song.countDocuments(),
      Courese.countDocuments(),
      Photos.countDocuments(),
      Videos.countDocuments(),
      Instruments.countDocuments(),
      Blogs.countDocuments(),
    ])

    return Response.json({
      students,
      teachers,
      songs,
      courses , 
      photos , 
      videos , 
      instruments , 
      blogs
    })
  } catch (error) {
    return Response.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
