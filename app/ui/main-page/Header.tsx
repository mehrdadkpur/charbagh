'use client'

import Link from "next/link"
import Image from "next/image"
import Navigation from "./Navigation"

const Header = () => {
  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900">
      <div className="w-full bg-elf dark:bg-[#25403c]">
        <div className="flex flex-col">
          <Navigation />
          <div className="flex  md:flex justify-center items-center gap-8 lg:gap-20 px-4 xl:px-24">
            {/* Content */}
            <div className="w-full md:w-1/2 flex justify-center items-center text-center">
              <h1 className="w-2/3 text-2xl md:text-4xl lg:text-5xl xl:text-7xl font-MorabbaBold leading-snug text-gray-900 dark:text-gray-50">
                الهـام بخشیـــدن به زندگـی با{' '}
                <span className="inline-block mt-3 bg-mango dark:bg-elf px-3 py-1 rounded-xl text-elf dark:text-mango">
                  موسیقی
                </span>
              </h1>
              
              <Link 
                href="/learning-plans"
                className="flex justify-center items-center text-xs px-1 md:px-6 md:py-4 bg-gray-900 dark:bg-gray-100 
                text-white dark:text-gray-900 rounded-full 
                 md:text-xl xl:text-2xl font-DanaMedium 
                hover:bg-mango hover:text-gray-900 
                md:transform md:transition-all duration-300 md:hover:scale-105"
              >
                شروع یادگیری
              </Link>
            </div>

            {/* Hero Image */}
            <div className="md:w-1/2 flex justify-end">
              <Image
                src="/images/Header-Vector.png"
                alt="Hero illustration"
                width={500}
                height={500}
                className=""
                priority
              />
            </div>
          </div>
          {/* Footer Shape */}
          <div className="w-full ">
            <Image
              src="/images/shapes/header.png"
              alt="Decorative shape"
              width={1920}
              height={169}
              className="w-full block dark:hidden"
              priority
            />
            <Image
              src="/images/shapes/header-dark.png"
              alt="Decorative shape"
              width={1920}
              height={169}
              className="w-full hidden dark:block"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header

