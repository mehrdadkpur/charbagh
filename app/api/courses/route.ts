import { NextRequest, NextResponse } from "next/server";
import connectToMongodb from "../../../lib/mongodb";
import Course from "../../../models/course";

export const dynamic = 'force-static'

interface CourseData {
    course_name: string;
    course_teachers: string[];
    course_img: string;
    course_description: string;
    course_status: string;
}


export async function GET (){
    await connectToMongodb();
    const courses = await Course.find();
    return NextResponse.json({courses})
}

export async function POST(request: NextRequest) {
    try {
        await connectToMongodb()
        const formData = await request.formData()
        
        const teachersValue = formData.get("course_teachers") as string
        const teacherNames = teachersValue ? teachersValue.split(',') : []
        
        const courseData: CourseData = {
            course_name: (formData.get('course_name') as string) || '',
            course_teachers: teacherNames,
            course_img: (formData.get('course_img') as string) || '',
            course_description: (formData.get('course_description') as string) || '',
            course_status: (formData.get('course_status') as string) || ''
        }

        const newCourse = new Course(courseData)
        await newCourse.save()

        return NextResponse.json(
            { message: 'Course created successfully' },
            { status: 201 }
        )
    } catch (error) {
        console.error('Course creation error:', error)
        return NextResponse.json(
            { error: 'Failed to create course' },
            { status: 500 }
        )
    }
}
export async function DELETE (request:NextRequest){
    const id =request.nextUrl.searchParams.get("id");
    await connectToMongodb();
     await Course.findByIdAndDelete(id);
    return NextResponse.json({message:"Course Deleted"},{status:200})
}

