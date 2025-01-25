"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect, ChangeEvent } from "react"
import { fetchSong } from "@/lib/requests"
import Loading from "@/app/loading"
import Search from "@/app/ui/components/Search"
import AddButton from "@/app/ui/components/AddButton"
import toast from "react-hot-toast"
import Image from "next/image"

interface IBook {
    _id: string
    book_name: string
    songs: string[]
}

interface Instrument {
    _id: string
    instrument_name: string
    books: IBook[]
}

interface QueryState {
    text: string
}

const Books = () => {
    const { id } = useParams()
    const router = useRouter()
    
    const [instrument, setInstrument] = useState<Instrument | null>(null)
    const [books, setBooks] = useState<IBook[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedBookId, setSelectedBookId] = useState<string>("")
    const [query, setQuery] = useState<QueryState>({ text: "" })
    const [filteredBooks, setFilteredBooks] = useState<IBook[]>([])

    useEffect(() => {
        const fetchBookData = async () => {
            if (!id) return
            try {
                const data = await fetchSong(id as string)
                setInstrument(data)
                setBooks(data.books)
                setFilteredBooks(data.books)
            } catch (error) {
                toast.error('خطا در دریافت اطلاعات')
            } finally {
                setLoading(false)
            }
        }
        fetchBookData()
    }, [id])

    const handleOpenModal = (bookId: string) => {
        setIsModalOpen(true)
        setSelectedBookId(bookId)
    }

    const handleDeleteBook = async () => {
        try {
            const res = await fetch(`/api/songs/${id}/books/${selectedBookId}`, {
                method: "DELETE"
            })

            if (res.ok) {
                setBooks(prev => prev.filter(book => book._id !== selectedBookId))
                toast.success('کتاب با موفقیت حذف شد')
                router.refresh()
                setIsModalOpen(false)
            }
        } catch (error) {
            toast.error('خطا در حذف کتاب')
        }
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value.toLowerCase()
        setQuery({ text: e.target.value })
        
        const allBooks = books.filter((book) => {
            return book.book_name.toLowerCase().includes(searchText)
        })
        setFilteredBooks(allBooks)
    }

    if (loading) return <Loading />
    if (!books.length) return <div>{toast.error("هیچ کتابی پیدا نشد")}</div>
      
  
    return ( 
        <section className="w-full flex justify-center pr-[340px] pl-10 mt-3">
            <div className="w-full p-5 flex justify-center bg-white rounded-xl">
                <div className="w-full mt-5 ">                   
                    <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4">کتاب های موسیقی ساز <span className="bg-mango p-2 rounded-xl mx-2">{instrument?.instrument_name}</span></span>
                    <div className="relative w-full overflow-x-auto sm:rounded-lg">
                                                                        {/* Search Box & Add Book Button*/}
                        <div className="w-full flex justify-center items-center gap-x-5 mb-5">
                            <Search query={query} handleSearch={handleSearch} baseSearch={'نام کتاب'}/>
                            <AddButton route={`/dashboard/songs/${id}/add-book `} />  
                        </div>
                                                                        {/* Delete Modal */}
                        <div aria-hidden="true" className={`${!isModalOpen?"hidden":"w-full flex justify-center items-center fixed z-50 bg-black/50 font-DanaDemiBold md:inset-0"}`}>
                            <div className="relative p-4 w-full max-w-md h-screen md:h-auto">
                                <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                                <button onClick={() => setIsModalOpen(false)} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                <p className="mb-4 text-gray-500 dark:text-gray-300">مطمئن هستی می خوای این موسیقی پاک بشه؟</p>
                                <div className=" flex justify-center items-center gap-x-4">
                                    <button onClick={() => setIsModalOpen(false)} data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                        نه ، بی خیال
                                    </button>
                                    <button onClick={handleDeleteBook} type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                                        آره بابا پاکش کن
                                    </button>
                                </div>
                            </div>
                        </div>
                        </div>
                                                                         {/* table */}
                            {
                            books.length === 0 ? (
                            <div className="w-full h-96 flex justify-center items-center text-xl font-DanaDemiBold">
                                <p>هنوز هیچ کتابی اضافه نکردی. برای اضافه کردن اولین ساز از دکمه + بالا استفاده کن.</p>
                            </div>):   
                        <table className="w-full text-sm text-left font-DanaMedium rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">نام کتاب  </th>
                                    <th scope="col" className="px-6 py-3">تعداد  موسیقی</th>
                                    <th scope="col" className="flex justify-center items-center py-3">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBooks?.map((book) => (
                                <tr key={book._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 flex-shrink-0">
                                            <Image width={40} height={40} className="rounded-full" src='/images/songs/book.png' alt='book'/>
                                        </div>
                                        <div className="mr-3">
                                        <div className="text-base font-semibold">
                                            {book.book_name}
                                        </div>
                                        </div>
                                    </div>
                                    </td>            
                                    <td className="px-6 py-4">{book.songs.length}</td>
                                    <td className="flex justify-center items-center py-4">
                                    <div className="flex items-center gap-2">
                                        <Link href={`/dashboard/songs/${id}/books/${book._id}`} className="bg-green-700 px-3 py-1.5 rounded-lg text-white hover:bg-green-800 transition-colors">مشاهده کتاب </Link>
                                        <Link href={`/dashboard/songs/${id}/books/${book._id}/edit-book`} className="bg-orange-700 px-3 py-1.5 rounded-lg text-white hover:bg-orange-800 transition-colors"> ویرایش </Link>
                                        <button onClick={() => handleOpenModal(book._id)} className="bg-red-700 px-3 py-1.5 rounded-lg text-white hover:bg-red-800 transition-colors"> حذف </button>
                                    </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
}
                    </div>
                    <div className="w-full mt-5 flex justify-center items-center font-DanaDemiBold">
                        <Link href="/dashboard/songs" className="w-1/6 flex justify-center items-center bg-red-700 px-3 py-1.5 rounded-lg text-white hover:bg-red-800 transition-colors">بازگشت</Link>
                    </div>
                </div>
            </div>
        </section>
     );
}
 
export default Books;