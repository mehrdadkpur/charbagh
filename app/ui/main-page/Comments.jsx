import { fetchComments } from "@/lib/requests"
import Link from "next/link"
import CommentCard from "../components/CommentCard"
import Image from "next/image"
const Comments = async () => {
  const { comments } = await fetchComments()

  return (
    <section className="bg-[#F0EEE6] dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-16 py-20">
          {/* Header */}
          <div className="max-w-2xl text-center">
            <span className="text-sm lg:text-base font-DanaMedium text-mango dark:text-mango-400">
              اعتبارنامه
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-MorabbaBold text-gray-800 dark:text-gray-50 leading-tight">
              فارغ التحصیلان و مــردم دربــاره مــا چه نظــــری دارنـد
            </h2>
          </div>

          {/* Comments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
            {comments?.slice(0, 3).map((comment) => (
              <CommentCard key={comment._id} comment={comment} />
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="/comments"
            className="inline-flex items-center justify-center px-8 py-4 text-2xl font-DanaMedium 
            text-white dark:text-gray-900 bg-gray-900 dark:bg-gray-100
            rounded-full transition-all duration-300
            hover:bg-mango dark:hover:bg-mango-400 hover:scale-105"
          >
            نظرات بیشتر
          </Link>
        </div>
      </div>

      <Image
              src="/images/shapes/wave-3.png"
              alt="Decorative shape"
              width={1920}
              height={169}
              className="w-full block dark:hidden"
              priority
            />
            <Image
              src="/images/shapes/wave-3-dark-2.png"
              alt="Decorative shape"
              width={1920}
              height={169}
              className="w-full hidden dark:block"
              priority
            />
    </section>
  )
}

export default Comments
