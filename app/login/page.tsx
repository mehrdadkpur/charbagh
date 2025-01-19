'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
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
    <div className=" w-full h-screen flex items-center pr-20 font-Dana bg-[url('/images/020.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="lg:w-1/3  rounded-md py-10 shadow-2xl">
            <div className="w-full py-12 flex justify-center">
                <div className="flex justify-center items-center flex-col gap-3">
                    <div className="text-2xl text-greenDark tracking-wide text-center font-MorabbaMedium">
                        آموزشگاه موسیقی چهارباغ
                    </div>
                    <Link href='/' className="w-16 h-16">
                        <Image width={64} height={64} src="/images/logo.png" alt="logo" />
                    </Link>
                </div>
            </div>
            <div className="px-12 sm:px-24">
                <h2 className="text-2xl text-mango font-DanaDemiBold xl:text-xl">
                    ورود به صفحه کاربری
                </h2>
                <div className="mt-12">
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-y-5'>
                            <div className="mt-4">
                                <select required name="role" value={formData.role} onChange={handleChange} className="w-full bg-transparent border-b border-gray-300" >
                                    <option value="">نقش خود را انتخاب نمایید</option>
                                    <option value="teacher">استاد</option>
                                    <option value="student">هنرحو</option>
                                </select>
                            </div>
                            <div>
                                <div className="text-sm font-bold text-gray-700"> کد ملی </div>
                                <input 
                                    className="w-full bg-transparent text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-mango" 
                                    type="text"
                                    name="nationalityNumber"
                                    value={formData.nationalityNumber}
                                    onChange={handleChange}
                                    placeholder="کد ملی خود را وارد نمایید"
                                />
                            </div>       
                        </div>
                        <div className="mt-8">
                            <div className="flex justify-between items-center">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">
                                    رمز عبور
                                </div>
                                <div>
                                    {/* <a className="text-xs font-dana text-mango-200 hover:text-mango cursor-pointer">
                                        فراموشی رمز عبور
                                    </a> */}
                                </div>
                            </div>
                            <input 
                                className="w-full bg-transparent text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-mango" 
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="رمز عبور خود را وارد نمایید"
                            />
                        </div>
                        <div className="w-1/2 mt-10 mx-auto">
                            <button 
                                type="submit"
                                className="bg-mango-900 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-mango shadow-lg"
                            >
                                {loading ? 'در حال ورود...' : 'ورود'}
                            </button>
                        </div>
                    </form>
                    <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                    </div>
                </div>
            </div>
        </div>
    </div>
)

}
