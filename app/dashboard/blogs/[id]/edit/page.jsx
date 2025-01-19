
import EditBlogForm from "./EditBlogForm";

const EditBlog = () => {

    return ( 
        <section className="flex mt-2 font-DanaDemiBold">
        <div className=" container flex justify-center items-center flex-col gap-y-4 ">
          <div className="w-full p-2 bg-slate-800 text-center text-white">
              <p> ویرایش پست </p>
          </div>
          <div className="w-1/2 flex justify-center items-center bg-white px-20 py-5">
              <EditBlogForm/> 
          </div>
        </div>
      </section>
     );
}
 
export default EditBlog;