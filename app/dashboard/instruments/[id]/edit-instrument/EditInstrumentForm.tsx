'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Loading from '@/app/loading'
import { fetchTeachersName } from '@/lib/teachersName'
import UploadInput from '@/app/ui/components/UploadInput'
import toast from 'react-hot-toast'

interface FormFields {
    instrument_name: string
    instrument_type: string
    instrument_teachers: string[]
    instrument_description: string
    instrument_origin: string
    instrument_img?: string
}

interface ITeacher {
    _id: string
    firstname: string
    lastname: string
}

const EditInstrumentForm = () => {
    const { id } = useParams()
    const router = useRouter()

    const [teachers, setTeachers] = useState<ITeacher[]>([])
    const [fields, setFields] = useState<FormFields>({
        instrument_name: "",
        instrument_type: "",
        instrument_teachers: [],
        instrument_description: "",
        instrument_origin: "",
    })
    const [uploading, setUploading] = useState(false)
    const [imagePreview, setImagePreview] = useState<string>("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [instrumentResponse, teachersData] = await Promise.all([
                    fetch(`/api/instruments/${id}`),
                    fetchTeachersName()
                ])
                
                const instrumentData = await instrumentResponse.json()
                setFields(instrumentData)
                setTeachers(teachersData)
                setImagePreview(instrumentData.instrument_img || '')
            } catch (error) {
                toast.error('خطا در دریافت اطلاعات')
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchData()
    }, [id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFields(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await fetch(`/api/instruments/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fields)
            })

            if (response.ok) {
                toast.success('ویرایش موفقیت آمیز بود')
                router.push('/dashboard/instruments')
            }
        } catch (error) {
            toast.error('ویرایش ناموفق')
        }
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        setFields(prev => ({
            ...prev,
            instrument_teachers: checked 
                ? [...prev.instrument_teachers, name]
                : prev.instrument_teachers.filter(teacher => teacher !== name)
        }))
    }

    const handleImageUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            setImagePreview(reader.result as string)
        }
        reader.readAsDataURL(file)

        setUploading(true)
        const formData = new FormData()
        formData.append("file", file)
        formData.append("instrumentName", fields.instrument_name)
        
        if (fields.instrument_img) {
            formData.append('instrument_img', fields.instrument_img)
        }

        try {
            const response = await fetch("/api/instruments/upload-instrument-image", {
                method: "POST",
                body: formData,
            })

            const data = await response.json()
            if (data.url) {
                setFields(prev => ({ ...prev, instrument_img: data.url }))
                toast.success('آپلود موفقیت آمیز')
            }
        } catch (error) {
            toast.error('آپلود ناموفق')
        } finally {
            setUploading(false)
        }
    }

    if (loading) return <Loading />

    return (
        <form onSubmit={handleSubmit} className="w-full flex justify-center items-start flex-col gap-y-5">
            <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="instrument_name">نام ساز:</label>
                <input
                    name="instrument_name"
                    type="text"
                    className="w-full h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                    placeholder="نام ساز"
                    required
                    value={fields.instrument_name}
                    onChange={handleChange}
                />
            </div>
            <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="instrument_type">نوع ساز:</label>
                <input
                    name="instrument_type"
                    type="text"
                    className="w-full h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                    placeholder="نوع ساز"
                    required
                    value={fields.instrument_type}
                    onChange={handleChange}
                />
            </div>
            <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="instrument_origin">مبدا ساز:</label>
                <input
                    name="instrument_origin"
                    type="text"
                    className="w-full h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                    placeholder="مبدا ساز"
                    required
                    value={fields.instrument_origin}
                    onChange={handleChange}
                />
            </div>
            <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="instrument_description">توضیحات ساز:</label>
                <textarea
                    name="instrument_description"
                    rows={10}
                    cols={50}
                    className="w-full border p-3 bg-gray-50 dark:bg-gray-700"
                    placeholder="توضیحات ساز"
                    required
                    value={fields.instrument_description}
                    onChange={handleChange}
                />
            </div>
            <UploadInput uploadedImage={imagePreview} handleImageUpload={handleImageUpdate} uploading={uploading} />
            <div className=" w-full h-40 flex flex-col font-DanaMedium gap-y-3 border p-3 overflow-y-auto">
                <span>انتخاب استاد</span>
                {
                teachers.map((teacher)=>(
                    <div key={teacher._id} className="w-full">
                        <div className="w-full flex gap-x-3 items-center"> 
                            <input onChange={handleCheckboxChange} type="checkbox" id={`teacher-${teacher._id}`} name={`${teacher.firstname} ${teacher.lastname}`} value={fields.instrument_teachers} /> 
                            <label htmlFor={`teacher-${teacher._id}`} className="">{teacher.firstname}{' '}{teacher.lastname}</label> 
                        </div>
                    </div> 
                ))
                }
            </div>
            <div className="w-full flex justify-center items-center flex-col gap-y-3 ">
                <button type="submit" className="w-full p-3 bg-green-600 rounded-lg text-center text-white"> ثبت ساز</button>
                <Link href={"/dashboard/instruments"}    className="w-full p-3 bg-red-600 rounded-lg text-center text-white" >  انصراف</Link>
            </div>
        </form>
     );
 }
 export default EditInstrumentForm;