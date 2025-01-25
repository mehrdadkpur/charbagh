import { NextRequest, NextResponse } from "next/server";
import connectToMongodb from "../../../lib/mongodb";
import Student from"@/models/student"
import { hashPassword } from '@/lib/password'

interface StudentData {
    firstname: string;
    lastname: string;
    birthDate: string;
    gender: string;
    nationalityNumber: string;
    mobile: string;
    email: string;
    address: string;
    course: string;
    password: string;
    status: string;
    profileImg?: string;
  }
  
  export async function POST(request: NextRequest) {
    try {
      await connectToMongodb();
      const data: StudentData = await request.json();
  
      const existingStudent = await Student.findOne({
        nationalityNumber: data.nationalityNumber
      });
  
      if (existingStudent) {
        return NextResponse.json(
          { error: 'Student already exists' },
          { status: 409 }
        );
      }
  
      const hashedPassword = await hashPassword(data.password);
  
      const studentData = {
        ...data,
        password: hashedPassword,
        profileImg: data.profileImg || '/images/avatar.png'
      };
  
      const newStudent = new Student(studentData);
      await newStudent.save();
  
      return NextResponse.json(
        {
          message: 'Student created successfully',
          studentId: newStudent.studentId
        },
        { status: 201 }
      );
    }  catch (err: unknown) {
        console.error('Server error:', err);
        const error = err as Error;
        return NextResponse.json(
          { error: error.message || 'Failed to add student' },
          { status: 500 }
        );
      }
    }


export async function GET (){
    await connectToMongodb();
    const students = await Student.find();
    return NextResponse.json({students})
}


