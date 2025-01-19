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
        <div className="relative group">
          <Image
            src={teacher.mainImg}
            alt={`${teacher.firstname} ${teacher.lastname}`}
            width={144}
            height={144}
            className="rounded-full object-cover transition-transform duration-300"
            priority
          />
          <div className="absolute inset-0 rounded-full bg-mango/10 opacity-0 " />
        </div>
  
        <div className="text-center space-y-1">
          <h3 className="text-lg font-DanaDemiBold text-gray-800 dark:text-gray-100">
            {teacher.firstname} {teacher.lastname}
          </h3>
          <p className="text-sm font-Dana text-gray-600 dark:text-gray-300">
            استاد {teacher.skill}
          </p>
        </div>
  
        <Link
          href={`/teachers/${teacher._id}`}
          className="px-6 py-2 bg-mango hover:bg-mango-600 text-white rounded-full text-sm font-DanaDemiBold transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-mango/50"
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
  