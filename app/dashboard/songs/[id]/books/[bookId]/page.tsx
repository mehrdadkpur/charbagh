"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useState, useEffect, ChangeEvent } from "react"
import { fetchSong } from "@/lib/requests"
import Loading from "@/app/loading"
import AudioPlayer from "@/app/ui/components/AudioPlayer"
import Search from "@/app/ui/components/Search"
import AddButton from "@/app/ui/components/AddButton"
import toast from "react-hot-toast"
import Image from "next/image"
import DeleteModal from "@/app/ui/components/DeleteModal"

interface Song {
    _id: string
    song_title: string
    song_artist: string
    song_url: string
}

interface Book {
    _id: string
    book_name: string
    songs: Song[]
}

interface Instrument {
    _id: string
    instrument_name: string
    books: Book[]
    currentBook?: Book
}

interface QueryState {
    text: string
}

const Songs = () => {
    const { id, bookId } = useParams()
    const [instrument, setInstrument] = useState<Instrument | null>(null)
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedSongId, setSelectedSongId] = useState<string | null>(null)
    const [query, setQuery] = useState<QueryState>({ text: "" })
    const [filteredSongs, setFilteredSongs] = useState<Song[]>([])

    useEffect(() => {
        const fetchSongData = async () => {
            if (!id || !bookId) return

            try {
                const data = await fetchSong(id as string)
                const currentBook = data.books.find((book: Book) => book._id === bookId)
                setInstrument({ ...data, currentBook })
                setFilteredSongs(currentBook.songs)
            } catch (error) {
                toast.error('خطا در دریافت اطلاعات')
            } finally {
                setLoading(false)
            }
        }

        fetchSongData()
    }, [id, bookId])

    const handleOpenModal = (songId: string) => {
        setIsModalOpen(true)
        setSelectedSongId(songId)
    }

    const handleDeleteSong = async () => {
        if (!selectedSongId || !instrument?.currentBook) return

        try {
            const res = await fetch(`/api/songs/${id}/books/${bookId}/songs/${selectedSongId}`, {
                method: "DELETE"
            })

            if (res.ok) {
                const updatedSongs = instrument.currentBook.songs.filter(
                    song => song._id !== selectedSongId
                )
                setInstrument(prev => prev ? {
                    ...prev,
                    currentBook: { ...prev.currentBook!, songs: updatedSongs }
                } : null)
                toast.success('با موفقیت حذف شد')
                setIsModalOpen(false)
                window.location.reload()
            }
        } catch (error) {
            toast.error('خطا در حذف موسیقی')
        }
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value.toLowerCase()
        setQuery({ text: e.target.value })
        
        if (!instrument?.currentBook) return

        const allSongs = instrument.currentBook.songs.filter((song) => {
            const songNameMatch = song.song_title.toLowerCase().includes(searchText)
            const songArtistNameMatch = song.song_artist.toLowerCase().includes(searchText)
            return songNameMatch || songArtistNameMatch
        })
        setFilteredSongs(allSongs)
    }

    if (loading) return <Loading />
    if (!instrument?.currentBook) return <div>Book not found</div>

    return ( 
        <section className="w-full flex justify-center pr-[340px] pl-10 mt-3">
            <div className="w-full p-5 flex justify-center rounded-xl">
                <div className="w-full mt-5 ">                   
                    <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4">  موسیقی های کتاب {instrument.currentBook.book_name} {""}  ساز  {instrument.instrument_name}</span>
                    <div className="relative w-full overflow-x-auto sm:rounded-lg">
                                                                        {/* Search Box & Add Song Button*/}
                        <div className="w-full flex justify-center items-center gap-x-5 mb-5">
                            <Search query={query} handleSearch={handleSearch} baseSearch={'نام موسیقی یا نوازنده'}/>
                            <AddButton route={`/dashboard/songs/${id}/books/${bookId}/add-song `} />  
                        </div>
                                                                        {/* Delete Modal */}
                        <DeleteModal onDelete={handleDeleteSong} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

                                                                         {/* table */}
                            {
                            instrument.currentBook.songs.length === 0 ? (
                            <div className="w-full h-96 flex justify-center items-center text-xl font-DanaDemiBold">
                                <p>هنوز هیچ موسیقی اضافه نکردی. برای اضافه کردن اولین ساز از دکمه + بالا استفاده کن.</p>
                            </div>):   
                        <table className="w-full text-sm font-DanaMedium ">
                            <thead className="text-xs">
                                <tr>
                                    <th scope="col" className="px-6 py-3">نام موسیقی  </th>
                                    <th scope="col" className="px-6 py-3">  نوازنده</th>
                                    <th scope="col" className="px-6 py-3">  پخش موسیقی</th>
                                    <th scope="col" className="flex justify-center items-center py-3">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSongs.map((song) => (
                                <tr key={song._id} className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 flex-shrink-0">
                                                <Image width={40} height={40} className="rounded-full" src="/images/songs/cover.png" alt='song'/>
                                            </div>
                                            <div className="mr-3">
                                            <div className="text-base font-semibold">
                                                {song.song_title}
                                            </div>
                                            </div>
                                        </div>
                                    </td>            
                                    <td className="px-6 py-4">{song.song_artist}</td>
                                    <td className="px-6 py-4">
                                        <AudioPlayer songUrl={song.song_url} />
                                    </td>
                                    <td className="flex justify-center items-center py-4">
                                        <div className="flex items-center gap-2">
                                            <Link href={`/dashboard/songs/${id}/books/${bookId}/songs/${song._id}/edit-song`} className="bg-orange-700 px-3 py-1.5 rounded-lg text-white hover:bg-orange-800 transition-colors"> ویرایش </Link>
                                            <button onClick={() => handleOpenModal(song._id)} className="bg-red-700 px-3 py-1.5 rounded-lg text-white hover:bg-red-800 transition-colors"> حذف </button>
                                        </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                            }
                    </div>
                    <div className="w-full mt-5 flex justify-center items-center font-DanaDemiBold">
                        <Link href={`/dashboard/songs/${id}`} className="w-1/6 flex justify-center items-center bg-red-700 px-3 py-1.5 rounded-lg text-white hover:bg-red-800 transition-colors">بازگشت</Link>
                    </div>
                </div>
            </div>
        </section>
     );
}
 
export default Songs;