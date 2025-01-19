
import EditCourseForm from "./EditCourseForm";

const EditCourse = () => {

    return ( 
        <section className="flex mt-2">
        <div className=" container flex justify-center items-center flex-col gap-y-4 ">
          <div className="w-full p-2 bg-slate-800 text-center text-white">
              <p> ویرایش مشخصات دوره </p>
          </div>
          <div className="w-1/2 flex justify-center items-center bg-white px-20 py-5">
              <EditCourseForm/> 
          </div>
        </div>
      </section>
     );
}
 
export default EditCourse;