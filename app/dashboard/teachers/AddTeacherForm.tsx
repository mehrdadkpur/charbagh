"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import ShamsiDatePicker from "../../ui/components/ShamsiDatePicker";
import toast from "react-hot-toast";
import Loading from "../../loading"
import UploadInput from "../../ui/components/UploadInput";

interface ITeacher {
  _id:string;
  firstname:string;
  lastname:string;
  birthDate:string;
  gender:string;
  nationalityNumber:string;
  teacherId:string;
  registryDate:string;
  mobile:string;
  email:string;
  address:string;
  skill:string;
  password?:string;
  status: string;
  role: string;
  mainImg:string;
  teacher_resume:string;
  isAdmin:boolean
}

const AddTeacherForm = () => {
  const [fields, setFields] = useState<ITeacher>({
    _id:'',
    firstname: '',
    lastname: '',
    birthDate:"",
    gender: 'آقا',
    nationalityNumber: '',
    teacherId: '',
    registryDate: "1390",
    mobile: '',
    email: '',
    address: '',
    skill: '',
    password: '',
    status: 'غیرفعال',
    role: 'کاربر',
    mainImg:'/images/avatar.png',
    isAdmin:false,
    teacher_resume:''
});

const [initialDates, setInitialDates] = useState({
  birthDate: new Date(),
  registryDate: new Date()
});

  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('/images/avatar.png');
  const [loading , setLoading] = useState(false);

  const validateForm = () => {
    if (fields.password && fields.password.length < 6) {
      toast.error('رمز عبور باید حداقل 6 کاراکتر باشد')
      return false
  }
      if (!fields.nationalityNumber || fields.nationalityNumber.length !== 10) {
          toast.error('شماره ملی باید 10 رقم باشد');
          return false;
      }
      if (!fields.mobile || fields.mobile.length !== 11) {
           toast.error('شماره موبایل باید 11 رقم باشد');
          return false;
      }
      if (!fields.email.includes('@')) {
           toast.error('لطفا یک ایمیل معتبر وارد کنید');
          return false;
      }
      return true;
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader()
    reader.onloadend = () => {
        setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nationalityNumber", fields.nationalityNumber);
    formData.append("firstname", fields.firstname);
    formData.append("lastname", fields.lastname);

    try {
      const response = await fetch("/api/user/upload-teacher-image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.url) {
        toast.success('آپلود موفقیت آمیز بود');

        setFields((prev) => ({ ...prev, mainImg: data.url }));
      }
    } catch (error) {
      toast.error('آپلود ناموفق');
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
  }
    setLoading(true);

    try {
      const formData = new FormData();
      (Object.keys(fields) as Array<keyof ITeacher>).forEach((key) => {
          formData.append(key, String(fields[key]));
      });

        const response = await fetch("/api/teachers", {
            method: "POST",
            body: formData,
        })

        const data = await response.json()

        if (response.status === 409) {
            setLoading(false);
            toast.error('این کد ملی قبلا ثبت شده است')
            return
        }

        if (response.ok) {
            setLoading(false);
            toast.success('استاد جدید با موفقیت اضافه شد')
            toast.success(`کد استادی: ${data.teacherId}`)
            window.location.href = '/dashboard/teachers'
        }
    } catch (error) {
        setLoading(false);
        toast.error('خطا در ثبت اطلاعات')
    }
}

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldValue = name === "isAdmin" ? value === "true" : value;
    setFields((prevFilds) => ({ ...prevFilds, [name]: fieldValue }));
  };

  const handleBirthDateChange = (gregorianDate:string) => {
    setFields(prev => ({ ...prev, birthDate: gregorianDate }))
}

const handleRegistryDateChange = (gregorianDate:string) => {
    setFields(prev => ({ ...prev, registryDate: gregorianDate }))
}

if (loading) {
  return <Loading/>;
}

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center items-center flex-col gap-y-5 font-Dana text-nowrap" >
        <div className="w-full grid grid-cols-2 gap-y-5 gap-x-10">
          <div className="w-full flex justify-center items-center gap-x-2">
            <label className="w-1/3" htmlFor="firstname">
              نام:
            </label>
            <input
              name="firstname"
              type="text"
              className="w-2/3 h-12 border p-3"
              placeholder="نام"
              required
              value={fields.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex justify-center items-center gap-x-2">
            <label className="w-1/3" htmlFor="lastname">
              {" "}
              نام خانوادگی:
            </label>
            <input
              name="lastname"
              type="text"
              className="w-2/3 h-12 border p-3"
              placeholder="نام خانوادگی"
              required
              value={fields.lastname}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex justify-center items-center gap-x-2 ">
                  <label className="w-1/3 text-gray-700 ">تاریخ تولد:</label>
                  <div className="w-2/3">
                    <ShamsiDatePicker onBirthDateChange={handleBirthDateChange} initialDate={new Date(initialDates.birthDate)}  />
                  </div>
          </div>
          <div className="w-full flex justify-center items-center gap-x-2">
            <label className="w-1/3" htmlFor="gender">
              جنسیت:
            </label>
            <select
              name="gender"
              className="w-2/3 h-12 border p-3"
              required
              value={fields.gender}
              onChange={handleChange}
            >
              <option value="">جنسیت</option>
              <option value="آقا">آقا</option>
              <option value="خانم">خانم</option>
            </select>
          </div>
          <div className="w-full flex justify-center items-center gap-x-2">
            <label className="w-1/3" htmlFor="nationalityNumber">
              شماره ملی:
            </label>
            <input
              name="nationalityNumber"
              type="string"
              className="w-2/3 h-12 border p-3"
              placeholder=" شماره ملی"
              required
              value={fields.nationalityNumber}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex justify-center items-center gap-x-2">
            <label className="w-1/3" htmlFor="teacherId">
              شماره پرسنلی:
            </label>
            <input
              disabled
              name="teacherId"
              type="number"
              className="w-2/3 h-12 border p-3"
              placeholder="شماره پرسنلی"
              value={fields.teacherId}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex justify-center items-center gap-x-2 ">
                  <label className="w-1/3 text-gray-700 ">تاریخ شروع همکاری:</label>
                  <div className="w-2/3">
                    <ShamsiDatePicker onRegistryDateChange={handleRegistryDateChange} initialDate={new Date(initialDates.registryDate)}  />
                  </div>
          </div>
          <div className="w-full flex justify-center items-center gap-x-2">
            <label className="w-1/3" htmlFor="mobile">
              شماره موبایل:
            </label>
            <input
              name="mobile"
              type="text"
              className="w-2/3 h-12 border p-3"
              required
              placeholder="شماره موبایل"
              value={fields.mobile}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex justify-center items-center gap-x-2">
            <label className="w-1/3" htmlFor="email">
              ایمیل:
            </label>
            <input
              type="email"
              name="email"
              className="w-2/3 h-12 border p-3"
              required
              placeholder="آدرس ایمیل"
              value={fields.email}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex justify-center items-center gap-x-2">
            <label className="w-1/3" htmlFor="address">
              آدرس:
            </label>
            <input
              type="text"
              name="address"
              className="w-2/3 h-12 border p-3"
              required
              placeholder="آدرس منزل"
              value={fields.address}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex justify-center items-center gap-x-2">
            <label className="w-1/3" htmlFor="skill">
              حوزه فعالیت:
            </label>
            <select
              name="skill"
              className="w-2/3 h-12 border p-3"
              required
              value={fields.skill}
              onChange={handleChange}
            >
              <option value="">حوزه فعالیت</option>
              <option value="ویلون">ویلون</option>
              <option value="پیانو">پیانو</option>
              <option value="گیتار">گیتار</option>
              <option value="سه تار">سه تار</option>
              <option value="دف">دف</option>
              <option value="نی">نی</option>
              <option value="تار">تار</option>
              <option value="تنبک">تنبک</option>
            </select>
          </div>
          <div className="w-full flex justify-center items-center gap-x-2">
            <label className="w-1/3" htmlFor="password">
              رمز عبور:
            </label>
            <input
              type="text"
              name="password"
              className="w-2/3 h-12 border p-3"
              placeholder="رمز عبور جدید را وارد کنید"
              value={fields.password}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex justify-center items-center gap-x-2">
            <label className="w-1/3" htmlFor="status">
              وضعیت:
            </label>
            <select
              name="status"
              className="w-2/3 h-12 border p-3"
              required
              value={fields.status}
              onChange={handleChange}
            >
              <option value="">وضعیت</option>
              <option value="فعال">فعال</option>
              <option value="غیرفعال">غیرفعال</option>
            </select>
          </div>
          <div className="w-full flex justify-center items-center gap-x-2">
            <label className="w-1/3" htmlFor="isAdmin">
              مدیر:
            </label>
            <select
              name="isAdmin"
              className="w-2/3 h-12 border p-3"
              required
              value={String(fields.isAdmin)}
              onChange={handleChange}
            >
              <option value="">آیا کاربر مدیر است؟</option>
              <option value="true">بله</option>
              <option value="false">خیر</option>
            </select>
          </div>
          <UploadInput uploadedImage={imagePreview} handleImageUpload={handleImageUpload} uploading={uploading} />
        </div>
          <div className="w-full flex justify-center items-center gap-x-2">
            <label className="w-1/6" htmlFor="teacher_resume">
              رزومه:
            </label>
            <textarea
              name="teacher_resume"
              className="w-5/6 h-96 border p-3"
              placeholder="رزومه"
              required
              value={fields.teacher_resume}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/4 flex justify-center items-center flex-col gap-y-3 ">
            <button
              type="submit"
              className="w-full p-3 bg-green-600 rounded-lg text-center text-white"
            >
              ویرایش مشخصات استاد 
            </button>
            <Link
              href={"/dashboard/teachers"}
              className="w-full p-3 bg-red-600 rounded-lg text-center text-white"
            >
              {" "}
              انصراف
            </Link>
          </div>
      </form>
  );
};

export default AddTeacherForm;
