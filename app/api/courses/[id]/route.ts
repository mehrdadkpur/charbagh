import connectToMongodb from "@/lib/mongodb";
import Course from "@/models/course";
import { NextRequest, NextResponse } from "next/server";
import path from 'path'
import fs from 'fs/promises';

interface RouteSegment {
    params: Promise<{
        id: string
    }>
}

export async function PUT(request:NextRequest, { params }:RouteSegment) {
    const { id } = await params;

    try {
        const courseData = await request.json();
        
        await connectToMongodb();

        const updatedCourse = await Course.findByIdAndUpdate( id, {...courseData }, { new: true } );

        if (!updatedCourse) {
            return NextResponse.json({ message: 'Course not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Course Edited!' }, { status: 200 });
    } catch (error) {
        console.error('Error updating Course:', error);
        return NextResponse.json({ message: 'Failed to update Course' }, { status: 500 });
    }
}

export const GET = async (request:NextRequest , {params}:RouteSegment)=>{
    const {id} = await params;
    try {
        await connectToMongodb();
        const course = await Course.findById(id);
        if(!course)return new Response('Course Not Found' , {status:404})
        return new Response(JSON.stringify(course),{status:200});  
    } catch (error) {
        console.log(error)
        return new Response("Somthing Went Wrong" , {
            status:500
        })
    }
}

export async function DELETE(request:NextRequest, { params }:RouteSegment) {
    const{id} = await params;
    try {
        await connectToMongodb()
        
        const course = await Course.findById(id)
        if (!course) {
            return NextResponse.json({ message: 'Course not found' }, { status: 404 })
        }

        // Extract image path from URL
        const imageUrl = course.course_img
        const relativePath = imageUrl.replace('/uploads/images/courses', '')
        const absolutePath = path.join(process.cwd(), 'public/uploads/images/courses', relativePath)

        // Delete image file
        try {
            await fs.unlink(absolutePath)
        } catch (fileError) {
            console.log('File deletion error:', fileError)
        }
        
        // Delete course from database
        await Course.findByIdAndDelete(id)

        return NextResponse.json({ message: 'Course deleted successfully' }, { status: 200 })
    } catch (error) {
        console.log('Delete error:', error)
        return NextResponse.json({ message: 'Failed to delete course' }, { status: 500 })
    }
}



  