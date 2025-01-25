"use client"

import Link from "next/link"
import { ChangeEvent, FormEvent, useState } from "react"
import { useRouter } from 'next/navigation'
import UploadInput from "@/app/ui/components/UploadInput"
import toast from "react-hot-toast"

interface InstrumentFields {
    _id: string
    instrument_name: string
    instrument_img: string
    books: string[]
}

const initialFields: InstrumentFields = {
    _id: "",
    instrument_name: "",
    instrument_img: "",
    books: []
}

const AddInstrumentForm = () => {
    const router = useRouter()
    const [fields, setFields] = useState<InstrumentFields>(initialFields)
    const [uploading, setUploading] = useState(false)
    const [imagePreview, setImagePreview] = useState('/images/avatar.png')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFields(prev => ({ ...prev, [name]: value }))
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
        formData.append('instrumentName', fields.instrument_name)

        if (fields.instrument_img) {
            formData.append('previousUrl', fields.instrument_img)
        }

        try {
            const response = await fetch('/api/songs/upload-instrument-image', {
                method: 'POST',
                body: formData
            })

            const data = await response.json()
            if (data.url) {
                setFields(prev => ({ ...prev, instrument_img: data.url }))
                toast.success('آپلود موفقیت آمیز')
            }
        } catch (error) {
            toast.error('خطا در آپلود فایل')
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()

        if (!fields.instrument_name || !fields.instrument_img) {
            toast.error('لطفا تمام فیلدها را پر کنید')
            return
        }

        try {
            Object.entries(fields).forEach(([key, value]) => {
                formData.append(key, value)
            })

            const response = await fetch('/api/songs', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            await response.json()
            toast.success('ایجاد ساز جدید موفقیت آمیز بود')
            router.push('/dashboard/songs')
            router.refresh()

        } catch (error) {
            if (error instanceof Error) {
                toast.error(`خطا در ایجاد ساز: ${error.message}`)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full flex justify-center items-start flex-col gap-y-5">
            <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="instrument_name">نام ساز:</label>
                <input
                    id="instrument_name"
                    name="instrument_name"
                    type="text"
                    className="w-full h-12 border p-3"
                    placeholder="نام ساز"
                    required
                    value={fields.instrument_name}
                    onChange={handleChange}
                />
            </div>
            <UploadInput 
                uploadedImage={imagePreview} 
                handleImageUpload={handleImageUpload} 
                uploading={uploading} 
            />
            <div className="w-full flex justify-center items-center flex-col gap-y-3">
                <button 
                    type="submit" 
                    className="w-full p-3 bg-green-600 rounded-lg text-center text-white hover:bg-green-700 transition-colors"
                    disabled={uploading}
                >
                    ایجاد ساز
                </button>
                <Link 
                    href="/dashboard/songs" 
                    className="w-full p-3 bg-red-600 rounded-lg text-center text-white hover:bg-red-700 transition-colors"
                >
                    انصراف
                </Link>
            </div>
        </form>
    )
}

export default AddInstrumentForm
