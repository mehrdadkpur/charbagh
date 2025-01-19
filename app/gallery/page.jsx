import Link from "next/link";
import RoutesHeader from "../ui/components/RoutesHeader";
import Image from "next/image";

export default function GalleryPage() {
  return (
    <section>
      <div>
        <div className="w-full bg-[#F6F4EE] dark:bg-gray-900 ">
          <RoutesHeader pageTitle={'گالری'} boldText={'گالـــــری'} Highlight={'عکس و فیلم'} />
          <div className="container">
            <div className="w-full flex">
              <div className="w-full gird grid-cols-4 content-center rounded-3xl">
                <Link href={`/gallery/photos`} className="w-full flex justify-center text-greenDark dark:text-gray-50 items-center rounded-xl hover:shadow-xl mb-5 ">
                  <div className=" flex justify-between items-center text-lg font-Dana gap-x-5 ">
                    <div className="w-20 h-20 flex justify-center items-center rounded-2xl ">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className=" font-DanaDemiBold">گالری تصاویر</h4>
                    </div>
                  </div>
                </Link>
                <Link href={`/gallery/videos`} className="w-full flex justify-center text-greenDark dark:text-gray-50 items-center rounded-xl hover:shadow-xl mb-5 " >
                  <div className=" flex justify-between items-center text-lg font-Dana gap-x-5 ">
                    <div className="w-20 h-20 flex justify-center items-center rounded-2xl ">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className=" font-DanaDemiBold">گالری فیلم ها</h4>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <Image width={1920} height={134} src="/images/shapes/footer-1.png" alt="footer" />
        </div>
      </div>
    </section>
  );
}
