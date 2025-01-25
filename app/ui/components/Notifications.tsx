'use client'

import { fetchGuidances } from "@/lib/requests";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface IGuidance {
    _id: string;
    fullname: string;
    mobile: string;
    createdAt: string;
    status: string;
}

const Notifications = () => {
    const [guidances, setGuidances] = useState<IGuidance[]>([]);
    const [unreadGuides, setUnreadGuides] = useState<IGuidance[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadGuidances = async () => {
            try {
                const data = await fetchGuidances();
                const unreadCount = data.guidances.filter(
                    (guidance: IGuidance) => guidance.status === "در انتظار مشاوره"
                );
                setGuidances(data.guidances);
                setUnreadGuides(unreadCount);
            } catch (error) {
                console.error('Error loading guidances:', error);
            }
        };

        loadGuidances();
        const interval = setInterval(loadGuidances, 6000000); 
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Add click event listener to handle outside clicks
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                toast.success('وضعیت با موفقیت بروزرسانی شد');
            }
        } catch (error) {
            toast.error('خطا در بروزرسانی وضعیت');
        }
    };

    return (
        <div className="relative font-Dana" ref={notificationRef}>
            <button 
                type="button" 
                className="relative inline-flex items-center p-2 sm:p-3 text-sm font-medium text-center text-gray-900 dark:text-gray-50 rounded-lg hover:bg-mango/10 focus:ring-2 focus:ring-mango/20 transition-all duration-300 z-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
                {unreadGuides.length > 0 && (
                    <div className="absolute inline-flex items-center justify-center w-4 h-4 md:w-6 md:h-6 text-xs font-DanaMedium text-gray-900 bg-red-500 border-2 border-white rounded-full -top-2 -end-2">
                        {unreadGuides.length}
                    </div>
                )}
            </button>
            {isOpen && unreadGuides.length > 0 && (
                <div className="absolute -right-28 mt-2 w-56 rounded-xl text-gray-700 bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transform transition-all duration-300 ease-in-out z-50">
                    <div className="py-2">
                        <h4 className="text-xs sm:text-sm font-DanaMedium px-3 sm:px-4 py-2 text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
                            درخواست های مشاوره جدید
                        </h4>
                        <div className="w-full flex flex-col max-h-[60vh] sm:max-h-80 overflow-y-auto">
                            {unreadGuides.map((unread) => {
                                const formattedMobile = unread.mobile.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
                                return (
                                    <button
                                        onClick={() => handleStatus(unread._id)}
                                        key={unread._id}
                                        className="w-full px-3 sm:px-4 py-3 text-gray-700 dark:text-white hover:bg-mango/10 transition-colors duration-200 cursor-pointer"
                                    >
                                        <div className="flex flex-col gap-1 ">
                                            <span className="text-xs sm:text-sm font-Dana ">
                                                {unread.fullname}
                                            </span>
                                            <span className="text-base sm:text-lg font-Dana">
                                                {formattedMobile}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Notifications;

