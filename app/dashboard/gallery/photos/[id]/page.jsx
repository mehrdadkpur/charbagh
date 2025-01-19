"use client"
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState,useEffect } from "react";
import { fetchPhoto } from "@/lib/requests";
import Loading from "@/app/loading";
import Image from "next/image";

const ViewPhoto = () => {
    const {id} = useParams();
    const [photo , setPhoto] = useState(null);
    const [loading, setLoading] = useState(true); 


    useEffect(()=>{
        const fetchPhotoData = async ()=>{
            if(!id) return;
           try{
               const photo = await fetchPhoto(id)
               setPhoto(photo);
               
           } catch(error){
               console.log(error.messsage);
           } finally{
            setLoading(false)
           }
       };
           if(photo === null){
            fetchPhotoData()
           }
       },[id , photo]);
       
       if (loading) { 
        return <Loading/>; 
    } 
    if (!photo) { 
        return <div>Photo not found</div>; 
    }

  
    return ( 
        <div className="w-full flex justify-center pr-[340px] pl-10 mt-3">
            <div className="w-full p-5 flex justify-center bg-white rounded-xl">
                <div className="w-full flex flex-col justify-center items-center gap-y-5 ">
                    <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4"> مشخصات عکس </span>
                    <div className="w-full flex flex-col justify-center items-center sm:rounded-lg">
                        <div className="w-96">
                        <Image width={384} height={200} src={photo.url}  alt={photo.title} className=" rounded-xl" />
                        </div>
                        <div className="w-2/3 flex flex-col justify-center gap-y-5 p-5 shadow-xl font-DanaMedium rounded-lg">
                            <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                <span>نام عکس  :</span>
                                <span className="text-xl">{photo.title}</span>
                            </div>
                            <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                <span>  توضیحات:</span>
                                <span className="text-xl">{photo.description}</span>
                            </div>
                            <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                <span>  سال تهیه عکس:</span>
                                <span className="text-xl">{photo.photoDate}</span>
                            </div>
                            <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                <span> دسته بندی:</span>
                                <span className="text-xl">{photo.category}</span>
                            </div>
                            <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                <span>  تگ ها :</span>
                                <span className="text-xl">{photo.tags}</span>
                            </div>                                                
                        </div>                        
                    </div>
                    <div className="w-1/5 flex justify-center items-center font-DanaMedium">
                        <Link href={"/dashboard/gallery/photos"} className="w-full p-3 bg-red-600 rounded-lg text-xl text-center text-white" >  بازگشت</Link>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ViewPhoto;