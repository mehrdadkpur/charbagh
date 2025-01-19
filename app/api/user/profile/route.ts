import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'
import Teacher from '@/models/teacher'
import Student from '@/models/student'
import connectToMongodb from '@/lib/mongodb'

export async function GET(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get('cookie')
    const tokenCookie = cookieHeader?.split(';').find(c => c.trim().startsWith('token='))
    const token = tokenCookie?.split('=')[1]

    if (!token) {
      return NextResponse.json({ error: 'No token found' }, { status: 401 })
    }

    const decoded = await verifyToken(token)
    await connectToMongodb()

    let user
    if (decoded.role === 'teacher') {
      user = await Teacher.findById(decoded.id).select('-password')
    } else {
      user = await Student.findById(decoded.id).select('-password')
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    return NextResponse.json({
      user: {
        id: user._id.toString(),
        nationalityNumber: user.nationalityNumber,
        firstname: user.firstname,
        lastname: user.lastname,
        role: decoded.role,
        isAdmin: user.isAdmin,
        profileImg: user.profileImg,
        gender:user.gender,
        mobile:user.mobile,
        birthDate:user.birthDate,
        address:user.address,
        teacherId:user.teacherId,
        status:user.status,
        email:user.email,
        skill:user.skill,
        course:user.course,
        studentId:user.studentId
      }
    })

  } catch (error) {
    console.log('Profile fetch error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 })
  }
}



