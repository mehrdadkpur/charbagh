"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import YearSelect from "../../../ui/components/YearSelect";

interface IVideo {
  _id: string
  title: string
  url: string
  videoDate: string
  description: string
  category:string;
  tags:string[];
}

const AddVideoForm = () => {
  const router = useRouter();
  const [fields, setFields] = useState <IVideo> ({
    _id: "",
    title: "",
    url: "",
    videoDate: "",
    description: "",
    category: "",
    tags: [],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
}

const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  
  try {
      const response = await fetch("/api/gallery/videos", {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(fields),
      })

      const data = await response.json();
      console.log(data);
      if (data.success) {
          router.push("/dashboard/gallery/videos")
          router.refresh()
      }
  } catch (error) {
      console.error("Form submission failed:", error)
  }
}

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center items-start flex-col gap-y-5">
      <div className="w-full flex justify-center items-center gap-x-2">
        <label className="w-1/3" htmlFor="title">
          نام فیلم:
        </label>
        <input
          name="title"
          type="text"
          className="w-full h-12 border p-3 bg-gray-50 dark:bg-gray-700"
          placeholder="نام فیلم"
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
          ایجاد فیلم
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
};

export default AddVideoForm;
