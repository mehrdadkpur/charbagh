
import Image from "next/image";
import RoutesHeader from "@/app/ui/components/RoutesHeader";
import { fetchTeachers } from "../../lib/requests";
import TeacherCard from '@/app/ui/components/TeacherCard'
const Teachers =  async () => {
    const {teachers} = await fetchTeachers();
    
    return ( 
            <div className="w-full bg-[#F6F4EE] dark:bg-gray-900">
                <RoutesHeader pageTitle={'اساتید'} boldText={'اساتــید بــــرتـــــر'} Highlight={'چهــــاربــاغ'}/>                    
                <div className="container">
                    <div>
                        <div className="flex justify-between items-center flex-col gap-y-10">
                            <div className="flex flex-col md:flex justify-between items-center gap-y-5 md:gap-x-3">
                                <div className="flex justify-center items-center bg-white rounded-3xl ">
                                    <Image priority width={400} height={400} className="rounded-3xl" src="/images/teachers/09.png" alt="teacherName" />
                                </div>
                                <div className="flex justify-center items-center bg-white rounded-3xl">
                                    <Image priority width={400} height={400}  className="rounded-3xl " src="/images/teachers/10.png" alt="teacherName" />
                                </div>
                            </div> 
                        <div className="flex flex-col gap-y-5 md:flex justify-between items-center">
                                <div className="md:w-[30%] text-3xl md:text-5xl font-DanaDemiBold px-2 leading-snug dark:text-gray-50 ">ما بروزترین اساتید را در اختیار داریم</div>
                                <div className="md:w-[65%] text-xl font-Dana px-3 leading-10 dark:text-gray-50">
                                    <p>مربیان ما شامل برخی از ذهن ها و استعدادهای برتر در زمینه های مربوطه می شوند. ما معلمانی را که متخصصان و استادان شناخته شده و با اشتیاق واقعی برای آموزش هستند، بررسی و استخدام می کنیم. به عنوان مثال، دوره های گیتار ما توسط استادان برنده جوایزی تدریس می شود که آثارشان در کنسرت بزرگ نمایش داده شده است.</p>
                                    <p>کلاس های ویلون ما توسط مربیان، استادان با تجربه و ویلونیست هایی برگزار می شود که می دانند برای موفقیت چه چیزی لازم است.</p>
                                </div>
                        </div>
                        </div>
                        <div className="mt-20">
                            <h2 className="w-full text-3xl md:text-5xl font-DanaDemiBold text-[#152422] dark:text-gray-50 mb-20 text-center">اساتید ما</h2>
                            <TeacherCard teachers={teachers}/> 
                        </div>
                    </div>
                </div>
                <div>
                    <Image width={1920} height={134} src="/images/shapes/footer-1.png" alt="footer" />
                </div>
            </div>
     );
}
 
export default Teachers;