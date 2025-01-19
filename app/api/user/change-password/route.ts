import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'
import { verifyPassword, hashPassword } from '@/lib/password'
import Teacher from '@/models/teacher'
import Student from '@/models/student'
import connectToMongodb from '@/lib/mongodb'

export async function POST(req: NextRequest) {
  try {
    const { currentPassword, newPassword } = await req.json()
    const token = req.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const decoded = await verifyToken(token)
    await connectToMongodb()

    // Find user based on role
    let user
    if (decoded.role === 'teacher') {
      user = await Teacher.findById(decoded.id)
    } else {
      user = await Student.findById(decoded.id)
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Verify current password
    const isValid = await verifyPassword(currentPassword, user.password)
    if (!isValid) {
      return NextResponse.json({ error: 'رمز عبور فعلی اشتباه است' }, { status: 400 })
    }

    // Hash and update new password
    const hashedPassword = await hashPassword(newPassword)
    user.password = hashedPassword
    await user.save()

    return NextResponse.json({ message: 'Password updated successfully' })
  } catch (error) {
    console.error('Password change error:', error)
    return NextResponse.json({ error: 'Failed to change password' }, { status: 500 })
  }
}
