'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import YearSelect from '@/app/ui/components/YearSelect';
import UploadInput from '@/app/ui/components/UploadInput';

const EditPhotoForm = () => {
    const { id } = useParams();
    const router = useRouter();
    
    const [fields, setFields] = useState({_id: "", title: "", url: "", photoDate: "", description: "", category: "", tags: []});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(fields.url)

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const response = await fetch(`/api/gallery/photos/${id}`);
                const data = await response.json();
                setFields(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Photo:', error);
                setLoading(false);
            }
        };

        if (id) {
            fetchPhoto();
        }
    }, [id]);

    useEffect(() => { 
      setImagePreview(fields.url); 
  }, [fields.url]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields((prevFields) => ({ ...prevFields, [name]: value }));                
    };

    const handlePhotoUpdate = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
          setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", fields.title);
      formData.append("id", fields._id);
      
      if (fields.url) formData.append('previousUrl', fields.url);

      try {
          const response = await fetch("/api/gallery/upload-gallery-photo", {
              method: "POST",
              body: formData,
          });

          const data = await response.json();
          if (data.url) {
              setFields(prev => ({ ...prev, url: data.url }));
          }
      } catch (error) {
          setError('Upload failed. Please try again.');
      } finally {
          setUploading(false);
      }
  };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/gallery/photos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fields),
            });

            if (response.ok) {
                router.push('/dashboard/gallery/photos');
            } else {
                throw new Error('Failed to update Photo');
            }
        } catch (error) {
            console.error('Error updating Photo:', error);
            alert('An error occurred while updating the Photo.');
        }
    };

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
      <form onSubmit={handleSubmit} className="w-full flex justify-center items-start flex-col gap-y-5">
        <div className="w-full flex justify-center items-center gap-x-2">
          <label className="w-1/3" htmlFor="title">
            نام عکس:
          </label>
          <input
            name="title"
            type="text"
            className="w-full h-12 border p-3"
            placeholder="نام عکس"
            required
            value={fields.title}
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex justify-center items-center gap-x-2">
          <label className="w-1/3" htmlFor="description">
            {" "}
            توضیحات:
          </label>
          <input
            name="description"
            type="text"
            className="w-full h-12 border p-3"
            placeholder=" توضیحات"
            required
            value={fields.description}
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex justify-center items-center gap-x-2">
          <label className="w-1/3" htmlFor="photoDate">
            تاریخ عکس:
          </label>
          <select
            name="photoDate"
            className="w-2/3 h-12 border p-3"
            type="text"
            required
            onChange={handleChange}
            value={fields.photoDate}
          >
            <option value="">تاریخ تهیه عکس را انتخاب کنید</option>
            {<YearSelect />}
          </select>
        </div>
        <div className="w-full flex justify-center items-center gap-x-2">
            <label className="w-1/3" htmlFor="category">
              دسته بندی :
            </label>
            <select
              name="category"
              type="text"
              className="w-2/3 h-12 border p-3"
              required
              value={fields.category}
              onChange={handleChange}
            >
              <option value="">دسته بندی</option>
              <option value="کنسرت">کنسرت</option>
              <option value="اجرا">اجرا</option>
              <option value="متفرقه">متفرقه</option>
            </select>
          </div>
        <div className="w-full flex justify-center items-center gap-x-2">
          <label className="w-1/3" htmlFor="tags">
            {" "}
            تگ ها:
          </label>
          <input
            name="tags"
            type="text"
            className="w-full h-12 border p-3"
            placeholder="تگ ها"
            required
            value={fields.tags}
            onChange={handleChange}
          />
        </div>
        <UploadInput uploadedImage={imagePreview} handleImageUpload={handlePhotoUpdate} uploading={uploading} />
        <div className="w-full flex justify-center items-center flex-col gap-y-3">
          <button
            type="submit"
            className="w-full p-3 bg-green-600 rounded-lg text-center text-white hover:bg-green-700 transition-colors"
          >
            ویرایش مشخصات عکس
          </button>
          <Link
            href="/dashboard/gallery/photos"
            className="w-full p-3 bg-red-600 rounded-lg text-center text-white hover:bg-red-700 transition-colors"
          >
            انصراف
          </Link>
        </div>
    </form>
     );
 }
 export default EditPhotoForm;