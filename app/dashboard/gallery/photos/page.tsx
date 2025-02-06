"use client"

import Search from "@/app/ui/components/Search"
import AddButton from "@/app/ui/components/AddButton"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import Image from "next/image"
import toast from "react-hot-toast"
import DeleteModal from "@/app/ui/components/DeleteModal"

interface IPhoto {
    _id: string
    title: string
    url: string
    photoDate?: string
    description: string
    category: string
    tags: string[]
}

interface QueryState {
    text: string
}

const Photos = () => {
    const router = useRouter()
    const [photos, setPhotos] = useState<IPhoto[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null)
    const [query, setQuery] = useState<QueryState>({ text: "" })
    const [filteredPhotos, setFilteredPhotos] = useState<IPhoto[]>([])

    const fetchPhotosData = async () => {
        try {
            const response = await fetch("/api/gallery/photos")
            const data = await response.json()
            setPhotos(data.photos || [])
            setFilteredPhotos(data.photos)
        } catch (error) {
            toast.error("خطا در دریافت اطلاعات")
        }
    }

    useEffect(() => {
        fetchPhotosData()
    }, [])

    const handleOpenModal = (photoId: string) => {
        setIsModalOpen(true)
        setSelectedPhotoId(photoId)
    }

    const handleDeletePhoto = async () => {
        if (!selectedPhotoId) return

        try {
            const res = await fetch(`/api/gallery/photos/${selectedPhotoId}`, {
                method: "DELETE"
            })

            if (res.ok) {
                toast.success("حذف عکس موفقیت آمیز بود")
                setPhotos(photos.filter((photo) => photo._id !== selectedPhotoId))
                router.refresh()
                setIsModalOpen(false)
            }
        } catch (error) {
            toast.error("خطا در حذف عکس")
            console.error("Error deleting Photo:", error)
        }
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value.toLowerCase()
        setQuery({ text: e.target.value })
        
        const allPhotos = photos.filter((photo) => 
            photo.title.toLowerCase().includes(searchText)
        )
        setFilteredPhotos(allPhotos)
    }
  
    return ( 
        <section className="w-full flex justify-center pr-[340px] pl-10 mt-3">
            <div className="w-full p-5 flex justify-center rounded-xl ">
                <div className="w-full mt-5">                   
                    <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4">عکس های گالری</span>
                    <div className="relative w-full h-auto flex flex-col justify-center items-center sm:rounded-lg">
                                                                        {/* Search Box & Add Song Button*/}
                        <div className="w-full flex justify-center items-center gap-x-5 mb-5">
                            <Search query={query} handleSearch={handleSearch} baseSearch={"نام عکس"}/>
                            <AddButton route={"/dashboard/gallery/photos/add-photo"}/>  
                        </div>
                                                                        {/* Delete Modal */}
                        <DeleteModal onDelete={handleDeletePhoto} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

                                                                         {/* table */}   
                        {
                            photos.length === 0 ? (
                            <div className="w-full h-96 flex justify-center items-center text-xl font-DanaDemiBold">
                                <p>هنوز هیچ عکسی اضافه نکردی. برای اضافه کردن اولین عکس از دکمه + بالا استفاده کن.</p>
                            </div>):
                        
                        <table className="w-full text-sm">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">نام عکس  </th>
                                    <th scope="col" className="px-6 py-3">تاریخ تهیه عکس  </th>
                                    <th scope="col" className="px-6 py-3">توضیح</th>
                                    <th scope="col" className="flex justify-center items-center py-3">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredPhotos.map((photo) => (
                                <tr key={photo._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 flex-shrink-0">
                                            <Image width={40} height={40} className="rounded-full object-cover" src={photo.url || "images/avatar.png"} alt={photo.title}/>
                                        </div>
                                        <div className="mr-3">
                                            <div className="text-base font-semibold"> {photo.title} </div>
                                        </div>
                                    </div>
                                    </td>            
                                    <td className="px-6 py-4">{photo.photoDate}</td>
                                    <td className="px-6 py-4">{photo.description}</td>
                                    <td className="flex justify-center items-center py-4">
                                    <div className="flex items-center gap-2">
                                        <Link 
                                        href={`/dashboard/gallery/photos/${photo._id}`}
                                        className="bg-green-700 px-3 py-1.5 rounded-lg text-white hover:bg-green-800 transition-colors"
                                        >
                                        مشاهده مشخصات عکس
                                        </Link>
                                        <Link 
                                        href={`/dashboard/gallery/photos/${photo._id}/edit-photo`}
                                        className="bg-orange-700 px-3 py-1.5 rounded-lg text-white hover:bg-orange-800 transition-colors"
                                        >
                                        ویرایش
                                        </Link>
                                        <button 
                                        onClick={() => handleOpenModal(photo._id)}
                                        className="bg-red-700 px-3 py-1.5 rounded-lg text-white hover:bg-red-800 transition-colors"
                                        >
                                        حذف
                                        </button>
                                    </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        }
                    </div>
                </div>
            </div>
        </section>

     );
}
 
export default Photos;

