import Teacher from '../models/teacher'
import Student from '../models/student'
import Course from '@/models/course'
import connectToMongodb from '../lib/mongodb'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import Song from '@/models/Song'

export const addTeacher = async(FormData)=>{
    "use server"
    const {firstname,lastname,mobile,nationality_number,teacherId,gender,email,birthDate,registryDate,address,password,image,skill,status,role} = Object.fromEntries(FormData)
    try{
        connectToMongodb()
        const newTeacher = new Teacher({firstname,lastname,mobile,nationality_number,teacherId,gender,email,birthDate,registryDate,address,password,image,skill,status,role})
        await newTeacher.save()

    }catch(error){
        console.log(error.message);
        throw new Error("Failed to Create New Teacher")
    }

    revalidatePath('/musicAcademy/dashboard/teachers')
    redirect('/musicAcademy/dashboard/teachers')
}

export const updateTeacher = async(FormData)=>{
    "use server"
    const {id,firstname,lastname,mobile,nationality_number,teacherId,gender,email,birthDate,registryDate,address,password,image,skill,status,role} = Object.fromEntries(FormData)
    try{
        connectToMongodb()
        const updateFields = {firstname,lastname,mobile,nationality_number,teacherId,gender,email,birthDate,registryDate,address,password,image,skill,status,role};
        Object.keys(updateFields).forEach(key=>(updateFields[key]==="" || undefined) && delete updateFields[key]);
        
        await Teacher.findByIdAndUpdate(id,updateFields)
    }catch(error){
        console.log(error.message);
        throw new Error("Failed to Update Teacher")
    }

    revalidatePath('/musicAcademy/dashboard/teachers')
    redirect('/musicAcademy/dashboard/teachers')
}

export const addStudent = async(FormData)=>{
    "use server"
    const {firstname,lastname,mobile,nationality_number,studentId,gender,email,birthDate,registryDate,address,password,image,course,status,role} = Object.fromEntries(FormData)
    try{
        connectToMongodb()
        const newStudent = new Student ({firstname,lastname,mobile,nationality_number,studentId,gender,email,birthDate,registryDate,address,password,image,course,status,role})
        await newStudent.save()

    }catch(error){
        console.log(error.message);
        throw new Error("Failed to Create New Student")
    }

    revalidatePath('/musicAcademy/dashboard/students')
    redirect('/musicAcademy/dashboard/students')
}

export const updateStudent = async(FormData)=>{
    "use server"
    const {id,firstname,lastname,mobile,nationality_number,studentId,gender,email,birthDate,registryDate,address,password,image,course,status,role} = Object.fromEntries(FormData)
    try{
        connectToMongodb()
        const updateFields = {firstname,lastname,mobile,nationality_number,studentId,gender,email,birthDate,registryDate,address,password,image,course,status,role};
        Object.keys(updateFields).forEach(key=>(updateFields[key]==="" || undefined) && delete updateFields[key]);
        
        await Student.findByIdAndUpdate(id,updateFields)
    }catch(error){
        console.log(error.message);
        throw new Error("Failed to Update Student")
    }

    revalidatePath('/musicAcademy/dashboard/students')
    redirect('/musicAcademy/dashboard/students')
}

export const addCourse = async(FormData)=>{
    "use server"
    const {course_name,course_image,teachers_name,description,special_for} = Object.fromEntries(FormData)
    try{
        connectToMongodb()
        const newStudent = new Course ({course_name,course_image,teachers_name,description , special_for})
        await newStudent.save()

    }catch(error){
        console.log(error.message);
        throw new Error("Failed to Create New Course")
    }

    revalidatePath('/musicAcademy/dashboard/courses')
    redirect('/musicAcademy/dashboard/courses')
}

export const updateCourse = async(FormData)=>{
    "use server"
    const {id,course_name,course_image,teachers_name,description,special_for} = Object.fromEntries(FormData)
    try{
        connectToMongodb()
        const updateFields = {course_name,course_image,teachers_name,description,special_for};
        Object.keys(updateFields).forEach(key=>(updateFields[key]==="" || undefined) && delete updateFields[key]);
        
        await Course.findByIdAndUpdate(id,updateFields)
    }catch(error){
        console.log(error.message);
        throw new Error("Failed to Update Course")
    }

    revalidatePath('/musicAcademy/dashboard/courses')
    redirect('/musicAcademy/dashboard/courses')
}

export const addsong =async (FormData)=>{
"use server"
    const {name ,image , music} = Object.fromEntries(FormData)
    try{
        connectToMongodb()
        const newSong = new Song({name ,image , music})
        await newSong.save()

    }catch(error){
        console.log(error.message);
        throw new Error("Failed to Create New song")
    }

    revalidatePath('/musicAcademy/dashboard/songs')
    redirect('/musicAcademy/dashboard/songs')
}
