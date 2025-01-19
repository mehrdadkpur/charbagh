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
        const interval = setInterval(loadGuidances, 30000); 
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
                className="relative inline-flex items-center p-2 sm:p-3 text-sm font-medium text-center text-mango rounded-lg hover:bg-mango/10 focus:ring-2 focus:ring-mango/20 transition-all duration-300 z-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                <svg 
                    className="w-4 h-4 sm:w-5 sm:h-5" 
                    aria-hidden="true" 
                    fill="currentColor" 
                    viewBox="0 0 20 16"
                >
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                </svg>
                {unreadGuides.length > 0 && (
                    <div className="absolute inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 text-xs font-DanaMedium text-gray-900 bg-red-500 border-2 border-white rounded-full -top-2 -end-2">
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

