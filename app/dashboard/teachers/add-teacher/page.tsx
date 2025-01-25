
import AddTeacherForm from "../AddTeacherForm";

const AddTeacher = () => {

    return ( 
        <section className="flex mt-2">
        <div className=" container flex justify-center items-center flex-col gap-y-2 ">
          <div className="w-full p-2 bg-slate-800 text-center text-white rounded-lg font-DanaDemiBold">
              <p> افزودن استاد  جدید </p>
          </div>
          <div className="w-full bg-white px-20 py-10 rounded-lg">
              <AddTeacherForm/> 
          </div>
        </div>
      </section>
     );
}
 
export default AddTeacher;