"use client"
import { useEffect, useState } from 'react'

interface IVideo {
    _id: string
    url: string
    title: string
    category: string
    videoDate: string
    description:String
}

export default function PhotoGallery() {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [categories, setCategories] = useState(['all'])
    const [videos, setVideos] = useState<IVideo[]>([])
    const [hoveredPhotoId, setHoveredPhotoId] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const videosPerPage = 12

    useEffect(() => {
        const fetchPhotosData = async () => {
            const response = await fetch("/api/gallery/videos")
            const data = await response.json()
            setVideos(data.videos || []) 
        }
        fetchPhotosData()
    }, [])

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('/api/gallery/videos/categories')
            const data = await response.json()
            setCategories(['all', ...data.categories])
        }
        fetchCategories()
    }, [])

    const handleCategoryClick = async (category: string) => {
        setSelectedCategory(category)
        setCurrentPage(1)  // Reset to first page when category changes
    }

    const filteredVideos = selectedCategory === 'all' 
        ? videos 
        : videos.filter(video => video.category === selectedCategory)

    const totalPages = Math.ceil(filteredVideos.length / videosPerPage)
    const indexOfLastPhoto = currentPage * videosPerPage
    const indexOfFirstPhoto = indexOfLastPhoto - videosPerPage
    const currentVideos = filteredVideos.slice(indexOfFirstPhoto, indexOfLastPhoto)

    const Pagination = () => (
        <div className="flex justify-center gap-2 mt-8 font-DanaMedium">
            <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-600 dark:bg-gray-600 text-white rounded-lg disabled:bg-gray-300"
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

                {/* videos Grid */}
                {currentVideos.length === 0 ? (
                    <div className="w-full h-96 flex justify-center items-center text-xl font-DanaDemiBold">
                        <p>هنوز هیچ فیلمی در دیتابیس وجود ندارد.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {currentVideos.map((video) => (
                                <div onMouseEnter={() => setHoveredPhotoId(video._id)} onMouseLeave={() => setHoveredPhotoId(null)} key={video._id} className=" relative overflow-hidden rounded-lg">
                                    <iframe className="w-full md:h-[350px] rounded-xl" src={video.url}  allowFullScreen ></iframe>
                                    <div className={`absolute bottom-0 w-full bg-black/40 text-white px-4 py-2 transition-transform duration-500 ${hoveredPhotoId === video._id ? 'translate-y-0' : 'translate-y-full'}`}>
                                        <div>{video.title}</div>
                                        <div>{video.description}</div>
                                        <div>سال {video.videoDate}</div>
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
