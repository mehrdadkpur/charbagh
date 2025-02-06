"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface IPhoto {
    _id: string
    url: string
    title: string
    category: string
    photoDate: string
    description:String
}

export default function PhotoGallery() {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [categories, setCategories] = useState(['all'])
    const [photos, setPhotos] = useState<IPhoto[]>([])
    const [hoveredPhotoId, setHoveredPhotoId] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const photosPerPage = 12

    useEffect(() => {
        const fetchPhotosData = async () => {
            const response = await fetch("/api/gallery/photos")
            const data = await response.json()
            setPhotos(data.photos || []) 
        }
        fetchPhotosData()
    }, [])

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('/api/gallery/photos/categories')
            const data = await response.json()
            setCategories(['all', ...data.categories])
        }
        fetchCategories()
    }, [])

    const handleCategoryClick = async (category: string) => {
        setSelectedCategory(category)
        setCurrentPage(1)  // Reset to first page when category changes
    }

    const filteredPhotos = selectedCategory === 'all' 
        ? photos 
        : photos.filter(photo => photo.category === selectedCategory)

    const totalPages = Math.ceil(filteredPhotos.length / photosPerPage)
    const indexOfLastPhoto = currentPage * photosPerPage
    const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage
    const currentPhotos = filteredPhotos.slice(indexOfFirstPhoto, indexOfLastPhoto)

    const Pagination = () => (
        <div className="flex justify-center gap-2 mt-8 font-DanaMedium">
            <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
            >
                قبلی
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-lg ${
                        currentPage === index + 1 
                           ? 'bg-blue-600 text-white dark:bg-elf' 
                            : 'bg-gray-200 dark:bg-gray-600'
                    }`}
                >
                    {index + 1}
                </button>
            ))}
            
            <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-600 dark:bg-gray-600 text-white rounded-lg disabled:bg-gray-300"
            >
                بعدی
            </button>
        </div>
    )

    return (
        <div className="flex">
            <main className="flex-1 p-4">
                {/* Category Buttons */}
                <div className="flex items-center justify-center py-4 md:py-8 flex-wrap font-DanaMedium">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => handleCategoryClick(category)}
                            className={`${
                                selectedCategory === category 
                                    ? 'text-blue-700 dark:text-mango dark:border-mango dark:bg-gray-600 border-blue-600 hover:bg-blue-700 hover:text-white'
                                    : 'text-gray-900 dark:text-gray-50 dark:bg-gray-600 border-white hover:border-gray-200'
                            } border bg-white rounded-full px-5 py-2.5 text-center me-3 mb-3`}
                        >
                            {category === 'all' ? 'همه دسته بندی ها' : category}
                        </button>
                    ))}
                </div>

                {/* Photos Grid */}
                {currentPhotos.length === 0 ? (
                    <div className="w-full h-96 flex justify-center items-center text-xl font-DanaDemiBold">
                        <p>هنوز هیچ عکسی در دیتابیس وجود ندارد.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-8 gap-4">
                            {currentPhotos.map((photo) => (
                                <div onMouseEnter={() => setHoveredPhotoId(photo._id)} onMouseLeave={() => setHoveredPhotoId(null)} key={photo._id} className="aspect-square relative overflow-hidden rounded-lg">
                                    <Image 
                                        src={photo.url} 
                                        alt={photo.title} 
                                        fill 
                                        sizes="(max-width: 768px) 20vw, 33vw" 
                                        className="object-cover hover:scale-105 transition-transform duration-500" 
                                    />
                                    <div className={`absolute bottom-0 w-full bg-black/60 text-white px-4 py-2 transition-transform duration-500 ${hoveredPhotoId === photo._id ? 'translate-y-0' : 'translate-y-full'}`}>
                                        <div>{photo.title}</div>
                                        <div>{photo.description}</div>
                                        <div>سال {photo.photoDate}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Pagination />
                    </>
                )}
            </main>
        </div>
    )
}
