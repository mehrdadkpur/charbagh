import { NextResponse } from 'next/server'
import { signToken } from '../../../lib/jwt'
import Teacher from '@/models/teacher'
import Student from '@/models/student'
import connectToMongodb from '@/lib/mongodb'
import { verifyPassword } from '@/lib/password'

export async function POST(req: Request) {
  try {
    const { nationalityNumber, password, role } = await req.json()
    await connectToMongodb()

    let user
    if (role === 'teacher') {
      user = await Teacher.findOne({ nationalityNumber })
    } else if (role === 'student') {
      user = await Student.findOne({ nationalityNumber })
    }

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const isValid = await verifyPassword(password, user.password)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const tokenData = {
      id: user._id,
      nationalityNumber: user.nationalityNumber,
      role: role,
      image: user.image,
      firstname: user.firstname,
      lastname: user.lastname,
      isAdmin: user.isAdmin
    }
    
    const token = await signToken(tokenData)

    const response = NextResponse.json(
      { 
        success: true, 
        message: 'Login successful',
        user: tokenData
      },
      { status: 200 }
    )

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400
    })    

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}
