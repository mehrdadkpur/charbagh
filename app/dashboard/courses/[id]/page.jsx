"use client"
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState,useEffect } from "react";
import { fetchCourse } from "@/lib/requests";
import Loading from "@/app/loading";
import Image from "next/image";

const ViewCourse = () => {
    const {id} = useParams();
    const [course , setCourse] = useState(null);
    const [loading, setLoading] = useState(true); 


    useEffect(()=>{
        const fetchCourseData = async ()=>{
            if(!id) return;
           try{
               const course = await fetchCourse(id)
               setCourse(course);
               
           } catch(error){
               console.log(error.messsage);
           } finally{
            setLoading(false)
           }
       };
           if(course === null){
            fetchCourseData()
           }
       },[id , course]);
       
       if (loading) { 
        return <Loading/>; 
    } 
    if (!course) { 
        return <div>Course not found</div>; 
    }

  
    return ( 
        <div className="w-full flex justify-center pr-[340px] pl-10 mt-3">
            <div className="w-full p-5 flex justify-center bg-white rounded-xl">
                <div className="w-full flex flex-col justify-center items-center gap-y-5 ">
                    <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4"> مشخصات دوره </span>
                    <div className="w-full flex flex-col justify-center items-center sm:rounded-lg">
                        <Image width={350} height={350} src={course.course_img}  alt={course.course_name} className="rounded-xl" />
                        <div className="w-full flex p-3 shadow-xl font-DanaMedium rounded-lg">
                            <div className="w-full flex flex-col gap-y-2 p-3">
                                <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                    <span>نام دوره  :</span>
                                    <span className="text-xl">{course.course_name}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                    <span> اساتید دوره:</span>
                                    <span className="text-xl">{course.course_teachers?.join(' ، ')}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                    <span> درباره دوره:</span>
                                    <span className="text-xl">{course.course_description}</span>
                                </div>                                
                                <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                    <span> وضعیت:</span>
                                    <span className="text-xl">{course.course_status}</span>
                                </div>
                            </div>
                            
                        </div>                        
                    </div>
                    <div className="w-1/5 flex justify-center items-center font-DanaMedium">
                        <Link href={"/dashboard/courses"} className="w-full p-3 bg-red-600 rounded-lg text-xl text-center text-white" >  بازگشت</Link>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ViewCourse;