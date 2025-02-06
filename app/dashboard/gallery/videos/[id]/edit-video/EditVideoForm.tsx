'use client';

import Link from 'next/link';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import YearSelect from '@/app/ui/components/YearSelect';

interface IVideo {
  _id: string;
  title: string;
  url: string;
  videoDate: string;
  description: string;
  category:string;
  tags:string[];
}

const EditVideoForm = () => {
    const { id } = useParams();
    const router = useRouter();
    
    const [fields, setFields] = useState<IVideo>({_id: "",title: "",url: "",videoDate: "",description: "",category: "",tags: [],});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const response = await fetch(`/api/gallery/videos/${id}`);
                const data = await response.json();
                console.log(response);

                setFields(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Video:', error);
                setError('Failed to fetch Video data');
                setLoading(false);
            }
        };

        if (id) {
            fetchPhoto();
        }
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFields((prevFields) => ({ ...prevFields, [name]: value }));                
    };
    

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/gallery/videos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fields),
            });

            if (response.ok) {
                router.push('/dashboard/gallery/videos');
            } else {
                throw new Error('Failed to update Videos');
            }
        } catch (error) {
            console.error('Error updating Videos:', error);
            alert('An error occurred while updating the Videos.');
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
              className="w-full h-12 border p-3 bg-gray-50 dark:bg-gray-700"
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
              className="w-full h-12 border p-3 bg-gray-50 dark:bg-gray-700"
              placeholder=" توضیحات"
              required
              value={fields.description}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex justify-center items-center gap-x-2">
            <label className="w-1/3" htmlFor="url">
              {" "}
              آدرس فیلم:
            </label>
            <input
              name="url"
              type="text"
              className="w-full h-12 border p-3 bg-gray-50 dark:bg-gray-700"
              placeholder=" آدرس فیلم"
              required
              value={fields.url}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex justify-center items-center gap-x-2">
            <label className="w-1/3" htmlFor="videoDate">
              تاریخ فیلم:
            </label>
            <select
              name="videoDate"
              className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
              required
              onChange={handleChange}
              value={fields.videoDate}
            >
              <option value="">تاریخ تهیه فیلم را انتخاب کنید</option>
              {<YearSelect />}
            </select>
          </div>
          <div className="w-full flex justify-center items-center gap-x-2">
              <label className="w-1/3" htmlFor="category">
                دسته بندی :
              </label>
              <select
                name="category"
                className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
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
              className="w-full h-12 border p-3 bg-gray-50 dark:bg-gray-700"
              placeholder="تگ ها"
              required
              value={fields.tags}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex justify-center items-center flex-col gap-y-3">
            <button
              type="submit"
              className="w-full p-3 bg-green-600 rounded-lg text-center text-white hover:bg-green-700 transition-colors"
            >
              ویرایش مشخصات فیلم
            </button>
            <Link
              href="/dashboard/gallery/videos"
              className="w-full p-3 bg-red-600 rounded-lg text-center text-white hover:bg-red-700 transition-colors"
            >
              انصراف
            </Link>
          </div>
    </form>
     );
 }
 export default EditVideoForm;