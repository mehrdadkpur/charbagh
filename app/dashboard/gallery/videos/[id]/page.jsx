"use client"
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState,useEffect } from "react";
import { fetchVideo } from "@/lib/requests";
import Loading from "@/app/loading";

const ViewVideo = () => {
    const {id} = useParams();
    const [video , setVideo] = useState(null);
    const [loading, setLoading] = useState(true); 


    useEffect(()=>{
        const fetchVideoData = async ()=>{
            if(!id) return;
           try{
               const video = await fetchVideo(id)
               setVideo(video);
               
           } catch(error){
               console.log(error.messsage);
           } finally{
            setLoading(false)
           }
       };
           if(video === null){
            fetchVideoData()
           }
       },[id , video]);
       
       if (loading) { 
        return <Loading/>; 
    } 
    if (!video) { 
        return <div>video not found</div>; 
    }

  
    return ( 
        <div className="w-full flex justify-center pr-[340px] pl-10 mt-3">
            <div className="w-full p-5 flex justify-center bg-white rounded-xl">
                <div className="w-full flex flex-col justify-center items-center gap-y-5 ">
                    <span className="w-full flex justify-center items-center font-MorabbaMedium text-3xl mb-4"> مشخصات فیلم </span>
                    <div className="w-full flex flex-col justify-center items-center sm:rounded-lg">
                        <div className="">
                        <iframe className="w-full rounded-xl" src={video.url}  allowFullScreen ></iframe>
                        </div>
                        <div className="w-2/3 flex flex-col justify-center gap-y-5 p-5 shadow-xl font-DanaMedium rounded-lg">
                            <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                <span>نام فیلم  :</span>
                                <span className="text-xl">{video.title}</span>
                            </div>
                            <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                <span>  توضیحات:</span>
                                <span className="text-xl">{video.description}</span>
                            </div>
                            <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                <span>  سال تهیه فیلم:</span>
                                <span className="text-xl">{video.videoDate}</span>
                            </div>
                            <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                <span> دسته بندی:</span>
                                <span className="text-xl">{video.category}</span>
                            </div>
                            <div className="flex justify-start items-center gap-x-6 bg-slate-100 rounded-md p-2 hover:bg-slate-300">
                                <span>  تگ ها :</span>
                                <span className="text-xl">{video.tags}</span>
                            </div>                                                
                        </div>                        
                    </div>
                    <div className="w-1/5 flex justify-center items-center font-DanaMedium">
                        <Link href={"/dashboard/gallery/videos"} className="w-full p-3 bg-red-600 rounded-lg text-xl text-center text-white" >  بازگشت</Link>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ViewVideo;