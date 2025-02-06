import RoutesHeader from "@/app/ui/components/RoutesHeader";
import BlogCard from "@/app/ui/components/BlogCard";
import { fetchBlogs } from "@/lib/requests";
import jalaali from 'jalaali-js';
import Image from "next/image";

export const metadata = {
    title: 'آموزشگاه چهارباغ |خبرنامه',
    description: 'این صفحه خبرنامه و رویدادهای مهم آموزشگاه موسیقی چهارباغ است.',
  };

interface IBlog {
      _id: string
      blog_img: string
      blog_title: string
      blog_text: string
      createdAt: string
    }

const Blogs = async () => {
    const { blogs } = await fetchBlogs();

    return (
        <section className="bg-[#F6F4EE] dark:bg-gray-900">
            <RoutesHeader pageTitle={'خبرنامه'} boldText={' خبرنامه و'} Highlight={'رویدادها'}/>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center mb-20">
                    {blogs?.map((blog:IBlog) => {
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
