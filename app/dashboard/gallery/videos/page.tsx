"use client"

import AddButton from "@/app/ui/components/AddButton";
import DeleteModal from "@/app/ui/components/DeleteModal";
import Search from "@/app/ui/components/Search";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

interface IVideo {
    _id: string
    title: string
    url: string
    videoDate: string
    description: string
}


const Videos = () => {

    const router = useRouter();
    const [videos, setVideos] = useState<IVideo[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
    const [query,setQuery]=useState({text:""});
    const [filteredVideos , setFilteredVideos]=useState <IVideo[]>([]);

    useEffect(() => {
        const fetchVideosData = async () => {
            const response = await fetch("/api/gallery/videos");
            const data = await response.json();
            setVideos(data.videos || []); 
            setFilteredVideos(data.videos);
        }
        fetchVideosData();
    }, [])

  const handleOpenModal=(videoId:string)=>{
    setIsModalOpen(true);
    setSelectedVideoId(videoId)
  }

  const handleDeleteVideo = async () => {
        setIsModalOpen(true)
    try {
      const res = await fetch(`/api/gallery/videos/${selectedVideoId}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setVideos(videos.filter((video) => video._id !== selectedVideoId));
        router.refresh();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error deleting Video:", error);
    }
  };

  const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setQuery({...query , text:e.target.value});
    const allVideos = videos.filter((video)=>{
        return video.title.toLowerCase().includes(e.target.value.toLowerCase());
    })
    setFilteredVideos(allVideos);
  }
  
    return ( 
        <section className="w-full flex justify-center pr-[340px] pl-10 mt-3 bg-gray-50 dark:bg-gray-900 font-DanaMedium">
            <div className="w-full p-5 flex justify-center rounded-xl ">
                <div className="w-full mt-5">                   
                    <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4">فیلم های گالری</span>
                    <div className="relative w-full h-auto flex flex-col justify-center items-center sm:rounded-lg">
                                                                        {/* Search Box & Add Song Button*/}
                        <div className="w-full flex justify-center items-center gap-x-5 mb-5">
                            <Search query={query} handleSearch={handleSearch} baseSearch={"نام ویدیو"}/>
                            <AddButton route={"/dashboard/gallery/videos/add-video"}/>  
                        </div>
                                                                        {/* Delete Modal */}
                        <DeleteModal onDelete={handleDeleteVideo} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

                                                                         {/* table */}   
                        {
                            videos.length === 0 ? (
                            <div className="w-full h-96 flex justify-center items-center text-xl font-DanaDemiBold">
                                <p>هنوز هیچ فیلمی اضافه نکردی. برای اضافه کردن اولین فیلم از دکمه + بالا استفاده کن.</p>
                            </div>):
                        
                        <table className="w-full text-sm">
                            <thead className="text-xs">
                                <tr>
                                    <th scope="col" className="px-6 py-3">نام فیلم  </th>
                                    <th scope="col" className="px-6 py-3">تاریخ تهیه فیلم  </th>
                                    <th scope="col" className="px-6 py-3">توضیح</th>
                                    <th scope="col" className="flex justify-center items-center py-3">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredVideos.map((video) => (
                                <tr key={video._id} className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="text-base font-semibold"> {video.title} </div>                                       
                                    </div>
                                    </td>            
                                    <td className="px-6 py-4">{video.videoDate}</td>
                                    <td className="px-6 py-4">{video.description}</td>
                                    <td className="flex justify-center items-center py-4">
                                    <div className="flex items-center gap-2">
                                        <Link 
                                        href={`/dashboard/gallery/videos/${video._id}`}
                                        className="bg-green-700 px-3 py-1.5 rounded-lg text-white hover:bg-green-800 transition-colors"
                                        >
                                        مشاهده مشخصات فیلم
                                        </Link>
                                        <Link 
                                        href={`/dashboard/gallery/videos/${video._id}/edit-video`}
                                        className="bg-orange-700 px-3 py-1.5 rounded-lg text-white hover:bg-orange-800 transition-colors"
                                        >
                                        ویرایش
                                        </Link>
                                        <button 
                                        onClick={() => handleOpenModal(video._id)}
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
 
export default Videos;

