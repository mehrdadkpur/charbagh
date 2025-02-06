"use client"
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState,useEffect } from "react";
import { fetchInstrument } from "@/lib/requests";
import Loading from "@/app/loading";
import Image from "next/image";

interface Instrument {
    instrument_name: string
    instrument_type: string
    instrument_teachers: string[]
    instrument_description: string
    instrument_origin: string
    instrument_img: string
}

const ViewInstrument = () => {
    const {id} = useParams();
    const [instrument , setInstrument] = useState<Instrument|null>(null);
    const [loading, setLoading] = useState(true); 


    useEffect(()=>{
        const fetchInstrumentData = async ()=>{
            if(!id) return;
           try{
               const instrument = await fetchInstrument(id as string)
               setInstrument(instrument);
               
           } catch(error:unknown){
            console.error('Error fetching Instrument:', (error as Error).message)
           } finally{
            setLoading(false)
           }
       };
           if(instrument === null){
            fetchInstrumentData()
           }
       },[id , instrument]);
       
       if (loading) { 
        return <Loading/>; 
    } 
    if (!instrument) { 
        return <div>Instrument not found</div>; 
    }

  
    return ( 
        <div className="w-full flex justify-center pr-[340px] pl-10 mt-3">
            <div className="w-full p-5 flex justify-center rounded-xl">
                <div className="w-full flex flex-col justify-center items-center gap-y-5 ">
                    <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4"> مشخصات ساز </span>
                    <div className="w-full flex flex-col justify-center items-center sm:rounded-lg">
                        <Image width={100} height={200} src={instrument.instrument_img}  alt={instrument.instrument_name} className="rounded-xl" />
                        <div className="w-full flex p-3 shadow-xl font-DanaMedium rounded-lg">
                            <div className="w-full flex flex-col gap-y-2 p-3">
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>نام ساز  :</span>
                                    <span className="text-xl">{instrument.instrument_name}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span> اساتید ساز:</span>
                                    <span className="text-xl">{instrument.instrument_teachers?.join(' ، ')}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span>  نوع ساز:</span>
                                    <span className="text-xl">{instrument.instrument_type}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span> مبدا ساز:</span>
                                    <span className="text-xl">{instrument.instrument_origin}</span>
                                </div>
                                <div className="flex justify-start items-center gap-x-6 rounded-md p-2 hover:bg-slate-300">
                                    <span> درباره ساز:</span>
                                    <span className="text-xl">{instrument.instrument_description}</span>
                                </div>
                            </div>
                            
                        </div>                        
                    </div>
                    <div className="w-1/5 flex justify-center items-center font-DanaMedium">
                        <Link href={"/dashboard/instruments"} className="w-full p-3 bg-red-600 rounded-lg text-xl text-center text-white" >  بازگشت</Link>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ViewInstrument;