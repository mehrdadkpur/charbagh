"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState, ChangeEvent } from "react"
import { fetchSongs } from "@/lib/requests"
import Search from "@/app/ui/components/Search"
import Image from "next/image"
import DeleteModal from "@/app/ui/components/DeleteModal"

interface Instrument {
    _id: string
    instrument_name: string
    instrument_img: string
    books: any[]
}

interface QueryState {
    text: string
}

const Instruments = () => {
    const router = useRouter()
    const [instruments, setInstruments] = useState<Instrument[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedInstrumentId, setSelectedInstrumentId] = useState<string | null>(null)
    const [query, setQuery] = useState<QueryState>({ text: "" })
    const [filteredInstruments, setFilteredInstruments] = useState<Instrument[]>([])

    useEffect(() => {
        const fetchInstruments = async () => {
            const data = await fetchSongs()
            setInstruments(data.songs)
            setFilteredInstruments(data.songs)
        }
        fetchInstruments()
    }, [])

    const handleOpenModal = (songId: string) => {
        setIsModalOpen(true)
        setSelectedInstrumentId(songId)
    }

    const handleDeleteSong = async () => {
        if (!selectedInstrumentId) return

        try {
            const res = await fetch(`/api/songs/${selectedInstrumentId}`, {
                method: "DELETE"
            })

            if (res.ok) {
                setInstruments(prev => 
                    prev.filter(instrument => instrument._id !== selectedInstrumentId)
                )
                router.refresh()
                setIsModalOpen(false)
            }
        } catch (error) {
            console.error("Error deleting instrument:", error)
        }
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value.toLowerCase()
        setQuery({ text: e.target.value })
        
        const allInstruments = instruments.filter((instrument) => {
            return instrument.instrument_name.toLowerCase().includes(searchText)
        })
        setFilteredInstruments(allInstruments)
    }
  
    return ( 
        <section className="w-full flex justify-center pr-[340px] pl-10 mt-3 bg-gray-50 dark:bg-gray-900 ">
            <div className="w-full p-5 flex justify-center rounded-xl ">
                <div className="w-full mt-5">                   
                    <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4">موسیقی های آموزشی</span>
                    <div className="relative w-full h-auto flex flex-col justify-center items-center sm:rounded-lg">
                                                                        {/* Search Box & Add Song Button*/}
                        <div className="w-full flex justify-center items-center gap-x-5 mb-5">
                            <Search query={query} handleSearch={handleSearch} baseSearch={"نام ساز"}/>
                            <div className="flex justify-center items-center p-3 bg-blue-500 rounded-xl ">
                                <Link href="/dashboard/songs/add-instrument"  >
                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </Link>
                            </div>  
                        </div>
                                                                        {/* Delete Modal */}
                        <DeleteModal onDelete={handleDeleteSong} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

                                                                         {/* table */}   
                        {
                            instruments.length === 0 ? (
                            <div className="w-full h-96 flex justify-center items-center text-xl font-DanaDemiBold">
                                <p>هنوز هیچ سازی اضافه نکردی. برای اضافه کردن اولین ساز از دکمه + بالا استفاده کن.</p>
                            </div>):
                        
                        <table className="w-full text-sm text-left font-DanaMedium rtl:text-right">
                            <thead className="text-xs">
                                <tr>
                                    <th scope="col" className="px-6 py-3">نام ساز  </th>
                                    <th scope="col" className="px-6 py-3">تعداد کتاب ها</th>
                                    <th scope="col" className="flex justify-center items-center py-3">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredInstruments.map((instrument) => (
                                <tr key={instrument._id} className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 flex-shrink-0">
                                                <Image width={40} height={40} className="w-full h-full rounded-full object-cover" src={instrument.instrument_img} alt={instrument.instrument_name}/>
                                            </div>
                                            <div className="mr-3">
                                            <div className="text-base font-semibold">
                                                {instrument.instrument_name}
                                            </div>
                                            </div>
                                        </div>
                                    </td>            
                                    <td className="px-6 py-4">{instrument.books.length}</td>
                                    <td className="flex justify-center items-center py-4">
                                        <div className="flex items-center gap-2">
                                            <Link 
                                            href={`/dashboard/songs/${instrument._id}`}
                                            className="bg-green-700 px-3 py-1.5 rounded-lg text-gray-50 hover:bg-green-800 transition-colors"
                                            >
                                            مشاهده ساز
                                            </Link>
                                            <Link 
                                            href={`/dashboard/songs/${instrument._id}/edit`}
                                            className="bg-orange-700 px-3 py-1.5 rounded-lg text-gray-50 hover:bg-orange-800 transition-colors"
                                            >
                                            ویرایش
                                            </Link>
                                            <button 
                                            onClick={() => handleOpenModal(instrument._id)}
                                            className="bg-red-700 px-3 py-1.5 rounded-lg text-gray-50 hover:bg-red-800 transition-colors"
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
 
export default Instruments;

