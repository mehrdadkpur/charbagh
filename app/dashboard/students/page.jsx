"use client"

import Search from "@/app/ui/components/Search";
import AddButton from "@/app/ui/components/AddButton";
import Link from "next/link";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import DeleteModal from "../../ui/components/DeleteModal";
import Image from "next/image";


const getStudents = async () => {
    const response = await fetch('/api/students');
    if (!response.ok) {
      throw new Error('Failed to fetch students');
    }
    return response.json();
  };


const Students = () => {

    const [students, setStudents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [query,setQuery]=useState({text:""});
    const [filteredStudents , setFilteredStudents]=useState([]);

  useEffect(() => {
    const loadStudents = async () => {
      const data = await getStudents();
      setStudents(data.students);
      setFilteredStudents(data.students);
    };
    loadStudents();
  }, []);

  const handleOpenModal=(studentId)=>{
    setIsModalOpen(true);
    setSelectedStudentId(studentId)
  }

  const handleDeleteStudent = async () => {
    try {
        const res = await fetch(`/api/students/${selectedStudentId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.ok) {
            setStudents(students.filter((student) => student._id !== selectedStudentId))
            setIsModalOpen(false)
            toast.success('هنرجو با موفقیت حذف شد',{duration:5000});
            
            window.location.reload()
        }
    } catch (error) {
        toast.error('خطا در حذف هنرجو')
        console.error("Error deleting student:", error)
    }
}

  const handleSearch = (e)=>{
    setQuery({...query , text:e.target.value});
    const allStudents = students.filter((student)=>{
        const firstnameMatch = student.firstname.toLowerCase().includes(e.target.value.toLowerCase());
        const lastnameMatch = student.lastname.toLowerCase().includes(e.target.value.toLowerCase());
        return firstnameMatch || lastnameMatch 
    })
    setFilteredStudents(allStudents);
  }

    return ( 
        <section className="w-full flex justify-center pr-[340px] pl-10 mt-3">
            <div className="w-full p-5 flex justify-center bg-white rounded-xl">
                <div className="w-full mt-5 ">                   
                    <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4">هنرجویان آموزشگاه</span>
                    <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
                                                                        {/* Search Box & Add Teacher Button*/}
                        <div className="w-full flex justify-center items-center gap-x-5 mb-5">
                           <Search query={query} handleSearch={handleSearch} baseSearch={"نام و نام خانوادگی"}/>
                           <AddButton route={'/dashboard/students/add-student'}/>  
                        </div>
                                                                        {/* Delete Modal */}
                        <DeleteModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onDelete={handleDeleteStudent}/>
                                                                         {/* table */}   
                        <table className="w-full text-sm text-left font-DanaMedium rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                                {filteredStudents?.map((student) => (
                                <tr key={student._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 flex-shrink-0">
                                        <Image width={40} height={40} className="w-full h-full rounded-full object-cover" src={student.profileImg? student.profileImg: '/images/avatar.png'} alt={`${student.firstname} ${student.lastname}`}/>
                                        </div>
                                        <div className="mr-3">
                                        <div className="text-base font-semibold">
                                            {student.firstname} {student.lastname}
                                        </div>
                                        <div className="font-normal text-gray-500">{student.email}</div>
                                        </div>
                                    </div>
                                    </td>
                                    <td className="px-6 py-4">هنرجوی ساز {student.course}</td>
                                    <td className="px-6 py-4">{student.nationalityNumber}</td>
                                    <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 ml-2"></div>
                                        {student.status}
                                    </div>
                                    </td>
                                    <td className="px-6 py-4">{student.mobile}</td>
                                    <td className="flex justify-center items-center py-4">
                                    <div className="flex items-center gap-2">
                                        <Link 
                                        href={`/dashboard/students/${student._id}`}
                                        className="bg-green-700 px-3 py-1.5 rounded-lg text-white hover:bg-green-800 transition-colors"
                                        >
                                        مشاهده
                                        </Link>
                                        <Link 
                                        href={`/dashboard/students/${student._id}/edit`}
                                        className="bg-orange-700 px-3 py-1.5 rounded-lg text-white hover:bg-orange-800 transition-colors"
                                        >
                                        ویرایش
                                        </Link>
                                        <button 
                                        onClick={() => handleOpenModal(student._id)}
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
 
export default Students;

