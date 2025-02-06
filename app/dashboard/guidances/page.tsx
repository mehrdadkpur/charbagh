'use client';

import { useEffect, useState } from "react";
import { fetchGuidances } from '../../../lib/requests';
import Search from "@/app/ui/components/Search";
import DeleteModal from "@/app/ui/components/DeleteModal";
import jalaali from 'jalaali-js';
import toast from "react-hot-toast";

interface IGuidance {
    _id: string;
    fullname: string;
    mobile: string;
    createdAt: string;
    status:string;
}

const Guidances = () => {
    const [guidances, setGuidances] = useState<IGuidance[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGuidanceId, setSelectedGuidanceId] = useState<string>("");
    const [query, setQuery] = useState({ text: "" });
    const [filteredGuidances, setFilteredGuidances] = useState<IGuidance[]>([]);

    useEffect(() => {
        loadGuidances();
    }, []);

    const loadGuidances = async () => {
        try {
            const data = await fetchGuidances();
            setGuidances(data.guidances);
            setFilteredGuidances(data.guidances);
        } catch (error) {
            toast.error('خطا در بارگذاری اطلاعات');
        }
    };

    const handleStatus = async (guidanceId: string) => {
        try {
            const res = await fetch(`/api/guidances/${guidanceId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'مشاوره شد' })
            });

            if (res.ok) {
                setGuidances(prev => prev.map(guidance => 
                    guidance._id === guidanceId 
                        ? { ...guidance, status: 'مشاوره شد' }
                        : guidance
                ));
                setFilteredGuidances(prev => prev.map(guidance => 
                    guidance._id === guidanceId 
                        ? { ...guidance, status: 'مشاوره شد' }
                        : guidance
                ));
                toast.success('وضعیت با موفقیت بروزرسانی شد');
            }
        } catch (error) {
            toast.error('خطا در بروزرسانی وضعیت');
        }
    };

    const handleOpenModal = (guidanceId: string) => {
        setIsModalOpen(true);
        setSelectedGuidanceId(guidanceId);
    };

    const handleDeleteGuidance = async () => {
        if (!selectedGuidanceId) return;

        try {
            const res = await fetch(`/api/guidances/${selectedGuidanceId}`, {
                method: "DELETE"
            });

            if (res.ok) {
                setGuidances(prev => prev.filter(guidance => guidance._id !== selectedGuidanceId));
                setFilteredGuidances(prev => prev.filter(guidance => guidance._id !== selectedGuidanceId));
                toast.success('تیکت با موفقیت حذف شد');
                setIsModalOpen(false);
            }
        } catch (error) {
            toast.error('خطا در حذف تیکت');
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value.toLowerCase();
        setQuery({ text: searchText });
        
        const filtered = guidances.filter(guidance => 
            guidance.fullname.toLowerCase().includes(searchText)
        );
        setFilteredGuidances(filtered);
    };

    const convertToTehranTime = (isoDate: string): string => {
        const date = new Date(isoDate);
        return new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Tehran',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).format(date);
    };

    const formatJalaaliDate = (date: string): string => {
        const shamsiDate = jalaali.toJalaali(new Date(date));
        return `${shamsiDate.jy}/${shamsiDate.jm}/${shamsiDate.jd}`;
    };

    return (
        <section className="w-full flex justify-center pr-[340px] pl-10 mt-3">
            <div className="w-full p-5 flex justify-center rounded-xl">
                <div className="w-full mt-5">
                    <h1 className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4">
                        درخواست های پشتیبانی
                    </h1>
                    <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
                        <div className="w-full flex justify-center items-center gap-x-5 mb-5">
                            <Search query={query} handleSearch={handleSearch} baseSearch="نام خانوادگی" />
                        </div>
                        <DeleteModal onDelete={handleDeleteGuidance} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                        <table className="w-full text-sm">
                            <thead className="text-xs">
                                <tr>
                                    <th scope="col" className="px-6 py-3">نام و نام خانوادگی</th>
                                    <th scope="col" className="px-6 py-3">موبایل</th>
                                    <th scope="col" className="px-6 py-3">تاریخ</th>
                                    <th scope="col" className="px-6 py-3">ساعت</th>
                                    <th scope="col" className="px-6 py-3">وضعیت</th>
                                    <th scope="col" className="px-6 py-3">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredGuidances.map((guidance) => (
                                    <tr key={guidance._id} className={`${guidance.status === "مشاوره شد" ? "bg-gray-100 dark:bg-gray-700 opacity-70" : "bg-gray-50 dark:bg-gray-500"} border-b hover:bg-gray-50`}>
                                        <td className="px-6 py-4">{guidance.fullname}</td>
                                        <td className="px-6 py-4">{guidance.mobile}</td>
                                        <td className="px-6 py-4">{formatJalaaliDate(guidance.createdAt)}</td>
                                        <td className="px-6 py-4">{convertToTehranTime(guidance.createdAt)}</td>
                                        <td className="px-6 py-4">{guidance.status}</td>
                                        <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => handleStatus(guidance._id)}
                        disabled={guidance.status === "مشاوره شد"}
                        className={`px-3 py-1.5 rounded-lg text-white transition-colors ${
                            guidance.status === "مشاوره شد" 
                                ? "bg-gray-400 cursor-not-allowed" 
                                : "bg-green-700 hover:bg-green-800"
                        }`}
                    >
                        {guidance.status === "در انتظار مشاوره" ? "تکمیل کردن مشاوره" : "مشاوره شد"}
                    </button>
                    <button 
                        onClick={() => handleOpenModal(guidance._id)}
                        className="bg-red-700 px-3 py-1.5 rounded-lg text-white hover:bg-red-800 transition-colors"
                    >
                        حذف کردن
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
};

export default Guidances;
