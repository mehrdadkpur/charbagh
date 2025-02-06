'use client';

import RoutesHeader from "@/app/ui/components/RoutesHeader";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { fetchSongs } from "../../../lib/requests";
import Loading from "@/app/loading";
import Modal from 'react-modal';
import Link from "next/link";
import ErrorHandling from "@/app/ui/components/ErrorHandling";

const Songs = () => {
    const { id } = useParams();
    const [songs, setSongs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [selectedSong, setSelectedSong] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [chevron, setChevron] = useState(false);

    useEffect(() => {
        const fetchSongData = async () => {
            if (!id) return;
            try {
                const fetchedSongs = await fetchSongs(id);
                // Find the specific instrument by id
                const selectedInstrument = fetchedSongs.songs.find(song => song._id === id);
                setSongs(selectedInstrument);
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchSongData();
    }, [id]);

    useEffect(() => {
       document.title = "'آموزشگاه چهارباغ | صفحه موسیقی"
    }, []);
    

    const handleBookClick = useCallback((bookId) => {
        setSelectedBookId(prevBookId => (prevBookId === bookId ? null : bookId));
        setChevron(prev => !prev);
    }, []);

    const handleSongClick = useCallback((song) => {
        setSelectedSong(song);
        setModalIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setModalIsOpen(false);
    }, []);

    if (loading) return <Loading />;
    if (!songs) return <ErrorHandling/>;



    return (
        <div className="w-full bg-[#F6F4EE] dark:bg-gray-900 dark:text-gray-50">
            <RoutesHeader pageTitle={'مجله موسیقی'} boldText={'کتاب ها و موسیقی های'} Highlight={'آموزشی'} />
            <div className="container">
                <div className="w-full flex flex-col justify-center">
                    <div className="rounded-3xl shadow-xl p-3 flex flex-col gap-y-5">
                        <div className="flex flex-col md:flex justify-center items-center gap-y-10 md:gap-x-10">
                            <Image width={400} height={400} src={songs.instrument_img} alt={songs.instrument_name} className="rounded-xl" />
                            <div className="flex flex-col gap-y-5">
                                <h2 className="text-2xl md:text-4xl font-MorabbaBold">لیست موسیقی های آموزشــــی ساز <span className="bg-mango rounded-lg p-1 dark:text-elf">{songs.instrument_name}</span></h2>
                                <h2 className="md:text-xl font-DanaMedium"> تعداد موسیقی {songs.songs?.length || 0} </h2>
                            </div>
                        </div>
                        {songs?.books?.map((book) => (
                            <div key={book._id} className={`w-full flex flex-col rounded-lg  ${selectedBookId === book._id ? 'gap-5' : ''}`}>
                                <div onClick={() => handleBookClick(book._id)} className={`flex justify-between items-center p-4 cursor-pointer dark:hover:bg-gray-500 md:hover:bg-slate-200 rounded-xl`}>
                                    <div className=" font-DanaMedium">{book.book_name}</div>
                                    <div className={`${chevron?'rotate-90 transform ease-in-out':''}`}>
                                      <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                      </svg>
                                    </div>
                                </div>
                                {selectedBookId === book._id && (
                                    <div>
                                        {book?.songs?.map((song) => (
                                            <div key={song._id} onClick={() => handleSongClick(song)} className="w-full flex flex-col mt-2 cursor-pointer md:hover:bg-slate-200 rounded-xl shadow-sm">
                                                <div className="w-full h-10 md:h-auto flex justify-between items-center px-4 py-2 ">
                                                    <div className="w-1/3">{song.song_title}</div>
                                                    <div className="w-1/3">{song.song_artist}</div>
                                                    <Image width={48} height={48} src={"/images/songs/cover.png"} alt={song.song_title} className="rounded-full" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="w-full mt-5 flex justify-center items-center font-DanaDemiBold">
                        <Link href="/songs" className="bg-red-500 px-3 py-1.5 rounded-lg text-white hover:bg-red-800 transition-colors"> بازگشت </Link>
                    </div>
                </div>
            </div>
            <Modal ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Music Player" className="absolute md:w-[500px] flex flex-col justify-center items-center font-Dana gap-y-3 top-2/3 left-1/2 right-auto bottom-auto transform -translate-x-1/2 -translate-y-1/2 bg-mango-100 dark:bg-gray-700 p-5 rounded-lg shadow-lg"  overlayClassName="modal-overlay" >
                <button onClick={closeModal} className="w-full cursor-pointer">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 dark:text-gray-50">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
                {selectedSong && (
                    <div className="flex justify-center items-center flex-col gap-y-3 dark:text-gray-50">
                        <h2>{selectedSong.song_title}</h2>
                        <p>{selectedSong.song_artist}</p>
                        <Image width={48} height={48} src={selectedSong.song_img?selectedSong.song_img:"/images/songs/cover.png"} alt={selectedSong.song_title} className="rounded-full" />
                        <audio autoPlay={true} controls src={selectedSong.song_url}></audio>
                    </div>
                )}
            </Modal>
            <Image width={1920} height={134} src="/images/shapes/footer-1.png" alt="footer-shape" />
        </div>
    );
};

export default Songs;
