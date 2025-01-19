
import Link from "next/link"
import Image from "next/image"
import { fetchCourses } from "@/lib/requests"
import CourseCard from '@/app/ui/components/CourseCard'


const Courses = async () => {
    const { courses } = await fetchCourses();


    return ( 
        <section className="w-full flex justify-between flex-col bg-[#F6F4EE] dark:bg-gray-900">
            <div className="container">
                <div className="w-full flex justify-center items-center flex-col">
                    <div className="w-[350px] md:w-[503px] text-center">
                        <h2 className="md:text-lg font-DanaMedium text-elf">پیشنهاد های ما به شما</h2>
                        <h3 className="text-3xl md:text-5xl font-MorabbaBold text-greenDark dark:text-gray-50 leading-[40px] md:leading-[80px] dark:texgr">
                            مهـارت موسیقـی خودتـان را ارتقـا دهیـد
                        </h3>
                    </div>

                    <div className="flex justify-center items-center mb-14 mt-5">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
                            {courses?.slice(0, 4).map((course:any) => (
                                <CourseCard key={course._id} course={course} />
                            ))}
                        </div>
                    </div>

                    <Link 
                        href="/courses" 
                        className="w-56 h-16 flex justify-center items-center mx-auto font-DanaMedium bg-[#152422] text-2xl text-[#f6f4ee] rounded-full hover:bg-[#F6BE56] hover:text-[#152422] hover:scale-105 ease-in-out transition-all duration-700"
                    >
                        مشاهده همه دوره ها
                    </Link>
                </div>
            </div>
            <div>
            <Image
              src="/images/shapes/courses.png"
              alt="Decorative shape"
              width={1920}
              height={169}
              className="w-full block dark:hidden"
              priority
            />
            <Image
              src="/images/shapes/courses-dark-1.png"
              alt="Decorative shape"
              width={1920}
              height={169}
              className="w-full hidden dark:block"
              priority
            />
            </div>
        </section>
    )
}
export default Courses;