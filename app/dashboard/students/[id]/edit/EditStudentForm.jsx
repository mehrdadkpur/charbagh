
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Loading from '@/app/loading';
import ShamsiDatePicker from '@/app/ui/components/ShamsiDatePicker';
import toast from 'react-hot-toast';

const EditStudentForm = () => {
    const { id } = useParams();

    const [fields, setFields] = useState({
        firstname: '',
        lastname: '',
        birthDate:"",
        gender: 'آقا',
        nationalityNumber: '',
        studentId: '',
        mobile: '',
        email: '',
        address: '',
        course: '',
        password: '',
        status: '',
        image:'/images/avatar.png'
    });
    const [initialDates, setInitialDates] = useState({
        birthDate: ''
        
    })

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await fetch(`/api/students/${id}`);
                const data = await response.json();
                const {password , ...studentData}= data
                setFields({...studentData , password:""});
                setInitialDates({birthDate:data.birthDate});
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Student:', error);
                setError('Failed to fetch Student data');
                setLoading(false);
            }
        };

        if (id) {
            fetchStudent();
        }
    }, [id]);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields((prevFields) => ({ ...prevFields, [name]: value }));                
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
        const updateData = { ...fields }
        if (!updateData.password) {
            delete updateData.password
        }
    
        try {
            const response = await fetch(`/api/students/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            })
        
            if (response.status === 409) {
                toast.error('این کد ملی قبلا ثبت شده است')
                return
            }
    
            if (response.ok) {
                toast.success('مشخصات هنرجو با موفقیت ویرایش شد')
                window.location.href = '/dashboard/students'
                return
            }
    
            toast.error('خطا در ویرایش اطلاعات')
        } catch (error) {
            console.error('Error:', error)
            toast.error('خطا در ویرایش اطلاعات')
        }
    }

    const handleBirthDateChange = (gregorianDate) => {
        setFields(prev => ({ ...prev, birthDate: gregorianDate }))
    }

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="w-full flex justify-center items-center flex-col gap-y-5 font-Dana text-nowrap">
            <div className="w-full grid grid-cols-2 gap-y-5 gap-x-10">
                <div className="w-full flex justify-center items-center gap-x-2">
                    <label className="w-1/3" htmlFor="firstname">نام:</label>
                    <input
                        name="firstname"
                        type="text"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        placeholder="نام"
                        required
                        value={fields.firstname}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="lastname"> نام خانوادگی:</label>
                    <input
                        name="lastname"
                        type="text"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        placeholder="نام خانوادگی"
                        required
                        value={fields.lastname}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full flex justify-center items-center gap-x-2 ">
                <label className="w-1/3">تاریخ تولد:</label>
                <div className="w-2/3">
                  <ShamsiDatePicker onBirthDateChange={handleBirthDateChange} initialDate={initialDates.birthDate} />
                </div>
                </div>
                <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="gender">جنسیت:</label>
                    <select
                        name="gender"
                        type="text"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
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
                <label className="w-1/3" htmlFor="nationalityNumber">شماره ملی:</label>
                    <input
                        name="nationalityNumber"
                        type="string"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        placeholder=" شماره ملی"
                        required
                        value={fields.nationalityNumber}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="studentId">شماره هنرآموزی:</label>
                    <input
                        name="studentId"
                        type="number"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        placeholder="شماره هنرآموزی"
                        value={fields.studentId || ""}
                        onChange={handleChange}
                        disabled
                    />
                </div>
                <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="mobile">شماره موبایل:</label>
                    <input
                        name="mobile"
                        type="text"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        required
                        placeholder="شماره موبایل"
                        value={fields.mobile }
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="email">ایمیل:</label>
                    <input
                        type="email"
                        name="email"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        required
                        placeholder="آدرس ایمیل"
                        value={fields.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="address">آدرس:</label>
                    <input
                        type="text"
                        name="address"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        required
                        placeholder="آدرس منزل"
                        value={fields.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full flex justify-center items-center gap-x-2">
                <label className="w-1/3" htmlFor="course">رشته آموزشی:</label>
                    <select
                        name="course"
                        type="text"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        required
                        value={fields.course || ""}
                        onChange={handleChange}
                    >
                        <option value="">رشته آموزشی </option>
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
                <label className="w-1/3" htmlFor="password">رمز عبور:</label>
                    <input
                        type="text"
                        name="password"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        placeholder="رمز عبور جدید را وارد کنید"
                        value={fields.password}
                        onChange={handleChange}
                    />
                </div>          
                <div className="w-full flex justify-center items-center gap-x-2">
                    <label className="w-1/3" htmlFor="status">وضعیت:</label>
                    <select
                        name="status"
                        type="text"
                        className="w-2/3 h-12 border p-3 bg-gray-50 dark:bg-gray-700"
                        required
                        value={fields.status}
                        onChange={handleChange}
                    >
                        <option value="">وضعیت</option>
                        <option value="فعال">فعال</option>
                        <option value="غیرفعال">غیرفعال</option>
                    </select>
                </div>
            </div>
                <div className="w-1/4 flex justify-center items-center flex-col gap-y-3 ">
                  <button type="submit" className="w-full p-3 bg-green-600 rounded-lg text-center text-white">ویرایش هنرجو </button>
                  <Link href={"/dashboard/students"}    className="w-full p-3 bg-red-600 rounded-lg text-center text-white" >  انصراف</Link>
                </div>
        </form>  
     );
 }
 export default EditStudentForm;