'use client'
import ProfileImageUpload from '@/app/ui/components/ProfileImageUpload'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import jalaali from 'jalaali-js';

interface User {
  firstname: string
  lastname: string
  nationalityNumber: string
  role: 'teacher' | 'student'
  profileImg: string
  isAdmin: boolean
  gender:string
  mobile:string
  birthDate:string
  address:string
  teacherId:number
  studentId:number
  status:string
  email:string
  skill:string
  course:string
  mainImg:string

}

export default function Profile() {
    
  const [user, setUser] = useState<User | null >(null)
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);

  useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch('/api/user/profile')
            const data = await response.json()
            setUser(data.user)
            setProfileImage(data.user?.profileImg)
        }
        fetchUserData()
    }, [])

  const handleImageUpdate = (newImageUrl: string) => {
    setProfileImage(newImageUrl)
  }

  const formatBirthDate = (birthDate: string) => {
    if (!birthDate) return ''
    const date = new Date(birthDate)
    const shamsi = jalaali.toJalaali(date)
    return `${shamsi.jy}/${shamsi.jm}/${shamsi.jd}`
}

if (!user) return <div>Loading...</div>


    return ( 
        <div className="w-full flex justify-center pr-[340px] pl-10 mt-3">
            <div className="w-full p-5 flex justify-center bg-white rounded-xl">
                <div className="w-full flex flex-col justify-center items-center gap-y-5 ">
                    <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4"> {user?.role === "teacher"? " پنل کاربری استاد": " پنل کاربری هنرآموز"} </span>
                    <div className="w-full flex flex-col justify-center items-center sm:rounded-lg">
                        <div className="w-1/3 flex justify-center items-center gap-x-5">
                        <ProfileImageUpload currentImage={profileImage || user?.profileImg} onUpdate={handleImageUpdate} />
                        </div>
                        <div className="w-2/3 flex p-3 shadow-xl font-DanaMedium rounded-lg">
                            <div className="w-1/2 flex flex-col gap-y-2 p-3">
                                <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                    <span>نام و نام خانوادگی:</span>
                                    <span className="text-xl">{user?.firstname}{" "}{user?.lastname}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                    <span> شماره ملی:</span>
                                    <span className="text-xl">{user?.nationalityNumber}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                    <span>  جنسیت:</span>
                                    <span className="text-xl">{user?.gender}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                    <span>  شماره موبایل:</span>
                                    <span className="text-xl">{user?.mobile}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                    <span>  تاریخ تولد:</span>
                                    <span className="text-xl">{formatBirthDate(user.birthDate)}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                    <span>   آدرس محل سکونت:</span>
                                    <span className="text-xl">{user?.address}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                    <span>  { user?.role === "teacher"?" شماره پرسنلی" : "شماره هنرآموزی"}:</span>
                                    <span className="text-xl">{user?.teacherId || user?.studentId}</span>
                                </div>
                            </div>
                            <div className="w-1/2 flex flex-col gap-y-2 p-3">
                                <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                    <span> وضعیت:</span>
                                    <span className="text-xl">{user?.status}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                    <span>  ایمیل:</span>
                                    <span className="text-xl">{user?.email}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                    <span> {user?.role === 'teacher'?" حوزه فعالیت":"کلاس آموزش"}:</span>
                                    <span className="text-xl">{user?.skill || user?.course}</span>
                                </div>
                            </div>
                        </div>                        
                    </div>
                    <div className="w-1/5 flex justify-center items-center font-DanaMedium">
                        <Link href={"/"} className="w-full p-3 bg-red-600 rounded-lg text-xl text-center text-white" >  بازگشت</Link>
                    </div>
                </div>
            </div>
        </div>
     );
}
 