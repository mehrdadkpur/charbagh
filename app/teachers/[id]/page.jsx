'use client'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {fetchTeacher} from "../../../lib/requests"
import Loading from "@/app/loading";
import RoutesHeader from "@/app/ui/components/RoutesHeader";
import Image from "next/image";

const Teacher = () => {
    const {id} = useParams();
    const [teacher , setTeacher] = useState(null);
    const [loading, setLoading] = useState(true); 


    useEffect(()=>{
        const fetchTeacherData = async ()=>{
            if(!id) return;
           try{
               const teacher = await fetchTeacher(id)
               setTeacher(teacher);
               
           } catch(error){
               console.log(error.messsage);
           } finally{
            setLoading(false)
           }
       };
           if(teacher === null){
            fetchTeacherData()
           }
       },[id , teacher]);
       
       if (loading) { 
        return <Loading/>; 
    } 
    if (!teacher) { 
        return <div>Teacher not found</div>; 
    }

    return ( 
        <section>
            <div className="w-full bg-[#F6F4EE] dark:bg-gray-900">
                <RoutesHeader pageTitle={"اساتید برتر"} boldText={"آشنایی با استاد"} Highlight={`${teacher.firstname} ${teacher.lastname}`} />
                <div className="container relative">
                    <div className="content flex justify-center items-center flex-col">
                    <div className="flex justify-center items-center p-3 absolute bg-white dark:bg-gray-700 rounded-3xl shadow-xl">
                        <Image width={400} height={400} className="rounded-3xl " src={teacher.mainImg} alt="teacher" />
                    </div>
                </div>
                    <div className="w-full text-lg font-Dana mt-60 dark:text-gray-50">{teacher.teacher_resume}</div>
            </div>
                <div>
                    <Image width={1920} height={134} src="/images/shapes/footer-1.png" alt="" />
                </div>
            </div>
        </section>
     );
}
 
export default Teacher;