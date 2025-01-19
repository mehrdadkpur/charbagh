import Link from "next/link";
import TeacherCard from "@/app/ui/components/TeacherCard";
import { fetchTeachers } from "@/lib/requests";
import Image from "next/image";

const Teachers = async () => {
    const {teachers} = await fetchTeachers();    

    return ( 
        <section >
            <div className="relative w-full flex justify-between items-center flex-col bg-[#018A75] dark:bg-gray-900 overflow-hidden group">
                <div className="z-50">
                <Image
              src="/images/shapes/sug.png"
              alt="Decorative shape"
              width={1920}
              height={169}
              className="w-full block dark:hidden"
              priority
            />
            <Image
              src="/images/shapes/sug-dark-1.png"
              alt="Decorative shape"
              width={1920}
              height={169}
              className="w-full hidden dark:block"
              priority
            />
                </div>
                <div className="container z-10 "> 
                    <div className="flex justify-center items-center flex-col gap-y-10 ">
                        <div className="w-[500px] text-center">
                            <div className="text-[#F6BE56] md:text-lg font-DanaMedium ">اساتید آموزشگاه چهارباغ</div>
                            <div className="text-[#F6F4EE] text-4xl md:text-5xl font-MorabbaBold tracking-wide leading-[50px] md:leading-[80px] mt-5 ">اسـاتیـد با سـابقــه و  متــدهای بـــروز تدریــس</div>
                        </div>
                        <TeacherCard teachers={teachers}/>
                        <Link href='/teachers' className="p-3 flex justify-center items-center font-DanaMedium bg-[#152422] lg:text-xl text-[#f6f4ee] rounded-full hover:bg-[#F6BE56] hover:text-[#152422] hover:scale-105 ease-in-out transition-all duration-700 z-10">مشاهده همه اساتید</Link> 
                    </div>
                </div>
                <div className="absolute -bottom-10 lg:-bottom-48 ease-in-out right-0 z-0 scale-75 transition group-hover:translate-x-4 group-hover:-translate-y-4 duration-[3000ms] group-hover:object-cover delay-150">
                    <Image width={1208} height={1661} className="" src="/images/Music.png" alt="music" />
                </div>
                <div>
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
                </div>
            </div>  
        </section>
     );
}
 
export default Teachers;