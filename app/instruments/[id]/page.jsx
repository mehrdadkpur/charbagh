'use client'
import { useEffect, useState } from "react";
import RoutesHeader from "@/app/ui/components/RoutesHeader";
import { useParams } from "next/navigation";
import {fetchInstrument} from "@/lib/requests"
import Loading from "@/app/loading";
import Image from "next/image";

const Instrument = () => { 
    const { id } = useParams(); 
    const [instrument, setInstrument] = useState(null); 
    const [loading, setLoading] = useState(true);
    
    
    useEffect(() => { 
        const fetchInstrumentData = async () => { 
            if (!id) return; 
            try { 
                const instrument = await fetchInstrument(id); 
                setInstrument(instrument); 
            } catch (error) { 
                console.log(error.message); 
            } finally { 
                setLoading(false); 
            } 
        }; 
        if (instrument === null) { 
            fetchInstrumentData(); 
        } 
    }, [id, instrument]); 
    
    if (loading) { 
        return <Loading/>; 
    } 
    if (!instrument) { 
        return <div>Instrument not found</div>; 
    }
    
    return ( 
            <div className="w-full bg-[#F6F4EE] dark:bg-gray-900">
                <RoutesHeader pageTitle={'سازشناسی'} boldText={'آشنایی با ساز '} Highlight={instrument.instrument_name}/>
                <div className="container relative">
                    <div className="content flex justify-center items-center flex-col p-5">
                        <div className="w-2/3 flex justify-center items-center absolute -top-[100px] md:-top-[200px] py-5 bg-white dark:bg-gray-700 rounded-3xl">
                            <Image width={100} height={100} className="rounded-3xl" src={instrument.instrument_img} alt={instrument.instrument_name} />
                        </div>
                        <div className="w-[80%] mt-[240px] md:mt-[400px] text-base font-Dana leading-10 text-[#152420]/80 dark:text-gray-50">{instrument.instrument_description}</div>
                    </div>
                </div>
                <div>
                    <Image width={1920} height={134} src="/images/shapes/footer-1.png" alt="footer" />
                </div>
            </div>
      
     );
}
 
export default Instrument;