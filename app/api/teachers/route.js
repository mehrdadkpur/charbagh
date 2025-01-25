import { NextResponse } from "next/server";
import connectToMongodb from "../../../lib/mongodb";
import Teacher from"@/models/teacher"
import { hashPassword } from '@/lib/password'

export const POST = async (request) => {
    try {
        await connectToMongodb()
        const formData = await request.formData()
        const hashedPassword = await hashPassword(formData.get("password"))

        const existingTeacher = await Teacher.findOne({
            nationalityNumber: formData.get("nationalityNumber")
        })

        if (existingTeacher) {
            return NextResponse.json(
                { error: 'Teacher already exists' },
                { status: 409 }
            )
        }

        const teacherData = {
            firstname: formData.get("firstname"),
            lastname: formData.get("lastname"),
            birthDate: formData.get("birthDate"),
            gender: formData.get("gender"),
            nationalityNumber: formData.get("nationalityNumber"),
            registryDate: formData.get("registryDate"),
            mobile: formData.get("mobile"),
            email: formData.get("email"),
            address: formData.get("address"),
            skill: formData.get("skill"),
            password: hashedPassword,
            status: formData.get("status"),
            isAdmin: formData.get("isAdmin") === 'true',
            mainImg: formData.get("mainImg") || '/images/avatar.png',
            profileImg: formData.get("mainImg") || '/images/avatar.png',
            teacher_resume: formData.get("teacher_resume") || '/images/avatar.png'
        }

        const newTeacher = new Teacher(teacherData)
        await newTeacher.save()

        return NextResponse.json(
            { 
                message: 'Teacher created successfully',
                teacherId: newTeacher.teacherId
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('Server error:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to add teacher' },
            { status: 500 }
        )
    }
}

export async function GET (){
    await connectToMongodb();
    const teachers = await Teacher.find();
    return NextResponse.json({teachers})
}

  



