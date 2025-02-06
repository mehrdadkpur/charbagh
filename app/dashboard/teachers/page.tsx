"use client"

import AddButton from "@/app/ui/components/AddButton";
import DeleteModal from "@/app/ui/components/DeleteModal";
import Search from "@/app/ui/components/Search";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react"
import toast from "react-hot-toast";

interface ITeacher {
    _id: string;
    firstname: string;
    lastname: string;
    birthDate: string;
    gender: string;
    nationalityNumber: string;
    teacherId: string;
    registryDate: string;
    mobile: string;
    email: string;
    address: string;
    skill: string;
    password?: string;
    status: string;
    role: string;
    mainImg: string;
    teacher_resume: string;
    isAdmin: boolean
}

interface QueryState {
    text: string
}

const getTeachers = async () => {
    const response = await fetch('/api/teachers');
    if (!response.ok) {
        throw new Error('Failed to fetch teachers');
    }
    return response.json();
};

const Teachers = () => {
    const [teachers, setTeachers] = useState<ITeacher[]>([]);
    const [selectedTeacherId, setSelectedTeacherId] = useState<string>("");
    const [query, setQuery] = useState<QueryState>({ text: "" });
    const [filteredTeachers, setFilteredTeachers] = useState<ITeacher[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const loadTeachers = async () => {
            const data = await getTeachers();
            setTeachers(data.teachers);
            setFilteredTeachers(data.teachers)
        };
        loadTeachers();
    }, []);

    const handleOpenModal = (teacherId: string) => {
        setIsModalOpen(true);
        setSelectedTeacherId(teacherId)
    }

    const handleDeleteTeacher = async () => {
        try {
            const res = await fetch(`/api/teachers/${selectedTeacherId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (res.ok) {
                setTeachers(teachers.filter((teacher) => teacher._id !== selectedTeacherId))
                setIsModalOpen(false)
                toast.success('استاد با موفقیت حذف شد', { duration: 5000 })
                window.location.reload()
            }
        } catch (error) {
            toast.error('خطا در حذف استاد')
            console.error("Error deleting teacher:", error)
        }
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value.toLowerCase();
        setQuery({ ...query, text: searchValue });
        
        const allTeachers = teachers.filter((teacher) => {
            const lastNameMatch = teacher.lastname.toLowerCase().includes(searchValue);
            const firstNameMatch = teacher.firstname.toLowerCase().includes(searchValue);
            return lastNameMatch || firstNameMatch
        })
        setFilteredTeachers(allTeachers);
    }

    return (
        <section className="w-full flex justify-center pr-[340px] pl-10 mt-3">
            <div className="w-full p-5 flex justify-center rounded-xl">
                <div className="w-full mt-5">
                    <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4">
                        اساتید آموزشگاه
                    </span>
                    <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
                        <div className="w-full flex justify-center items-center gap-x-5 mb-5">
                            <Search query={query} handleSearch={handleSearch} baseSearch={"نام و نام خانوادگی"} />
                            <AddButton route={'/dashboard/teachers/add-teacher'} />
                        </div>
                            <DeleteModal onDelete={handleDeleteTeacher} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                                                                         {/* table */}   
                        <table className="w-full text-sm font-DanaMedium bg-white dark:bg-gray-900 ">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-6 py-3">نام و نام خانوادگی</th>
                                    <th scope="col" className="px-6 py-3">حوزه هنری</th>
                                    <th scope="col" className="px-6 py-3">شماره ملی</th>
                                    <th scope="col" className="px-6 py-3">وضعیت</th>
                                    <th scope="col" className="px-6 py-3">شماره موبایل</th>
                                    <th scope="col" className="flex justify-center items-center py-3">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTeachers?.map((teacher) => (
                                <tr key={teacher._id} className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 flex-shrink-0">
                                            <Image width={40} height={40} className="w-full h-full rounded-full object-cover"  src={teacher.mainImg || '/images/avatar.png'} alt={`${teacher.firstname} ${teacher.lastname}`} />
                                        </div>

                                        <div className="mr-3">
                                        <div className="text-base font-semibold"> {teacher.firstname} {teacher.lastname} </div>
                                        <div className="font-normal text-gray-500">{teacher.email}</div>
                                        </div>
                                    </div>
                                    </td>
                                    <td className="px-6 py-4">استاد ساز {teacher.skill}</td>
                                    <td className="px-6 py-4">{teacher.nationalityNumber}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                        <div className={`h-2.5 w-2.5 rounded-full ${teacher.status === "فعال" ? "bg-green-500" : "bg-red-500"} ml-2`}></div>
                                        <span>{teacher.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{teacher.mobile}</td>
                                    <td className="flex justify-center items-center py-4">
                                    <div className="flex items-center gap-2">
                                        <Link 
                                        href={`/dashboard/teachers/${teacher._id}`}
                                        className="bg-green-700 px-3 py-1.5 rounded-lg text-white hover:bg-green-800 transition-colors"
                                        >
                                        مشاهده
                                        </Link>
                                        <Link 
                                        href={`/dashboard/teachers/${teacher._id}/edit`}
                                        className="bg-orange-700 px-3 py-1.5 rounded-lg text-white hover:bg-orange-800 transition-colors"
                                        >
                                        ویرایش
                                        </Link>
                                        <button 
                                        onClick={() => handleOpenModal(teacher._id)}
                                        className="bg-red-700 px-3 py-1.5 rounded-lg text-white hover:bg-red-800 transition-colors"
                                        >
                                        حذف
                                        </button>
                                    </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>

     );
}
 
export default Teachers;

