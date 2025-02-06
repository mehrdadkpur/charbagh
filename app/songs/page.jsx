import RoutesHeader from "@/app/ui/components/RoutesHeader";
import Link from "next/link";
import { fetchSongs } from "@/lib/requests";
import Image from "next/image";

export const metadata = {
    title: 'آموزشگاه چهارباغ | صفحه موسیقی',
    description: 'این صفحه گالری عکس آموزشگاه موسیقی چهارباغ است.',
  };
  

const SongsCategories = async () => {   
 const {songs} = await fetchSongs();

    return ( 
            <div className="bg-[#F6F4EE] h-full dark:bg-gray-900">
                <RoutesHeader pageTitle={'مجله موسیقی'} boldText={'پــخش و دانلــود'} Highlight={'موسیقــــی'}/>
                <div className="container">
                    <div className="w-full grid grid-cols-2 md:grid-cols-4">
                            { songs && songs?.map((category)=>(
                                <div key={category._id} className="w-full gird grid-cols-4 content-center rounded-3xl">
                                    <Link href={`/songs/${category._id}`} className="w-full flex justify-center text-greenDark items-center rounded-xl hover:shadow-xl ">
                                    <div className=" flex justify-between items-center text-lg font-Dana gap-x-5 ">
                                    <div className="w-20 h-20 flex justify-center items-center rounded-2xl bg-white ">
                                        <Image width={120} height={120} className="w-[90%] h-[90%] rounded-2xl" src={category.instrument_img} alt="pic" />
                                    </div>
                                    <div>
                                        <h2 className=" font-DanaDemiBold dark:text-gray-50">{category.instrument_name}</h2>                             
                                        <h5 className=" text-greenDark/70 font-Dana text-sm  dark:text-gray-500">بی کلام</h5>
                                    </div>
                                    </div>
                                    </Link>
                                </div>
                            ))}
                            </div>
                    </div>    
                    <Image className="" width={1920} height={134} src="/images/shapes/footer-1.png" alt="footer" />
                </div>
     );
}
 
export default SongsCategories;