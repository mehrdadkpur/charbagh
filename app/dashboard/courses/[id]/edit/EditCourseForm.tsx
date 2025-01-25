'use client'

import Link from 'next/link'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Loading from '@/app/loading'
import { fetchTeachersName } from '@/lib/teachersName'
import toast from 'react-hot-toast'
import UploadInput from '@/app/ui/components/UploadInput'

interface FormFields {
    course_name: string
    course_teachers: string[]
    course_description: string
    course_img?: string
    course_status: string
}

interface Teacher {
    _id: string
    firstname: string
    lastname: string
}

const EditCourseForm = () => {
    const { id } = useParams()
    const router = useRouter()

    const [teachers, setTeachers] = useState<Teacher[]>([])
    const [fields, setFields] = useState<FormFields>({
        course_name: "",
        course_teachers: [],
        course_description: "",
        course_status: "فعال",
        course_img: ""
    })
    const [imagePreview, setImagePreview] = useState<string>("")
    const [uploading, setUploading] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [courseResponse, teachersData] = await Promise.all([
                    fetch(`/api/courses/${id}`),
                    fetchTeachersName()
                ])
                
                const courseData = await courseResponse.json()
                setFields(courseData)
                setTeachers(teachersData)
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchData()
    }, [id])

    useEffect(() => { 
        setImagePreview(fields.course_img || "") 
    }, [fields.course_img])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFields(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch(`/api/courses/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fields)
            })

            if (response.ok) {
                router.push('/dashboard/courses')
                toast.success('دوره مورد نظر با موفقیت ویرایش شد')
            }
        } catch (error) {
            toast.error('خطا در ویرایش دوره')
            console.error('Error updating Course:', error)
        }
    }

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        setFields(prev => ({
            ...prev,
            course_teachers: checked 
                ? [...prev.course_teachers, name]
                : prev.course_teachers.filter(teacher => teacher !== name)
        }))
    }

    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            setImagePreview(reader.result as string)
        }
        reader.readAsDataURL(file)

        setUploading(true)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('courseName', fields.course_name)

        if (fields.course_img) {
            formData.append('previousUrl', fields.course_img)
        }

        try {
            const response = await fetch('/api/courses/upload-course-image', {
                method: 'POST',
                body: formData
            })

            const data = await response.json()
            if (data.url) {
                setFields(prev => ({ ...prev, course_img: data.url }))
                toast.success('تصویر با موفقیت آپلود شد')
            }
        } catch (error) {
            toast.error('خطا در آپلود تصویر')
            console.error('Upload error:', error)
        } finally {
            setUploading(false)
        }
    }

    if (loading) return <Loading />


    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-5 font-Dana">
            <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="course_name"> نام دوره: </label>
                <input
                name="course_name"
                type="text"
                className="w-full h-12 border p-3"
                placeholder="نام دوره"
                required
                value={fields.course_name}
                onChange={(e) => setFields(prev => ({...prev, [e.target.name]: e.target.value}))}
            />
            </div>     
            <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="course_description"> درباره: </label>
                <textarea
                        name="course_description"
                        className="w-full h-60 border p-3"
                        placeholder="درباره دوره"
                        required
                        value={fields.course_description}
                        onChange={(e) => setFields(prev => ({...prev, [e.target.name]: e.target.value}))}
                    />
            </div>
            <div className="w-full flex justify-center items-center gap-x-2">
                    <label className="w-1/3" htmlFor="course_status">
                        وضعیت:
                    </label>
                    <select
                        name="course_status"
                        className="w-2/3 h-12 border p-3"
                        required
                        value={fields.course_status}
                        onChange={handleChange}
                    >
                        <option value="">وضعیت</option>
                        <option value="فعال">فعال</option>
                        <option value="غیرفعال">غیرفعال</option>
                    </select>
            </div>
            <div className="h-40 flex flex-col gap-y-3 border p-3 overflow-y-auto">
                <span className="font-DanaMedium">انتخاب استاد</span>
                {teachers.map((teacher) => (
                    <div key={teacher._id} className="flex gap-x-3 items-center">
                        <input type="checkbox" id={`teacher-${teacher._id}`} checked={fields.course_teachers.includes(`${teacher.firstname} ${teacher.lastname}`)}  name={`${teacher.firstname} ${teacher.lastname}`} onChange={handleCheckboxChange} />
                        <label htmlFor={`teacher-${teacher._id}`}>
                            {teacher.firstname} {teacher.lastname}
                        </label>
                    </div>
                ))}
            </div>
            <UploadInput uploadedImage={imagePreview} handleImageUpload={handleImageUpload} uploading={uploading} />
            <div className="flex flex-col gap-y-3">
                <button type="submit" className="p-3 bg-green-600 rounded-lg text-white">
                    ویرایش مشخصات دوره
                </button>
                <Link href="/dashboard/courses" className="p-3 bg-red-600 rounded-lg text-center text-white">
                    انصراف
                </Link>
            </div>
        </form>
     );
 }
 export default EditCourseForm;