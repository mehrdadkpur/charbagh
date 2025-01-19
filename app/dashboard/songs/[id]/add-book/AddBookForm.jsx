"use client"

import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation';

const AddBookForm = ({ id }) => {
  const router = useRouter();
  const [fields, setFields] = useState({
    book_name: "",
    songs: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(fields).forEach((key) => {
      formData.append(key, fields[key]);
    });

    const response = await fetch(`/api/songs/${id}/books`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      router.push(`/dashboard/songs/${id}`);
      router.refresh();
    }
  };

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
          value={fields.book_name}
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex justify-center items-center flex-col gap-y-3">
        <button
          type="submit"
          className="w-full p-3 bg-green-600 rounded-lg text-center text-white hover:bg-green-700 transition-colors"
        >
          ایجاد کتاب
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
};

export default AddBookForm;
