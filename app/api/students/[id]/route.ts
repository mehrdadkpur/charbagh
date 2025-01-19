import connectToMongodb from "@/lib/mongodb";
import { hashPassword } from "@/lib/password";
import Student from "@/models/student";
import { NextRequest, NextResponse } from "next/server";
import path from 'path'
import fs from 'fs/promises'

export const dynamic = 'force-static'

interface RouteSegment {
    params: Promise<{
        id: string
    }>
}

export const GET = async (request: NextRequest, { params }: RouteSegment)=>{
    const { id } = await params;
    try {
        await connectToMongodb();
        const student = await Student.findById(id);
        if(!student)return new Response('Student Not Found' , {status:404})
        return new Response(JSON.stringify(student),{status:200});  
    } catch (error) {
        console.log(error)
        return new Response("Somthing Went Wrong" , {
            status:500
        })
    }
}

export const PUT = async (request: NextRequest, { params }: RouteSegment) => {
    const { id } = await params

    try {
        const studentData = await request.json()
        await connectToMongodb()

        // Check for existing student
        const existingStudent = await Student.findOne({
            nationalityNumber: studentData.nationalityNumber,
            _id: { $ne: id }
        })

        if (existingStudent) {
            return NextResponse.json(
                { error: 'Student already exists' },
                { status: 409 }
            )
        }

        // Handle password update
        const updateData = { ...studentData }
        if (!studentData.password || studentData.password.trim() === '') {
            const currentStudent = await Student.findById(id)
            updateData.password = currentStudent.password
        } else {
            updateData.password = await hashPassword(studentData.password)
        }

        const updatedStudent = await Student.findByIdAndUpdate(
            id, 
            updateData,
            { new: true }
        )

        if (!updatedStudent) {
            return NextResponse.json(
                { message: 'Student not found' }, 
                { status: 404 }
            )
        }

        return NextResponse.json(
            { message: 'Student updated successfully' }, 
            { status: 200 }
        )
    } catch (error) {
        console.error('Error updating student:', error)
        return NextResponse.json(
            { message: 'Failed to update student' }, 
            { status: 500 }
        )
    }
}

export async function DELETE(request: NextRequest, { params }: RouteSegment) {
    const{id} = await params;
    try {
        await connectToMongodb()
        
        const student = await Student.findById(id)
        if (!student) {
            return NextResponse.json({ message: 'Student not found' }, { status: 404 })
        }

        // Extract image path from URL
        const imageUrl = student.profileImg
        const relativePath = imageUrl.replace('/uploads/images/students/profile', '');
        const absolutePath = path.join(process.cwd(), 'public/uploads/images/students/profile', relativePath);

        // Delete image file
        try {
            await fs.unlink(absolutePath)
        } catch (fileError) {
            console.log('File deletion error:', fileError)
        }
        
        // Delete student from database
        await Student.findByIdAndDelete(id)

        return NextResponse.json({ message: 'Student deleted successfully' }, { status: 200 })
    } catch (error) {
        console.log('Delete error:', error)
        return NextResponse.json({ message: 'Failed to delete Student' }, { status: 500 })
    }
}