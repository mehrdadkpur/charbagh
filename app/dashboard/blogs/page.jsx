"use client"

import Link from "next/link";
import { useEffect, useState } from "react"
import {fetchBlogs} from '../../../lib/requests'

import Search from "@/app/ui/components/Search";
import DeleteModal from "@/app/ui/components/DeleteModal";
import AddButton from "@/app/ui/components/AddButton";
import jalaali from 'jalaali-js'
import toast from "react-hot-toast";
import Image from "next/image";

const Blogs = () => {

    const [blogs, setBlogs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBlogId, setSelectedBlogId] = useState(null);
    const [query,setQuery]=useState({text:""});
    const [filteredBlogs , setFilteredBlogs]=useState([]);

  useEffect(() => {
    const loadBlogs = async () => {
      const data = await fetchBlogs();      
      setBlogs(data.blogs);
      setFilteredBlogs(data.blogs);
    };
    loadBlogs();
  }, []);

  const handleOpenModal=(blogId)=>{
    setIsModalOpen(true);
    setSelectedBlogId(blogId)
  }

  const handleDeleteBlog = async () => {
        setIsModalOpen(true)
    try {
      const res = await fetch(`https://charbagh.vercel.app/api/blogs/${selectedBlogId}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setBlogs(blogs.filter((blog) => blog._id !== selectedBlogId));
        toast.success('بلاگ با موفقیت حذف شد',{duration:5000});
        setIsModalOpen(false);
        window.location.reload();
      }
    } catch (error) {
      toast.error('خطا در حذف بلاگ')
      console.error("Error deleting Blog:", error);
    }
  };

  const handleSearch = (e)=>{
    setQuery({...query , text:e.target.value});
    const allBlogs = blogs.filter((blog)=>{
        return blog.subject.toLowerCase().includes(e.target.value.toLowerCase());
    })
    setFilteredBlogs(allBlogs);
  }

    return ( 
        <section className="w-full flex justify-center pr-[340px] pl-10 mt-3">
            <div className="w-full p-5 flex justify-center bg-white rounded-xl">
                <div className="w-full mt-5 ">                   
                    <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4">خبرنامه های آموزشگاه</span>
                    <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
                                                                        {/* Search Box & Add Blogs Button*/}
                            <div className="w-full flex justify-center items-center gap-x-5 mb-5">
                                <Search query={query} handleSearch={handleSearch} baseSearch={"نام خانوادگی"}/>
                                <AddButton route={'/dashboard/blogs/add-blog'}/>  
                            </div>
                                                                        {/* Delete Modal */}
                        <DeleteModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onDelete={handleDeleteBlog}/>
                                                                         {/* table */}   
                        <table className="w-full text-sm text-left font-DanaMedium rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">موضوع پست</th>
                                    <th scope="col" className="px-6 py-3">نویسنده</th>
                                    <th scope="col" className="px-6 py-3">تاریخ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBlogs.map((blog) => {
                                    const shamsiCreatedDate = jalaali.toJalaali(new Date(blog.createdAt));
                                return(       
                                <tr key={blog._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 flex-shrink-0">
                                            <Image width={40} height={40} className="w-full h-full rounded-full object-cover" src={blog.blog_img} alt={blog.blog_title}/>
                                        </div>
                                        <div className="mr-3">
                                        <div className="text-base font-semibold"> {blog.blog_title}</div>
                                        </div>
                                    </div>
                                    </td>
                                    <td className="px-6 py-4">{blog.blog_author}</td>
                                    <td className="px-6 py-4">{shamsiCreatedDate.jy}/{shamsiCreatedDate.jm}/{shamsiCreatedDate.jd}</td>
                                    <td className="flex justify-center items-center py-4">
                                    <div className="flex items-center gap-2">
                                        <Link 
                                        href={`/dashboard/blogs/${blog._id}`}
                                        className="bg-green-700 px-3 py-1.5 rounded-lg text-white hover:bg-green-800 transition-colors"
                                        >
                                        مشاهده
                                        </Link>
                                        <Link 
                                        href={`/dashboard/blogs/${blog._id}/edit`}
                                        className="bg-orange-700 px-3 py-1.5 rounded-lg text-white hover:bg-orange-800 transition-colors"
                                        >
                                        ویرایش
                                        </Link>
                                        <button 
                                        onClick={() => handleOpenModal(blog._id)}
                                        className="bg-red-700 px-3 py-1.5 rounded-lg text-white hover:bg-red-800 transition-colors"
                                        >
                                        حذف
                                        </button>
                                    </div>
                                    </td>
                                </tr>
)})}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>

     );
}
 
export default Blogs;

