'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import toast from 'react-hot-toast';

const EditBookForm = () => {
    const { id, bookId } = useParams();
    const router = useRouter();

    const [fields, setFields] = useState({
        book_name: "",
        songs: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`/api/songs/${id}`);
                const data = await response.json();
                const book = data.books.find(book => book._id === bookId);
                
                if (book) {
                    setFields({
                        book_name: book.book_name,
                        songs: book.songs
                    });
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Book:', error);
                toast.error('خطا در دریافت اطلاعات');
                setLoading(false);
            }
        };

        if (id && bookId) {
            fetchBook();
        }
    }, [id, bookId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields((prevFields) => ({ ...prevFields, [name]: value }));                
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/songs/${id}/books/${bookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fields),
            });

            if (response.ok) {
                toast.success('ویرایش کتاب موفقیت آمیز بود')
                router.push(`/dashboard/songs/${id}`);
                router.refresh();
            } else {
                throw new Error('Failed to update Book');
            }
        } catch (error) {
            toast.error('خطا در ویرایش کتاب')
            console.error('Error updating Book:', error);
        }
    };

    if (loading) return <Loading/>;

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
                value={fields.book_name || ""}
                onChange={handleChange}
                />
            </div>
            <div className="w-full flex justify-center items-center flex-col gap-y-3">
                <button
                type="submit"
                className="w-full p-3 bg-green-600 rounded-lg text-center text-white hover:bg-green-700 transition-colors"
                >
                ویرایش کتاب
                </button>
                <Link
                href={`/dashboard/songs/${id}`}
                className="w-full p-3 bg-red-600 rounded-lg text-center text-white hover:bg-red-700 transition-colors"
                >
                انصراف
                </Link>
            </div>
        </form>
  ); 
 }
 export default EditBookForm;