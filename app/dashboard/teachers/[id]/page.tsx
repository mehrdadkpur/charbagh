"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchTeacher } from "@/lib/requests";
import Loading from "@/app/loading";
import jalaali from 'jalaali-js';
import Image from "next/image";

interface ITeacher {
    _id:string;
    firstname:string;
    lastname:string;
    birthDate:string;
    gender:string;
    nationalityNumber:string;
    teacherId:string;
    registryDate:string;
    mobile:string;
    email:string;
    address:string;
    skill:string;
    password?:string;
    status: string;
    role: string;
    mainImg:string;
    teacher_resume:string;
    isAdmin:boolean
  }

const ViewTeacher = () => {
    const { id } = useParams();
    const [teacher, setTeacher] = useState<ITeacher| null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeacherData = async () => {
            if (!id) return;
            try {
                const teacher = await fetchTeacher(id as string);
                setTeacher(teacher);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeacherData();
    }, [id]);

    if (loading) {
        return <Loading />;
    }
    if (!teacher) {
        return <div>Teacher not found</div>;
    }

    const shamsiBirthDate = jalaali.toJalaali(new Date(teacher.birthDate));
    const shamsiRegistryDate = jalaali.toJalaali(new Date(teacher.registryDate));

    return (
        <div className="w-full flex justify-center pr-[340px] pl-10 mt-3 bg-gray-50 dark:bg-gray-900">
            <div className="w-full p-5 flex justify-center  rounded-xl">
                <div className="w-full flex flex-col justify-center items-center gap-y-5 ">
                    <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4"> مشخصات مدرس </span>
                    <div className="w-full flex flex-col gap-y-3 justify-center items-center sm:rounded-lg">
                        <div className="w-40 h-40">
                            <Image width={160} height={160} src={teacher.mainImg} alt="teacher" className="rounded-full" />
                        </div>
                        <div className="w-full grid grid-cols-1 gap-3 p-3 shadow-xl font-DanaMedium rounded-lg border">  
                            <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                <span>نام و نام خانوادگی:</span>
                                <span className="text-xl">{teacher.firstname}{" "}{teacher.lastname}</span>
                            </div>
                            <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                <span> شماره ملی:</span>
                                <span className="text-xl">{teacher.nationalityNumber}</span>
                            </div>
                            <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                <span>  جنسیت:</span>
                                <span className="text-xl">{teacher.gender}</span>
                            </div>
                            <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                <span>  شماره موبایل:</span>
                                <span className="text-xl">{teacher.mobile}</span>
                            </div>
                            <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300"> 
                                <span>تاریخ تولد:</span> 
                                <span className="text-xl"> {shamsiBirthDate.jy}/{shamsiBirthDate.jm}/{shamsiBirthDate.jd} </span> 
                            </div>
                            <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                <span>   آدرس محل سکونت:</span>
                                <span className="text-xl">{teacher.address}</span>
                            </div>
                            <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                <span>  شماره پرسنلی:</span>
                                <span className="text-xl">{teacher.teacherId}</span>
                            </div>
                            <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                <span>  تاریخ شروع فعالیت:</span>
                                <span className="text-xl">{shamsiRegistryDate.jy}/{shamsiRegistryDate.jm}/{shamsiRegistryDate.jd}</span>
                            </div>
                            <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                <span> وضعیت:</span>
                                <span className="text-xl">{teacher.status}</span>
                            </div>
                            <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                <span>  ایمیل:</span>
                                <span className="text-xl">{teacher.email}</span>
                            </div>
                            <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                <span>  نقش:</span>
                                <span className="text-xl">{teacher.isAdmin ? 'مدیر است' : "کاربر عادی است"}</span>
                            </div>
                            <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                <span>  حوزه فعالیت:</span>
                                <span className="text-xl">{teacher.skill}</span>
                            </div>
                            <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                <span>  شرح رزومه:</span>
                                <span className="text-xl">{teacher.teacher_resume}</span>
                            </div>
                        </div>
                    <div className="w-1/5 flex justify-center items-center font-DanaMedium">
                        <Link href={"/dashboard/teachers"} className="w-full p-3 bg-red-600 rounded-lg text-xl text-center text-white">  بازگشت</Link>
                    </div>
                        </div>                        
                    </div>
                </div>
            </div>
    );
}

export default ViewTeacher;
