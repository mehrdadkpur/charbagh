"use client"

import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react"
import { fetchInstruments } from "@/lib/requests";
import Search from "@/app/ui/components/Search";
import AddButton from "@/app/ui/components/AddButton";
import toast from "react-hot-toast";
import Image from "next/image";
import DeleteModal from "@/app/ui/components/DeleteModal";

interface Instrument{
_id:string;
instrument_name:string;
instrument_img:string;
instrument_teachers:string[];
}
interface QueryState {
    text: string
}


const Instruments = () => {

    const [instruments, setInstruments] = useState<Instrument[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInstrumentId, setSelectedInstrumentId] = useState<string| null>(null);
    const [query,setQuery]=useState<QueryState>({text:""});
    const [filteredInstruments , setFilteredInstruments]=useState<Instrument[]>([]);


  useEffect(() => {
    const instrumentsData = async () => {
      const data = await fetchInstruments();
      setInstruments(data.instruments);
      setFilteredInstruments(data.instruments)
    };
    instrumentsData();
  }, []);

  const handleOpenModal=(instrumentId:string)=>{
    setIsModalOpen(true);
    setSelectedInstrumentId(instrumentId)
  }

  const handleDeleteInstrument = async () => {
    try {
        const res = await fetch(`/api/instruments/${selectedInstrumentId}`, {
            method: "DELETE"
        })

        if (res.ok) {
            // Update local state
            setInstruments(instruments.filter((instrument) => instrument._id !== selectedInstrumentId))
            
            // Close modal and show success message
            setIsModalOpen(false)
            toast.success('ساز با موفقیت حذف شد', {duration: 5000})
            
            // Refresh instrument list
            const updatedInstruments = await fetchInstruments()
            setInstruments(updatedInstruments.instruments)
            setFilteredInstruments(updatedInstruments.instruments)
        }
    } catch (error) {
        toast.error('خطا در حذف ساز')
        console.error("Error deleting instrument:", error)
    }
}

const handleSearch = (e: ChangeEvent<HTMLInputElement>)=>{    
    setQuery({...query , text:e.target.value});
    const allInstruments = instruments.filter((instrument)=>{
        return instrument.instrument_name.toLowerCase().includes(e.target.value.toLowerCase());
    })
    setFilteredInstruments(allInstruments);    
}  

    return ( 
        <section className="w-full flex justify-center pr-[340px] pl-10 mt-3">
            <div className="w-full p-5 flex justify-center rounded-xl">
                <div className="w-full mt-5 ">                   
                    <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4"> معرفی سازها </span>
                    <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
                                                                        {/* Search Box & Add Course Button*/}
                        <div className="w-full flex justify-center items-center gap-x-5 mb-5">
                            <Search query={query} handleSearch={handleSearch} baseSearch={"نام ساز"}/>
                            <AddButton route={"/dashboard/instruments/add-instrument"}/>  
                        </div>
                                                                        {/* Delete Modal */}
                        <DeleteModal onDelete={handleDeleteInstrument} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                                                                         {/* table */}   
                        <table className="w-full text-sm">
                            <thead className="text-xs">
                                <tr>
                                <th scope="col" className="px-6 py-3">نام ساز</th>
                                <th scope="col" className="px-6 py-3">اساتید ساز</th>
                                <th scope="col" className="flex justify-center items-center py-3">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredInstruments?.map((instrument) => (
                                <tr key={instrument._id} className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center overflow-hidden">
                                            <div className="w-10 h-10 flex-shrink-0"> 
                                                <Image width={40} height={40} className="rounded-full" src={instrument.instrument_img} alt={instrument.instrument_name} /> 
                                            </div>
                                            <div className="mr-3">
                                            <div className="text-base font-semibold">
                                                {instrument.instrument_name}
                                            </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{instrument.instrument_teachers?.join(' , ')}</td>
                                    
                                    <td className="flex justify-center items-center py-4">
                                    <div className="flex items-center gap-2">
                                        <Link 
                                        href={`/dashboard/instruments/${instrument._id}`}
                                        className="bg-green-700 px-3 py-1.5 rounded-lg text-white hover:bg-green-800 transition-colors"
                                        >
                                        مشاهده ساز
                                        </Link>
                                        <Link 
                                        href={`/dashboard/instruments/${instrument._id}/edit-instrument`}
                                        className="bg-orange-700 px-3 py-1.5 rounded-lg text-white hover:bg-orange-800 transition-colors"
                                        >
                                        ویرایش
                                        </Link>
                                        <button 
                                        onClick={() => handleOpenModal(instrument._id)}
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
 
export default Instruments;

