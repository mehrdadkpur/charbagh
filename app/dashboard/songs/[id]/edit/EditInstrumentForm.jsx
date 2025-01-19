'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import toast from 'react-hot-toast';
import UploadInput from '@/app/ui/components/UploadInput';

const EditInstrumentForm = () => {
    const { id } = useParams();
    const router = useRouter();

    const [fields, setFields] = useState({ _id: "", instrument_name: "", instrument_img: "", books:[] })
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(fields.instrument_img);

    useEffect(() => {
        const fetchInstrument = async () => {
            try {
                const response = await fetch(`/api/songs/${id}`);
                const data = await response.json();
                setFields(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Song:', error);
                setError('Failed to fetch Song data');
                setLoading(false);
            }
        };

        if (id) {
            fetchInstrument();
        }
    }, [id]);

    useEffect(() => { 
        setImagePreview(fields.instrument_img); 
    }, [fields.instrument_img]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields((prevFields) => ({ ...prevFields, [name]: value }));                
    };

    const handleImageUpdate = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return;

         // Preview image
         const reader = new FileReader()
         reader.onloadend = () => {
             setImagePreview(reader.result)
         }
         reader.readAsDataURL(file)
        
        setUploading(true)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('instrumentName', fields.instrument_name)
        
            // Only append previousUrl if it exists and is not empty
        if (fields.instrument_img) {
            formData.append('previousUrl', fields.instrument_img);
        }
        try {
            const response = await fetch('/api/songs/upload-instrument-image', {
                method: 'POST',
                body: formData
            })

            const data = await response.json()
            if (data.url) {
                setFields(prev => ({...prev, instrument_img: data.url}));
                toast.success('آپلود موفقیت آمیز بود')
            }
        } catch (error) {
            toast.error('خطا در آپلود فایل')
            console.error('Upload failed:', error)
        } finally {
            setUploading(false)
        }
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/songs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fields),
            });

            if (response.ok) {
                router.push('/dashboard/songs');
            } else {
                throw new Error('Failed to update Instrument');
            }
        } catch (error) {
            console.error('Error updating Instrument:', error);
            alert('An error occurred while updating the Instrument.');
        }
    };

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <p>{toast.error('خطا در ویرایش ساز')}</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="w-full flex justify-center items-start flex-col gap-y-5">
            <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="instrument_name">نام ساز:</label>
                <input
                    name="instrument_name"
                    type="text"
                    className="w-full h-12 border p-3"
                    placeholder="نام ساز"
                    required
                    value={fields.instrument_name}
                    onChange={handleChange}
                />
            </div>
            <UploadInput uploadedImage={imagePreview} handleImageUpload={handleImageUpdate} uploading={uploading} /> 
            <div className="w-full flex justify-center items-center flex-col gap-y-3">
                <button 
                    type="submit" 
                    className="w-full p-3 bg-green-600 rounded-lg text-center text-white hover:bg-green-700 transition-colors"
                >
                    ویرایش ساز
                </button>
                <Link 
                    href="/dashboard/songs" 
                    className="w-full p-3 bg-red-600 rounded-lg text-center text-white hover:bg-red-700 transition-colors"
                >
                    انصراف
                </Link>
            </div>
        </form> 
     );
 }
 export default EditInstrumentForm;