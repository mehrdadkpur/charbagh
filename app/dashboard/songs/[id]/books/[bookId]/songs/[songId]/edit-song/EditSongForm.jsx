'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import toast from 'react-hot-toast';

const EditSongForm = () => {
    const { id, bookId, songId } = useParams();
    const router = useRouter();
    
    const [fields, setFields] = useState({
        song_title: "",
        song_artist: "",
        song_url: "",
        song_img: "",
        length: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchSong = async () => {
            const response = await fetch(`/api/songs/${id}`)
            const data = await response.json()
            
            
            const book = data.books.find(book => book._id === bookId)
            const song = book.songs.find(song => song._id === songId)
            
            setFields({
                song_title: song.song_title,
                song_artist: song.song_artist,
                song_url: song.song_url,
                length: song.length
            })
            setLoading(false)
        }
    
        fetchSong()
    }, [id, bookId, songId]
)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields((prevFields) => ({ ...prevFields, [name]: value }));
    };

    const handleSongUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('songTitle', fields.song_title);
        formData.append('songArtist', fields.song_artist);
        formData.append('previousUrl', fields.song_url); // Add previous URL to formData
        
        try {
            const response = await fetch('/api/songs/upload-song', {
                method: 'POST',
                body: formData
            });
    
            const data = await response.json();
            if (data.url) {
                setFields(prev => ({ ...prev, song_url: data.url }));
                toast.success('آپلود موفقیت آمیز')
            }
        } catch (error) {
            console.error('Upload failed:', error);
            toast.error('خطا در آپلود فایل')
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/songs/${id}/books/${bookId}/songs/${songId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fields),
            });

            if (response.ok) {
                router.push(`/dashboard/songs/${id}/books/${bookId}`);
                router.refresh();
            } else {
                throw new Error('Failed to update Song');
            }
        } catch (error) {
            console.error('Error updating Song:', error);
            setError('An error occurred while updating the Song.');
        }
    };

    if (loading) return <Loading />;
    if (error) return <p>{error}</p>;

    return (
        <form onSubmit={handleSubmit} className="w-full flex justify-center items-start flex-col gap-y-5">
            <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="song_title">نام موسیقی:</label>
                <input
                    name="song_title"
                    type="text"
                    className="w-full h-12 border p-3"
                    placeholder="نام موسیقی"
                    required
                    value={fields.song_title}
                    onChange={handleChange}
                />
            </div>
            <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="song_artist"> نوازنده:</label>
                <input
                    name="song_artist"
                    type="text"
                    className="w-full h-12 border p-3"
                    placeholder="نوازنده"
                    required
                    value={fields.song_artist}
                    onChange={handleChange}
                />
            </div>
            <div className="w-full flex justify-center items-center gap-x-2">
                <label className="">آپلود موسیقی:</label>
                <input
                    type="file"
                    accept="audio/mp3"
                    onChange={handleSongUpload}
                    className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100"
                />
                {uploading && <span className="absolute right-0 top-0">در حال آپلود...</span>}
            </div>
            <div className="w-full flex justify-center items-center flex-col gap-y-3">
                <button
                    type="submit"
                    className="w-full p-3 bg-green-600 rounded-lg text-center text-white hover:bg-green-700 transition-colors"
                >
                    ویرایش موسیقی
                </button>
                <Link
                    href={`/dashboard/songs/${id}/books/${bookId}`}
                    className="w-full p-3 bg-red-600 rounded-lg text-center text-white hover:bg-red-700 transition-colors"
                >
                    انصراف
                </Link>
            </div>
        </form>
    );
};

export default EditSongForm;
