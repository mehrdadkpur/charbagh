"use client"
import { useParams } from 'next/navigation';
import AddBookForm from './AddBookForm';

export default function AddBookPage() {
  const { id } = useParams();

  return (
    <section className="flex mt-2">
      <div className="container flex justify-center items-center flex-col gap-y-4">
        <div className="w-full p-2 bg-slate-800 text-center text-white">
          <p>افزودن کتاب جدید</p>
        </div>
        <div className="w-1/2 flex justify-center items-center bg-white px-20 py-5">
          <AddBookForm id={id} />
        </div>
      </div>
    </section>
  );
}
