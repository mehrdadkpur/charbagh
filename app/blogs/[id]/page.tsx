'use client'
import { useState , useEffect } from "react";
import { useParams } from "next/navigation";
import jalaali from "jalaali-js"
import { fetchBlog } from "../../../lib/requests";
import Loading from "@/app/loading";
import RoutesHeader from "@/app/ui/components/RoutesHeader";
import Image from "next/image";
import ErrorHandling from "@/app/ui/components/ErrorHandling";

interface IBlog{
    createdAt:Date
    blog_title:string
    blog_img:string
    blog_text:string
    blog_author:string
}

const Blog = () => {
    const {id} = useParams();

    const [blog , setBlog] = useState<IBlog | null >(null);
    const [loading , setLoading] = useState(true);

    
    useEffect(()=>{
        const fetchBlogData = async ()=>{
            if(!id) return;
            try{
                const blog = await fetchBlog(id as string);
                setBlog(blog);
            } catch(error){
                if (error instanceof Error) {
                    console.log(error.message)
                }
            } finally{
                setLoading(false);
            }
        }
        if(blog === null){
            fetchBlogData();
        }
        },[id , blog]);

        useEffect(() => {
            if (blog) {
                document.title = `${blog.blog_title} | ${blog.blog_author}`;
            }
        }, [blog]);
        
        if (loading) { 
            return <Loading/>; 
        } 
        if (!blog) { 
            return <ErrorHandling/> 
        }
        const shamsiCreatedDate = jalaali.toJalaali(new Date(blog.createdAt));
    return ( 
        <section>
            <div className="w-full bg-[#F6F4EE] dark:bg-gray-900">
                <RoutesHeader pageTitle={'خبرنامه'} boldText={blog.blog_title} Highlight={""}/>
                <div className="container relative">
                    <div className="content flex justify-center items-center flex-col">
                        <div className="mt-20 absolute -top-[190px] md:-top-[250px] rounded-4xl bg-white dark:bg-gray-700 p-2 rounded-3xl">
                            <Image width={400} height={200} className="scale-95 rounded-3xl " src={blog.blog_img} alt="blog" />
                        </div>
                        <div className="w-[80%] py-3 mt-[200px] text-base font-DanaMedium leading-10  text-[#152420]/80 dark:text-gray-50">{blog.blog_text}</div>
                        <div className="w-[80%] mt-10 text-sm font-Dana dark:text-gray-50">نوشته شده توسط: {blog.blog_author} در تاریخ: {shamsiCreatedDate.jy}/{shamsiCreatedDate.jm}/{shamsiCreatedDate.jd}</div>
                    </div>
                </div>
                <div>
                    <Image width={1920} height={134} src="/images/shapes/footer-1.png" alt="" />
                </div>
            </div>
        </section>
     );
}
 
export default Blog;