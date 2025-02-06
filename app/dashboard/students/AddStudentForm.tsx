"use client"

import Link from "next/link"
import { ChangeEvent, FormEvent, useState } from "react"
import ShamsiDatePicker from "@/app/ui/components/ShamsiDatePicker"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

interface IStudent {
    firstname: string
    lastname: string
    birthDate: string | Date
    gender: string
    nationalityNumber: string
    studentId?: string
    mobile: string
    email: string
    address: string
    course: string
    password: string
    status: string
    profileImg: string
}

const initialState: IStudent = {
    firstname: "",
    lastname: "",
    birthDate: new Date(),
    gender: "آقا",
    nationalityNumber: "",
    mobile: "",
    email: "",
    address: "",
    course: "",
    password: "123456",
    status: "غیرفعال",
    profileImg: "/images/avatar.png"
}

const AddStudentForm = () => {
    const router = useRouter()
    const [fields, setFields] = useState<IStudent>(initialState)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        try {
            const res = await fetch('/api/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fields),
            })

            if (res.status === 409) {
                toast.error('هنرجو با این کد ملی قبلا ثبت شده است')
                return
            }

            if (res.ok) {
                toast.success('مشخصات هنرجوی جدید با موفقیت اضافه شد')
                router.push('/dashboard/students')
                router.refresh()
            }
        } catch (error) {
            toast.error('خطا در ویرایش مشخصات هنرجو')
            console.error('Error creating student:', error)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFields(prev => ({ ...prev, [name]: value }))
    }

    const handleBirthDateChange = (gregorianDate: string) => {
        setFields(prev => ({ ...prev, birthDate: new Date(gregorianDate) }))
    }

    const handleRegistryDateChange = (gregorianDate: string) => {
        console.log('Registry date changed:', gregorianDate)
    }

    return ( 
        <form onSubmit={handleSubmit} className="w-full flex justify-center items-center flex-col gap-y-5 font-Dana text-nowrap">
            <div className="w-full grid grid-cols-2 gap-y-5 gap-x-10">
                <div className="w-full flex justify-center items-center gap-x-2">
                    <label className="w-1/3" htmlFor="firstname">نام:</label>
                    <input
                        name="firstname"
                        type="text"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        placeholder="نام"
                        required
                        value={fields.firstname}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="lastname"> نام خانوادگی:</label>
                    <input
                        name="lastname"
                        type="text"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        placeholder="نام خانوادگی"
                        required
                        value={fields.lastname}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full flex justify-center items-center gap-x-2 ">
                <label className="w-1/3">تاریخ تولد:</label>
                <div className="w-2/3">
                  <ShamsiDatePicker onBirthDateChange={handleBirthDateChange} initialDate={fields.birthDate as Date} onRegistryDateChange={handleBirthDateChange}/>
                </div>
                </div>
                <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="gender">جنسیت:</label>
                    <select
                        name="gender"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        required
                        value={fields.gender}
                        onChange={handleChange}
                    >
                        <option value="">جنسیت</option>
                        <option value="آقا">آقا</option>
                        <option value="خانم">خانم</option>
                    </select>
                </div>
                <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="nationalityNumber">شماره ملی:</label>
                    <input
                        name="nationalityNumber"
                        type="string"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        placeholder=" شماره ملی"
                        required
                        value={fields.nationalityNumber}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="mobile">شماره موبایل:</label>
                    <input
                        name="mobile"
                        type="text"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        required
                        placeholder="شماره موبایل"
                        value={fields.mobile }
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="email">ایمیل:</label>
                    <input
                        type="email"
                        name="email"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        required
                        placeholder="آدرس ایمیل"
                        value={fields.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="address">آدرس:</label>
                    <input
                        type="text"
                        name="address"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        required
                        placeholder="آدرس منزل"
                        value={fields.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="course">رشته آموزشی:</label>
                    <select
                        name="course"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        required
                        value={fields.course || ""}
                        onChange={handleChange}
                    >
                        <option value="">رشته آموزشی </option>
                        <option value="ویلون">ویلون</option>
                        <option value="پیانو">پیانو</option>
                        <option value="گیتار">گیتار</option>
                        <option value="سه تار">سه تار</option>
                        <option value="دف">دف</option>
                        <option value="نی">نی</option>
                        <option value="تار">تار</option>
                        <option value="تنبک">تنبک</option>
                    </select>
                </div>
                <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="password">رمز عبور:</label>
                    <input
                        type="text"
                        name="password"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        required
                        placeholder="رمز عبور"
                        value={fields.password}
                        onChange={handleChange}
                    />
                </div>          
                <div className="w-full flex justify-center items-center gap-x-2">
                    <label className="w-1/3" htmlFor="status">وضعیت:</label>
                    <select
                        name="status"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        required
                        value={fields.status}
                        onChange={handleChange}
                    >
                        <option value="">وضعیت</option>
                        <option value="فعال">فعال</option>
                        <option value="غیرفعال">غیرفعال</option>
                    </select>
                </div>
            </div>
            <div className="w-1/4 flex justify-center items-center flex-col gap-y-3 ">
                <button type="submit" className="w-full p-3 bg-green-600 rounded-lg text-center text-white">ایجاد هنرجوی جدید</button>
                <Link href={"/dashboard/students"}    className="w-full p-3 bg-red-600 rounded-lg text-center text-white" >  انصراف</Link>
            </div>
        </form> 
     );
}
 
export default AddStudentForm;