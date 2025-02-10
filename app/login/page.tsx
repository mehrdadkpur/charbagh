'use client'

import { useState, FormEvent, ChangeEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Image from 'next/image'

interface FormData {
  nationalityNumber: string
  password: string
  role:string
}

export default function Login() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<FormData>({
    nationalityNumber: '',
    password: '',
    role:''
  })

  useEffect(() => {
        document.title = 'آموزشگاه موسیقی چهارباغ | ورود';
}, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      console.log('Response:', data)

      if (!res.ok) {
        toast.error("نام کاربری یا رمز عبور صحیح نمی باشد.")
        throw new Error( 'خطا در ورود به سیستم');

      }
      toast.success("ورود با موفقیت انجام شد")
      router.push('/')
        router.refresh()
    } catch (error: any) {
      setError("خطا در ورود به حساب کاربری")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return ( 
    <section className=" h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <Link href="/" className="flex flex-col items-center gap-y-3 mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <Image width={75} height={75} src="/images/logo.png" alt="logo"/>
                <div className="md:text-2xl lg:text-3xl text-[#F6F4EE] font-MorabbaBold text-center flex justify-center items-center">آمـوزشگاه موسیقـی <span className=" bg-mango md:py-2 px-2 rounded-2xl text-greenDark">چهــــاربـــاغ</span></div>
                </Link>
            <div className="w-full bg-white rounded-lg shadow-md dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        ورود به حساب کاربری
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                        <div className="mt-4 text-gray-900 dark:text-gray-50">
                            <select required name="role" value={formData.role} onChange={handleChange} className="w-full bg-gray-50 py-3 rounded-xl dark:bg-gray-700 " >
                                <option value="">نقش خود را انتخاب نمایید</option>
                                <option value="teacher">استاد</option>
                                <option value="student">هنرحو</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">نام کاربری</label>
                            <input onChange={handleChange} value={formData.nationalityNumber} type="text" name="nationalityNumber" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="کد ملی" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">رمز عبور</label>
                            <input onChange={handleChange} value={formData.password} type="password" name="password" id="password" placeholder="رمز عبور را وارد نمایید" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <button type="submit" className="w-full bg-elf focus:ring-4 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center">ورود</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
)

}
