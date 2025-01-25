"use client"

import Link from "next/link"
import { useState, ChangeEvent, FormEvent } from "react"
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface AddBookFormProps {
    id: string
}

interface BookFields {
    book_name: string
    songs: string[]
}

const AddBookForm = ({ id }: AddBookFormProps) => {
    const router = useRouter()
    const [fields, setFields] = useState<BookFields>({
        book_name: "",
        songs: []
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFields(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()

        Object.entries(fields).forEach(([key, value]) => {
            formData.append(key, value)
        })

        try {
            const response = await fetch(`/api/songs/${id}/books`, {
                method: 'POST',
                body: formData,
            })

            const data = await response.json()
            if (data.success) {
                toast.success('کتاب با موفقیت اضافه شد')
                router.push(`/dashboard/songs/${id}`)
                router.refresh()
            }
        } catch (error) {
            toast.error('خطا در ثبت کتاب')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full flex justify-center items-start flex-col gap-y-5">
            <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="book_name">نام کتاب:</label>
                <input
                    name="book_name"
                    type="text"
                    className="w-full h-12 border p-3"
                    placeholder="نام کتاب"
                    required
                    value={fields.book_name}
                    onChange={handleChange}
                />
            </div>
            <div className="w-full flex justify-center items-center flex-col gap-y-3">
                <button
                    type="submit"
                    className="w-full p-3 bg-green-600 rounded-lg text-center text-white hover:bg-green-700 transition-colors"
                >
                    ایجاد کتاب
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

export default AddBookForm
