import { NextResponse } from "next/server";
import connectToMongodb from "../../../lib/mongodb";
import Student from"@/models/student"
import { hashPassword } from '@/lib/password'

export async function POST(request) {
    try {
        await connectToMongodb()
        const data = await request.json()
        
        // Check for existing student first
        const existingStudent = await Student.findOne({
            nationalityNumber: data.nationalityNumber
        })

        if (existingStudent) {
            return NextResponse.json(
                { error: 'Student already exists' },
                { status: 409 }
            )
        }

        const hashedPassword = await hashPassword(data.password)

        const studentData = {
            firstname: data.firstname,
            lastname: data.lastname,
            birthDate: data.birthDate,
            gender: data.gender,
            nationalityNumber: data.nationalityNumber,
            mobile: data.mobile,
            email: data.email,
            address: data.address,
            course: data.course,
            password: hashedPassword,
            status: data.status,
            profileImg: data.profileImg || '/images/avatar.png'
        }

        const newStudent = new Student(studentData)
        await newStudent.save()

        return NextResponse.json(
            { 
                message: 'Student created successfully',
                studentId: newStudent.studentId 
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('Server error:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to add student' },
            { status: 500 }
        )
    }
}


export async function GET (){
    await connectToMongodb();
    const students = await Student.find();
    return NextResponse.json({students})
}


