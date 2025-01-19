import RoutesHeader from "@/app/ui/components/RoutesHeader";
import Image from "next/image";

const About = () => {
    return ( 
        <section>
            <div className="w-full bg-[#F6F4EE] dark:bg-gray-900">
                <RoutesHeader pageTitle={'درباره ما'} boldText={'تاریخچه و  '} Highlight={'مسیـــری که پیموده ایم'}/>
                <div className="container mt-10">
                    <div className="w-full md:flex justify-between items-center flex flex-col gap-y-10 mb-10 overflow-hidden">
                        <div className="md:flex flex flex-col justify-between items-start">
                            <div className="bg-white dark:bg-gray-700 rounded-3xl">
                                <Image width={600} height={400} className=" rounded-3xl p-4" src="/images/about/01.jpg" alt="" />
                            </div>
                            <div className="md:w-[50%] md:flex justify-center items-center flex flex-col p-10 ">
                                <div className=" text-4xl font-DanaDemiBold text-[#152422] mb-4 dark:text-gray-50">تاریخچه آموزشگاه</div>
                                <div className="text-sm md:text-xl font-Dana text-[#152422]/70 dark:text-gray-50">یپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک استلورم  با چاپ و با استفادهدگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک استلورم  با چاپ و با دگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک استلورم  با چاپ و با  از طراحان گرافیک استلورم ایپسوم متن ساختگی  متن ساخت</div>
                            </div>
                        </div>
                        <div className="md:relative flex flex-col md:flex justify-between items-center">
                            <div className="md:absolute md:-top-[22px] md:bottom-[181px] md:right-[770px] -rotate-[20deg]  bg-white dark:bg-gray-700 rounded-3xl ">
                                <Image width={400} height={400} className=" scale-95 rounded-3xl" src="/images/about/02.jpg" alt="" />
                            </div>
                            <div className="md:absolute md:top-[86px] md:bottom-0 md:right-[372px]  rotate-[20deg]  bg-white rounded-3xl dark:bg-gray-700 ">
                                <Image width={400} height={400} className=" scale-95 rounded-3xl" src="/images/about/03.jpg" alt="" />
                            </div>
                            <div className="md:absolute md:-top-[80px] md:bottom-0 md:right-5 -rotate-[15deg]  bg-white rounded-3xl dark:bg-gray-700 ">
                                <Image width={400} height={400} className=" scale-95 rounded-3xl" src="/images/about/04.jpg" alt="" />
                            </div>
                        </div>
                        <div className="md:flex flex flex-col justify-between items-start">
                        <div className="md:w-[50%] p-10">
                                <div className="md:text-4xl font-DanaDemiBold text-[#152422] mb-4 dark:text-gray-50">خط مشی آموزشگاه</div>
                                <div className="md:text-xl font-Dana text-[#152422]/70 dark:text-gray-50">یپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک استلورم  با چاپ و با استفادهدگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک استلورم  با چاپ و با دگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک استلورم  با چاپ و با  از طراحان گرافیک استلورم ایپسوم متن ساختگی  متن ساخت</div>
                        </div>
                        <div className="bg-white dark:bg-gray-700 rounded-3xl">
                                <Image width={400} height={400} className=" rounded-3xl p-4" src="/images/about/05.jpg" alt="about" />
                        </div> 
                        </div>
                        <div className="w-full md:h-[448px] md:relative md:flex flex flex-col justify-between items-center">
                            <div className="md:absolute -top-[22px] bottom-[181px] right-[750px] -rotate-[20deg] bg-white dark:bg-gray-700 rounded-3xl ">
                                <Image width={380} height={380} className=" scale-95 rounded-3xl" src="/images/about/06.jpg" alt="" />
                            </div>
                            <div className="md:absolute top-[86px] bottom-0 right-[372px] left-[372px] rotate-[20deg]  bg-white dark:bg-gray-700 rounded-3xl ">
                                <Image width={400} height={400} className=" scale-95 rounded-3xl" src="/images/about/07.jpg" alt="" />
                            </div>
                        </div>
                        <div className="md:flex flex flex-col justify-between items-start">
                            <div className="bg-white rounded-3xl dark:bg-gray-700">
                                <Image width={400} height={400} className=" rounded-3xl p-4" src="/images/about/08.jpg" alt="about" />
                            </div>
                            <div className="md:w-[50%] p-10">
                                <div className="text-lg md:text-4xl font-DanaDemiBold text-[#152422] mb-4 dark:text-gray-50">تاریخچه آموزشگاه</div>
                                <p className="text-sm md:text-xl font-Dana text-[#152422]/70 dark:text-gray-50">یپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک استلورم  با چاپ و با استفادهدگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک استلورم  با چاپ و با دگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک استلورم  با چاپ و با  از طراحان گرافیک استلورم ایپسوم متن ساختگی  متن ساخت</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                        <Image width={400} height={400} className="w-full h-auto" src="/images/shapes/footer-1.png" alt="curve" />
                    </div>
            </div>
        </section>
     );
}
 
export default About;