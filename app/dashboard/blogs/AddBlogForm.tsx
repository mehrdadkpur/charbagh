"use client"

import Link from "next/link"
import { useState, ChangeEvent, FormEvent } from "react"
import { useRouter } from "next/navigation"
import UploadInput from "@/app/ui/components/UploadInput"
import toast from "react-hot-toast"

interface IBlog {
    blog_author: string;
    blog_title: string;
    blog_text: string;
    blog_img: string;
}

const AddBlogForm = () => {
    const router = useRouter()
    const [fields, setFields] = useState<IBlog>({
        blog_author: "",
        blog_title: "",
        blog_text: "",
        blog_img: "",
    })
    const [uploading, setUploading] = useState(false)
    const [imagePreview, setImagePreview] = useState('/images/avatar.png')

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFields(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response = await fetch("/api/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(fields),
            })

            if (response.ok) {
                toast.success("پست جدبد با موفقیت ایجاد شد.")
                router.push('/dashboard/blogs')
            }
        } catch (error) {
            toast.error("خطا در ایجاد پست جدید")
            console.error("Error submitting blog:", error)
        }
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
        formData.append('blog_title', fields.blog_title)

        try {
            const response = await fetch('/api/blogs/upload-blog-image', {
                method: 'POST',
                body: formData
            })

            const data = await response.json()
            if (data.url) {
                setFields(prev => ({ ...prev, blog_img: data.url }))
                toast.success('تصویر با موفقیت آپلود شد')
            }
        } catch (error) {
            toast.error('خطا در آپلود تصویر')
            console.error('Upload error:', error)
        } finally {
            setUploading(false)
        }
    }
    return (
        <form onSubmit={handleSubmit} className="w-full flex justify-center items-start flex-col gap-y-5 font-DanaMedium">
          <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="blog_author"> نویسنده: </label>
                <input
                    name="blog_author"
                    className="w-full h-12 border p-3"
                    placeholder="نویسنده "
                    required
                    value={fields.blog_author}
                    onChange={handleChange}
                    />
            </div>
            <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="blog_title"> موضوع: </label>
                <input
                        name="blog_title"
                        className="w-full h-12 border p-3"
                        placeholder="موضوع "
                        required
                        value={fields.blog_title}
                        onChange={handleChange}
                    />
            </div>
            <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="blog_text"> متن پست: </label>
                <textarea
                        name="blog_text"
                        className="w-full h-60 border p-3"
                        placeholder="متن پست "
                        required
                        value={fields.blog_text}
                        onChange={handleChange}
                    />
            </div>
            <UploadInput uploadedImage={imagePreview} uploading={uploading} handleImageUpload={handleImageUpload}  />
            <div className="w-full flex justify-center items-center flex-col gap-y-3">
                <button 
                    type="submit" 
                    className="w-full p-3 bg-green-600 rounded-lg text-center text-white hover:bg-green-700 transition-colors"
                >
                    ساخت پست
                </button>
                <Link 
                    href="/dashboard/blogs" 
                    className="w-full p-3 bg-red-600 rounded-lg text-center text-white hover:bg-red-700 transition-colors"
                >
                    انصراف
                </Link>
            </div>
        </form>
    )
}

export default AddBlogForm

