'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchTeachersName } from "../../../lib/teachersName";
import UploadInput from "@/app/ui/components/UploadInput";
import toast from "react-hot-toast";

const AddInstrumentForm = () => {
    
    const initialFields = {
        instrument_name: "",
        instrument_type: "",
        instrument_teachers: [],
        instrument_description: "",
        instrument_origin: "",
        instrument_img: ""
    };

    const [teachers, setTeachers] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState('/images/avatar.png');
    const [fields, setFields] = useState(initialFields);

    useEffect(() => {
        const getTeachers = async () => {
            const fetchedTeachers = await fetchTeachersName();
            setTeachers(fetchedTeachers);
        };
        getTeachers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        Object.keys(fields).forEach(key => {
            const value = key === 'instrument_teachers' 
                ? fields[key].join(',') 
                : fields[key];
            formData.append(key, value);
        });

        try {
            const response = await fetch('/api/instruments', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                toast.success('ساز با موفقیت اضافه شد');
                window.location.href = '/dashboard/instruments';
            }
        } catch (error) {
            toast.error('خطا در ثبت ساز');
            console.error('Error adding Instruments:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFields(prev => ({
            ...prev,
            instrument_teachers: checked 
                ? [...prev.instrument_teachers, name]
                : prev.instrument_teachers.filter(teacher => teacher !== name)
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('instrumentName', fields.instrument_name);
        formData.append('instrument_img', fields.instrument_img);

        try {
            const response = await fetch('/api/instruments/upload-instrument-image', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.url) {
                setFields(prev => ({ ...prev, instrument_img: data.url }));
                toast.success('تصویر با موفقیت آپلود شد');
            }
        } catch (error) {
            toast.error('خطا در آپلود تصویر');
        } finally {
            setUploading(false);
        }
    };

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
            <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="instrument_type">نوع ساز:</label>
                <input
                    name="instrument_type"
                    type="text"
                    className="w-full h-12 border p-3"
                    placeholder="نوع ساز"
                    required
                    value={fields.instrument_type}
                    onChange={handleChange}
                />
            </div>
            <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="instrument_origin">مبدا ساز:</label>
                <input
                    name="instrument_origin"
                    type="text"
                    className="w-full h-12 border p-3"
                    placeholder="مبدا ساز"
                    required
                    value={fields.instrument_origin}
                    onChange={handleChange}
                />
            </div>
            <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="instrument_description">توضیحات ساز:</label>
                <textarea
                    name="instrument_description"
                    rows={10}
                    cols={50}
                    type="text"
                    className="w-full border p-3"
                    placeholder="توضیحات ساز"
                    required
                    value={fields.instrument_description}
                    onChange={handleChange}
                />
            </div>
            <UploadInput uploadedImage={imagePreview} handleImageUpload={handleImageUpload} uploading={uploading} />
            <div className=" w-full h-40 flex flex-col font-DanaMedium gap-y-3 border p-3 overflow-y-auto">
                <span>انتخاب استاد</span>
                {
                teachers.map((teacher)=>(
                    <div key={teacher._id} className="w-full">
                        <div className="w-full flex gap-x-3 items-center"> 
                            <input onChange={handleCheckboxChange} type="checkbox" id={`teacher-${teacher._id}`} name={`${teacher.firstname} ${teacher.lastname}`} value={fields.instrument_teachers} /> 
                            <label htmlFor={`teacher-${teacher._id}`} className="">{teacher.firstname}{' '}{teacher.lastname}</label> 
                        </div>
                    </div> 
                ))
                }
            </div>
            <div className="w-full flex justify-center items-center flex-col gap-y-3 ">
                <button type="submit" className="w-full p-3 bg-green-600 rounded-lg text-center text-white"> ثبت ساز</button>
                <Link href={"/dashboard/instruments"}    className="w-full p-3 bg-red-600 rounded-lg text-center text-white" >  انصراف</Link>
            </div>
        </form>
    );
}

export default AddInstrumentForm;
