import connectToMongodb from "@/lib/mongodb";
import { hashPassword } from "@/lib/password";
import Teacher from "@/models/teacher";
import { NextRequest, NextResponse } from "next/server";
import path from 'path'
import fs from 'fs/promises'


interface RouteSegment {
    params: Promise<{
        id: string
    }>
}

export async function GET( request: NextRequest, { params }: RouteSegment) {
    const { id } = await params;
    
    try {
        await connectToMongodb()
        const teacher = await Teacher.findById(id)
        
        if (!teacher) {
            return NextResponse.json(
                { error: 'Teacher not found' },
                { status: 404 }
            )
        }
        
        return NextResponse.json(teacher)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch teacher' },
            { status: 500 }
        )
    }
}

export async function PUT(request: NextRequest, { params }: RouteSegment) {
    const{id} = await params;
    try {
        await connectToMongodb()
        const teacherData = await request.json()
        
        // Check for existing teacher with same nationalityNumber
        const existingTeacher = await Teacher.findOne({
            nationalityNumber: teacherData.nationalityNumber,
            _id: { $ne: id }
        })
        
        if (existingTeacher) {
            return NextResponse.json(
                { error: 'Teacher already exists' },
                { status: 409 }
            )
        }

        // Handle password update
        const updateData = { ...teacherData }
        if (!teacherData.password || teacherData.password.trim() === '') {
            const currentTeacher = await Teacher.findById(id)
            updateData.password = currentTeacher.password
        } else {
            updateData.password = await hashPassword(teacherData.password)
        }

        const updatedTeacher = await Teacher.findByIdAndUpdate(
            id, 
            updateData,
            { new: true }
        )

        if (!updatedTeacher) {
            return NextResponse.json(
                { message: 'Teacher not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { message: 'Teacher updated successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Error updating teacher:', error)
        return NextResponse.json(
            { message: 'Failed to update teacher' },
            { status: 500 }
        )
    }
}

export async function DELETE(request: NextRequest, { params }: RouteSegment) {
    const{id} = await params;
    try {
        await connectToMongodb()
        
        const teacher = await Teacher.findById(id)
        if (!teacher) {
            return NextResponse.json({ message: 'Teacher not found' }, { status: 404 })
        }

        // Extract image path from URL
        const imageUrl = teacher.mainImg
        const relativePath = imageUrl.replace('/uploads/images/teachers', '')
        const absolutePath = path.join(process.cwd(), 'public/uploads/images/teachers', relativePath)

        // Delete image file
        try {
            await fs.unlink(absolutePath)
        } catch (fileError) {
            console.log('File deletion error:', fileError)
        }
        
        // Delete teacher from database
        await Teacher.findByIdAndDelete(id)

        return NextResponse.json({ message: 'Teacher deleted successfully' }, { status: 200 })
    } catch (error) {
        console.log('Delete error:', error)
        return NextResponse.json({ message: 'Failed to delete Teacher' }, { status: 500 })
    }
}

