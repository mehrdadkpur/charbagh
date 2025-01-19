import RoutesHeader from "@/app/ui/components/RoutesHeader";
import BlogCard from "@/app/ui/components/BlogCard";
import { fetchBlogs } from "@/lib/requests";
import jalaali from 'jalaali-js';
import Image from "next/image";

const Blogs = async () => {
    const { blogs } = await fetchBlogs();

    return (
        <section className="bg-[#F6F4EE] dark:bg-gray-900">
            <RoutesHeader pageTitle={'خبرنامه'} boldText={' خبرنامه و'} Highlight={'رویدادها'}/>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 justify-items-center mb-20">
                    {blogs?.map((blog) => {
                        const shamsiCreatedDate = jalaali.toJalaali(new Date(blog.createdAt));
                        return (
                            <BlogCard key={blog._id} blog={blog} shamsiCreatedDate={shamsiCreatedDate}/>
                        );
                    })}
                </div>
            </div>
            <div className="w-full">
                <Image 
                    width={1920} 
                    height={134} 
                    src="/images/shapes/footer-1.png" 
                    alt="footer"
                    className="w-full"
                    priority
                />
            </div>
        </section>
    );
}

export default Blogs;
