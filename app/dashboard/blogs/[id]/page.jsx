"use client"
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState,useEffect } from "react";
import { fetchBlog } from "@/lib/requests";
import Loading from "@/app/loading";
import Image from "next/image";
import jalaali from 'jalaali-js'

const ViewBlog = () => {
    const {id} = useParams();
    const [blog , setBlog] = useState(null);
    const [loading, setLoading] = useState(true); 


    useEffect(()=>{
        const fetchBlogData = async ()=>{
            if(!id) return;
           try{
               const blog = await fetchBlog(id)
               setBlog(blog);
               
           } catch(error){
               console.log(error.messsage);
           } finally{
            setLoading(false)
           }
       };
           if(blog === null){
            fetchBlogData()
           }
       },[id , blog]);
       
       if (loading) { 
        return <Loading/>; 
    } 
    if (!blog) { 
        return <div>Blog not found</div>; 
    }

    const shamsiCreatedDate = jalaali.toJalaali(new Date(blog.createdAt));
    return ( 
        <div className="w-full flex justify-center pr-[340px] pl-10 mt-3">
            <div className="w-full p-5 flex justify-center bg-white rounded-xl">
                <div className="w-full flex flex-col justify-center items-center gap-y-5 ">
                    <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4"> مشخصات پست </span>
                    <div className="w-full flex flex-col justify-center items-center sm:rounded-lg">
                        <Image width={350} height={350} src={blog.blog_img}  alt={blog.blog_title} className="rounded-xl" />
                        <div className="w-full flex p-3 shadow-xl font-DanaMedium rounded-lg">
                            <div className="w-full flex flex-col gap-y-2 p-3">
                                <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                    <span>موضوع پست:</span>
                                    <span className="text-xl">{blog.blog_title}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                    <span>  نویسنده پست:</span>
                                    <span className="text-xl">{blog.blog_author}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                    <span>تاریخ ایجاد پست:</span>
                                    <span className="text-xl">{shamsiCreatedDate.jy}/{shamsiCreatedDate.jm}/{shamsiCreatedDate.jd}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                    <span>ساعت ایجاد پست:</span>
                                    <span className="text-xl">{new Date(blog.createdAt).toLocaleTimeString('fa-IR', {hour: '2-digit', minute: '2-digit'})}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                    <span>  متن اصلی پست:</span>
                                    <span className="text-xl">{blog.blog_text}</span>
                                </div>
                            </div>
                            
                        </div>                        
                    </div>
                    <div className="w-1/5 flex justify-center items-center font-DanaMedium">
                        <Link href={"/dashboard/blogs"} className="w-full p-3 bg-red-600 rounded-lg text-xl text-center text-white" >  بازگشت</Link>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ViewBlog;