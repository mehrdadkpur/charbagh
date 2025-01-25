import Image from "next/image"
import Link from "next/link"

interface Teacher {
    _id: string
    mainImg: string
    firstname: string
    lastname: string
    skill: string
  }
  
  const TeacherCard = ({ teacher }: { teacher: Teacher }) => (
    <div className="w-full p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col items-center gap-4">
          <Image
            src={teacher.mainImg}
            alt={`${teacher.lastname}`}
            width={144}
            height={144}
            className="rounded-full border border-mango "
            priority
          />
        <div className="text-center space-y-1">
          <h3 className="text-sm md:text-lg font-DanaDemiBold text-gray-800 dark:text-gray-100">
            {teacher.firstname} {teacher.lastname}
          </h3>
          <p className="text-sm font-Dana text-gray-600 dark:text-gray-300">
            مدرس ساز {teacher.skill}
          </p>
        </div>
  
        <Link
          href={`/teachers/${teacher._id}`}
          className="font-DanaMedium bg-mango dark:bg-elf text-sm md:text-lg text-gray-900 dark:text-gray-50 p-3 mb-4 rounded-full hover:bg-elf dark:hover:bg-mango hover:scale-105 ease-in-out transition-all duration-700"
        >
          مشاهده رزومه
        </Link>
      </div>
    </div>
  )
  
  const TeacherGrid = ({ teachers }: { teachers: Teacher[] }) => (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {teachers.slice(0, 4).map((teacher) => (
        <TeacherCard key={teacher._id} teacher={teacher} />
      ))}
    </div>
  )
  
  export default TeacherGrid
  