"use client"
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState,useEffect } from "react";
import { fetchStudent } from "@/lib/requests";
import Loading from "@/app/loading";
import jalaali from 'jalaali-js'
import Image from "next/image";

interface IStudent {
    firstname: string
    lastname: string
    birthDate: Date
    gender: string
    nationalityNumber: string
    studentId: string
    mobile: string
    email: string
    address: string
    course: string
    password: string
    status: string
    profileImg: string
    }


const ViewStudent = () => {
    const {id} = useParams();
    const [student , setStudent] = useState<IStudent|null>(null);
    const [loading, setLoading] = useState(true); 


    useEffect(()=>{
        const fetchStudentData = async ()=>{
            if(!id) return;
           try{
               const student = await fetchStudent(id as string)
               setStudent(student);
               
           } catch(error){
            console.error("Error Fetching Data:", error)
           } finally{
            setLoading(false)
           }
       };
           if(student === null){
            fetchStudentData()
           }
       },[id , student]);
       
       if (loading) { 
        return <Loading/>; 
    } 
    if (!student) { 
        return <div>Student not found</div>; 
    }
  
    const shamsiBirthDate = jalaali.toJalaali(new Date(student.birthDate));

    return ( 
        <div className="w-full flex justify-center pr-[340px] pl-10 mt-3 bg-gray-50 dark:bg-gray-900">
            <div className="w-full p-5 flex justify-center rounded-xl">
                <div className="w-full flex flex-col justify-center items-center gap-y-5 ">
                    <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4"> مشخصات هنرجو </span>
                    <div className="w-full flex flex-col justify-center items-center sm:rounded-lg">
                        <div className="w-40 h-40">
                            <Image width={160} height={160} src={student.profileImg}  alt={student.lastname} className=" rounded-full" />
                        </div>
                        <div className="w-full grid grid-cols-2 p-3 gap-3 shadow-xl font-DanaMedium rounded-lg">
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>نام و نام خانوادگی:</span>
                                    <span className="text-xl">{student.firstname}{" "}{student.lastname}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span> شماره ملی:</span>
                                    <span className="text-xl">{student.nationalityNumber}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>  جنسیت:</span>
                                    <span className="text-xl">{student.gender}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>  شماره موبایل:</span>
                                    <span className="text-xl">{student.mobile}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>  تاریخ تولد:</span>
                                    <span className="text-xl">{shamsiBirthDate.jy}/{shamsiBirthDate.jm}/{shamsiBirthDate.jd}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>   آدرس محل سکونت:</span>
                                    <span className="text-xl">{student.address}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>  شماره پرسنلی:</span>
                                    <span className="text-xl">{student.studentId}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span> وضعیت:</span>
                                    <span className="text-xl">{student.status}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>  ایمیل:</span>
                                    <span className="text-xl">{student.email}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>  حوزه فعالیت:</span>
                                    <span className="text-xl">{student.course}</span>
                                </div>
                        </div>
                    </div>                        
                    <div className="w-1/5 flex justify-center items-center font-DanaMedium">
                        <Link href={"/dashboard/students"} className="w-full p-3 bg-red-500 hover:bg-red-600 rounded-lg text-xl text-center text-white" >  بازگشت</Link>
                    </div>
                </div>
                </div>
            </div>
        
     );
}
 
export default ViewStudent;