import Link from "next/link"
import { fetchBlogs } from "@/lib/requests"
import jalaali from 'jalaali-js'
import BlogCard from "@/app/ui/components/BlogCard"

interface Blog {
  _id: string
  createdAt: string
  blog_title: string
  blog_img: string
  blog_text: string
}

const Blogs = async () => {
  const { blogs } = await fetchBlogs()

  return (
    <section className="bg-[#F6F4EE] dark:bg-[#25403c]">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center gap-16">
          {/* Header */}
          <div className="max-w-[400px] md:max-w-[603px] text-center">
            <span className="text-sm font-DanaMedium text-mango dark:text-mango-400">
              خبرنامه
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-MorabbaBold text-gray-800 dark:text-gray-100 leading-tight">
              خبرنامه آموزشگاه موسیقی ما و رویدادهای مهم
            </h2>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            {blogs?.slice(0, 2).map((blog: Blog) => {
              const shamsiCreatedDate = jalaali.toJalaali(new Date(blog.createdAt))
              return (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                  shamsiCreatedDate={shamsiCreatedDate}
                />
              )
            })}
          </div>

          {/* CTA Button */}
          <Link
            href="/blogs"
            className="inline-flex items-center justify-center px-8 py-4 
            text-2xl font-DanaMedium text-white dark:text-gray-900 
            bg-gray-900 dark:bg-gray-100 rounded-full 
            transition-all duration-300 
            hover:bg-amber-400 dark:hover:bg-amber-400 
            hover:text-gray-900 hover:scale-105"
          >
            بیشتر
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Blogs
