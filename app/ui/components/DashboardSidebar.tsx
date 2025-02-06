"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface OpenLinks {
    [key: string]: boolean;
  }

const DashboardSidebar = () => {

    const [openLinks, setOpenLinks] = useState<OpenLinks>({});
    const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside); 
    return () => { document.removeEventListener('mousedown', handleClickOutside); 
    }; }, []);

    const handleOpen = (e: React.MouseEvent<HTMLAnchorElement>, value: string) => { 
  e.preventDefault(); 
  setOpenLinks((prevOpenLinks) => (
    { ...prevOpenLinks, [value]: !prevOpenLinks[value], }
  )); 
    };
   
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
      }
    };
    return ( 
        <section className="absolute top-0 right-0 font-DanaMedium pb-10 rounded-lg min-h-screen z-50 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50">
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center w-full">
              <Link href='/' className="w-24 h-40 flex justify-center items-center">
                  <Image width={96} height={160} src="/images/logo.png" alt="logo" className="object-contain"/>
              </Link>
            </div>
                  {/* <!-- Sidebar links --> */}
            <div className="w-full px-2  space-y-2 overflow-y-hidden hover:overflow-y-auto">
                  {/* <!-- Dashboards links --> */}
                  <div> 
                    <a href="#" onClick={(e) => handleOpen(e, "link1")} className="w-full h-14 flex justify-between items-center p-2 transition-colors rounded-md hover:bg-slate-300" > 
                      <span className="flex gap-x-3"> 
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" > 
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> 
                        </svg> 
                        <span className="text-sm font-DanaMedium "> داشبورد مدیریت </span> 
                        </span> 
                      <span>
                       <svg className={`w-4 h-4 transition-transform transform ${ openLinks.link1 ? "rotate-180" : "" }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" > 
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /> 
                      </svg> 
                      </span> 
                    </a> 
                    <div className={`${ openLinks.link1 ? "" : "hidden" } mt-2 space-y-2 px-7`} > 
                    <Link href="/dashboard" className="block p-2 text-sm text-gray-500 transition-colors duration-200 rounded-md hover:text-gray-700" > صفحه اصلی داشبورد </Link> 
                    </div> 
                  </div>
                  {/* <!-- Teachers links --> */}
                  <div> 
                    <a href="#" onClick={(e) => handleOpen(e, "link2")} className="w-full h-14 flex justify-between items-center p-2 transition-colors rounded-md hover:bg-slate-300" > 
                      <span className="flex gap-x-3"> 
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg> 
                        <span className="text-sm font-DanaMedium">  مدیریت اساتید </span> 
                        </span> 
                      <span>
                       {/* active className 'rotate-180' */} 
                       <svg className={`w-4 h-4 transition-transform transform ${ openLinks.link2 ? "rotate-180" : "" }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" > 
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /> 
                      </svg> 
                      </span> 
                    </a> 
                    <div className={`${ openLinks.link2 ? "" : "hidden" } mt-2 space-y-2 px-7`} > 
                      <Link href="/dashboard/teachers" className="block p-2 text-sm text-gray-700 transition-colors duration-200 rounded-md hover:text-gray-700" > مدیریت </Link> 
                    </div>
                  </div>
                  {/* <!-- Students links --> */}
                  <div> 
                    <a href="#" onClick={(e) => handleOpen(e, "link3")} className="w-full h-14 flex justify-between items-center p-2 transition-colors rounded-md hover:bg-slate-300" > 
                      <span className="flex gap-x-3"> 
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                        </svg>

                        <span className="text-sm font-DanaMedium"> مدیریت هنرآموزان </span> 
                        </span> 
                      <span>
                       {/* active className 'rotate-180' */} 
                       <svg className={`w-4 h-4 transition-transform transform ${ openLinks.link3 ? "rotate-180" : "" }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" > 
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /> 
                      </svg> 
                      </span> 
                    </a> 
                    <div className={`${ openLinks.link3 ? "" : "hidden" } mt-2 space-y-2 px-7`} > 
                    <Link href="/dashboard/students" className="block p-2 text-sm text-gray-500 transition-colors duration-200 rounded-md hover:text-gray-700" > مدیریت </Link> 
                    </div> 
                  </div>
                  {/* <!-- Songs links --> */}
                  <div> 
                    <a href="#" onClick={(e) => handleOpen(e, "link4")} className="w-full h-14 flex justify-between items-center p-2 transition-colors rounded-md hover:bg-slate-300" > 
                      <span className="flex gap-x-3"> 
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                        </svg>
                        <span className="text-sm font-DanaMedium"> مدیریت موسیقی ها </span> 
                        </span> 
                      <span>
                       {/* active className 'rotate-180' */} 
                       <svg className={`w-4 h-4 transition-transform transform ${ openLinks.link4 ? "rotate-180" : "" }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" > 
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /> 
                      </svg> 
                      </span> 
                    </a> 
                    <div className={`${ openLinks.link4 ? "" : "hidden" } mt-2 space-y-2 px-7`} > 
                    <Link href="/dashboard/songs" className="block p-2 text-sm text-gray-500 transition-colors duration-200 rounded-md hover:text-gray-700" > مدیریت </Link> 
                    </div> 
                  </div>
                  {/* <!-- Course links --> */}
                  <div> 
                    <a href="#" onClick={(e) => handleOpen(e, "link5")} className="w-full h-14 flex justify-between items-center p-2 transition-colors rounded-md hover:bg-slate-300" > 
                      <span className="flex gap-x-3"> 
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                      </svg>
                        <span className="text-sm font-DanaMedium"> مدیریت دوره ها </span> 
                        </span> 
                      <span>
                       {/* active className 'rotate-180' */} 
                       <svg className={`w-4 h-4 transition-transform transform ${ openLinks.link5 ? "rotate-180" : "" }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" > 
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /> 
                      </svg> 
                      </span> 
                    </a> 
                    <div className={`${ openLinks.link5 ? "" : "hidden" } mt-2 space-y-2 px-7`} > 
                    <Link href="/dashboard/courses" className="block p-2 text-sm text-gray-500 transition-colors duration-200 rounded-md hover:text-gray-700" > مدیریت </Link> 
                    </div> 
                  </div>
                  {/* <!-- Blogs links --> */}
                  <div>
                    <a href="#" onClick={(e) => handleOpen(e, "link6")} className="w-full h-14 flex justify-between items-center p-2 transition-colors rounded-md hover:bg-slate-300" > 
                      <span className="flex gap-x-3"> 
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                      </svg>

                        <span className="text-sm font-DanaMedium"> مدیریت خبرنامه ها </span> 
                        </span> 
                      <span>
                       {/* active className 'rotate-180' */} 
                       <svg className={`w-4 h-4 transition-transform transform ${ openLinks.link6 ? "rotate-180" : "" }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" > 
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /> 
                      </svg> 
                      </span> 
                    </a> 
                    <div className={`${ openLinks.link6 ? "" : "hidden" } mt-2 space-y-2 px-7`} > 
                    <Link href="/dashboard/blogs" className="block p-2 text-sm text-gray-500 transition-colors duration-200 rounded-md hover:text-gray-700" > مدیریت </Link> 
                    </div> 
                  </div>
                  {/* Gallery Links */}
                  <div> 
                    <a href="#" onClick={(e) => handleOpen(e, "link7")} className="w-full h-14 flex justify-between items-center p-2 transition-colors rounded-md hover:bg-slate-300" > 
                      <span className="flex gap-x-3"> 
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                      </svg>
                        <span className="text-sm font-DanaMedium"> مدیریت گالری </span> 
                        </span> 
                      <span>
                       {/* active className 'rotate-180' */} 
                       <svg className={`w-4 h-4 transition-transform transform ${ openLinks.link7 ? "rotate-180" : "" }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" > 
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /> 
                      </svg> 
                      </span> 
                    </a> 
                    <div className={`${ openLinks.link7 ? "" : "hidden" } mt-2 space-y-2 px-7`} > 
                    <Link href="/dashboard/gallery/photos" className="block p-2 text-sm text-gray-700 transition-colors duration-200 rounded-md hover:text-gray-700" > مدیریت عکس ها</Link> 
                    <Link href="/dashboard/gallery/videos" className="block p-2 text-sm text-gray-700 transition-colors duration-200 rounded-md hover:text-gray-700" > مدیریت فیلم ها </Link> 
                  </div>
                  </div>
                  {/* Instruments Links */}
                  <div> 
                    <a href="#" onClick={(e) => handleOpen(e, "link8")} className="w-full h-14 flex justify-between items-center p-2 transition-colors rounded-md hover:bg-slate-300" > 
                      <span className="flex gap-x-3"> 
                      <svg fill="none" viewBox="0 0 32 32" strokeWidth="1.5" stroke="currentColor" className="size-7" >
                        <path d="M 26.59375 3.0625 C 26.488281 3.0625 26.386719 3.113281 26.28125 3.21875 L 25.53125 3.96875 L 25.21875 3.65625 L 24.78125 4.0625 L 25.125 4.40625 L 24.6875 4.8125 L 24.375 4.5 L 23.9375 4.9375 L 24.25 5.25 L 23.53125 6 C 23.316406 6.214844 23.316406 6.410156 23.53125 6.625 L 19.34375 10.8125 C 18.410156 10.066406 17.414063 9.5 16.46875 9.21875 C 14.710938 8.699219 13.148438 9.074219 11.9375 10.28125 C 11.402344 10.816406 11.074219 11.46875 10.9375 12.25 C 10.71875 13.515625 9.601563 14.503906 8.28125 14.59375 C 6.839844 14.691406 5.574219 15.269531 4.625 16.21875 C 2.121094 18.722656 2.574219 23.265625 5.65625 26.34375 C 7.40625 28.09375 9.636719 29 11.6875 29 C 13.25 29 14.699219 28.457031 15.78125 27.375 C 16.730469 26.425781 17.308594 25.160156 17.40625 23.71875 C 17.496094 22.398438 18.453125 21.28125 19.71875 21.0625 C 20.5 20.925781 21.183594 20.597656 21.71875 20.0625 C 22.925781 18.855469 23.300781 17.289063 22.78125 15.53125 C 22.609375 14.945313 22.300781 14.347656 21.9375 13.75 L 20.46875 15.21875 C 20.625 15.519531 20.757813 15.808594 20.84375 16.09375 C 21.152344 17.132813 20.988281 17.980469 20.3125 18.65625 C 20.070313 18.894531 19.78125 19.027344 19.40625 19.09375 C 17.242188 19.46875 15.554688 21.367188 15.40625 23.59375 C 15.34375 24.542969 14.976563 25.363281 14.375 25.96875 C 12.648438 27.691406 9.394531 27.238281 7.09375 24.9375 C 4.792969 22.636719 4.308594 19.347656 6.03125 17.625 C 6.636719 17.023438 7.457031 16.65625 8.40625 16.59375 C 10.632813 16.445313 12.527344 14.757813 12.90625 12.59375 C 12.972656 12.21875 13.101563 11.929688 13.34375 11.6875 C 13.808594 11.222656 14.339844 11 14.96875 11 C 15.253906 11 15.582031 11.058594 15.90625 11.15625 C 16.535156 11.34375 17.238281 11.714844 17.90625 12.21875 L 14.5625 15.5625 C 14.382813 15.519531 14.195313 15.5 14 15.5 C 12.621094 15.5 11.5 16.621094 11.5 18 C 11.5 19.378906 12.621094 20.5 14 20.5 C 15.378906 20.5 16.5 19.378906 16.5 18 C 16.5 17.847656 16.464844 17.707031 16.4375 17.5625 L 25.53125 8.4375 C 25.746094 8.652344 25.972656 8.652344 26.1875 8.4375 L 26.9375 7.6875 L 27.25 8 L 27.65625 7.59375 L 27.34375 7.28125 L 27.78125 6.84375 L 28 7.28125 L 28.40625 6.84375 L 28.09375 6.53125 L 28.84375 5.78125 C 29.058594 5.566406 29.058594 5.339844 28.84375 5.125 L 26.9375 3.21875 C 26.832031 3.113281 26.699219 3.0625 26.59375 3.0625 Z M 26.5 4.28125 L 26.9375 4.71875 L 25 6.625 L 24.59375 6.21875 Z M 27.34375 5.03125 L 27.78125 5.46875 L 25.84375 7.375 L 25.4375 6.9375 Z M 9.09375 19.6875 L 7.6875 21.09375 L 10.90625 24.3125 L 12.3125 22.90625 Z"/>
                      </svg>

                        <span className="text-sm font-DanaMedium"> مدیریت سازها </span> 
                        </span> 
                      <span>
                       {/* active className 'rotate-180' */} 
                       <svg className={`w-4 h-4 transition-transform transform ${ openLinks.link8 ? "rotate-180" : "" }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" > 
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /> 
                      </svg> 
                      </span> 
                    </a> 
                    <div className={`${ openLinks.link8 ? "" : "hidden" } mt-2 space-y-2 px-7`} > 
                    <Link href="/dashboard/instruments" className="block p-2 text-sm text-gray-700 transition-colors duration-200 rounded-md hover:text-gray-700" > مدیریت ساز ها</Link> 
                  </div>
                  </div>
                  {/* Guidance Links */}
                  <div> 
                    <a href="#" onClick={(e) => handleOpen(e, "link9")} className="w-full h-14 flex justify-between items-center p-2 transition-colors rounded-md hover:bg-slate-300" > 
                      <span className="flex gap-x-3"> 
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
                        </svg>


                        <span className="text-sm font-DanaMedium"> مدیریت اطلاعات مشاوره جویان </span> 
                        </span> 
                      <span>
                       {/* active className 'rotate-180' */} 
                       <svg className={`w-4 h-4 transition-transform transform ${ openLinks.link9 ? "rotate-180" : "" }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" > 
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /> 
                      </svg> 
                      </span> 
                    </a> 
                    <div className={`${ openLinks.link9 ? "" : "hidden" } mt-2 space-y-2 px-7`} > 
                    <Link href="/dashboard/guidances" className="block p-2 text-sm text-gray-700 transition-colors duration-200 rounded-md hover:text-gray-700" > مدیریت اطلاعات مشاوره ای</Link> 
                  </div>
                  </div>
            </div>
          </div>
        </section>
     );
}
 
export default DashboardSidebar;