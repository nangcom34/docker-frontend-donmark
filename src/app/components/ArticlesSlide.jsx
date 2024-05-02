"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { DateTime } from "luxon";
import { API_URL, URL_IMAGES } from "../../../config/constants";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import 'swiper/css/effect-creative';

// import required modules
import { Navigation, Pagination, Keyboard, Scrollbar, Autoplay, EffectCreative } from "swiper/modules";
import ButtonSlide from "./ButtonSlideProducts";
const ArticlesSlide = () => {
    const [topicsTop, setTopicsTop] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        loadTopicsTop();
        const handleHover = () => {
            setIsHovered(true);
        };

        const handleLeave = () => {
            setIsHovered(false);
        };

        const swiperContainer = document.querySelector('.swiper-container');
        swiperContainer.addEventListener('mouseover', handleHover);
        swiperContainer.addEventListener('mouseleave', handleLeave);

        return () => {
            swiperContainer.removeEventListener('mouseover', handleHover);
            swiperContainer.removeEventListener('mouseleave', handleLeave);
        };
    }, []);


    const loadTopicsTop = async () => {
        await axios
            .post(API_URL + "/topicsby", {
                limit: 3,
                sort: "countView",
                order: "desc",
            })
            .then((res) => {
                //console.log(res.data);
                setTopicsTop(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <section
            className={`${topicsTop.length === 0
                ? "hidden"
                : "flex flex-col items-center justify-center w-full mx-auto mb-5 overflow-hidden "
                } `}
        >

            <aside className="overflow-hidden w-full">
                <span className="relative flex justify-center">
                    <div
                        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-red-500 to-transparent"
                    ></div>

                    <span className="relative z-10 bg-white px-6 text-[18px] sm:text-xl lg:text-2xl font-semibold my-5">บทความยอดนิยม</span>
                </span>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true, // ใช้คำสั่งนี้เพื่อหยุด autoplay เมื่อ hover
                    }}
                    keyboard={{
                        enabled: true,
                    }}
                    effect={'creative'}
                    creativeEffect={{
                        prev: {
                            shadow: true,
                            translate: [0, 0, -400],
                        },
                        next: {
                            translate: ['100%', 0, 0],
                        },
                    }}
                    loop={true}
                    modules={[Navigation, Pagination, Autoplay, Keyboard, Scrollbar, EffectCreative]}
                    scrollbar={true}
                    className="swiper-container flex items-center justify-center m-auto relative w-full h-auto"
                >
                    {topicsTop &&
                        topicsTop.length > 0 &&
                        topicsTop.map((topicsTopItem) => (
                            <SwiperSlide key={topicsTopItem._id} className="flex items-center justify-center m-auto group relative">
                                <article className="grid grid-cols-1 md:grid-cols-2 w-full">
                                    <aside className="w-full">
                                        <Link
                                            href={`/article/${topicsTopItem._id}`}
                                        >
                                            <img
                                                src={`${URL_IMAGES}${topicsTopItem.thumb}`}
                                                alt={`${topicsTopItem.title}`}
                                                loading="lazy"
                                                className="w-full object-fill object-center rounded-xl"
                                            />
                                        </Link>
                                    </aside>
                                    <aside className="w-full h-full grid bg-white">
                                        <Link
                                            href={`/article/${topicsTopItem._id}`}
                                            className="py-2 px-8 text-sm sm:text-lg md:text-xl font-semibold text-gray-900 hover:text-red-600"
                                        >
                                            {topicsTopItem.title}

                                            <div className="flex items-center justify-between w-full mt-2">
                                                <div className="flex items-center gap-1">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                    <time dateTime="2022-10-10" className="block text-xs text-gray-500">{DateTime.fromISO(topicsTopItem.createdAt)
                                                        .setZone("Asia/Bangkok")
                                                        .toLocaleString({ locale: "th", day: "2-digit", month: "long", year: "numeric" })}</time>
                                                </div>

                                                <div className="flex items-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                    </svg>

                                                    <span className="block text-xs text-gray-500">{topicsTopItem.countView}</span>
                                                </div>


                                            </div>
                                            <div className=" border-b border-red-400 pt-5 mx-10 md:mx-20"></div>
                                        </Link>

                                        <div
                                            className="flex items-start justify-center w-full">
                                            <Link
                                                href={`/article/${topicsTopItem._id}`}
                                                className="inline-block rounded transition hover:rotate-2 hover:scale-110 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75 mb-2"
                                            >
                                                <span className="flex items-center justify-center rounded-sm bg-white px-4 py-1 text-xs md:text-sm font-medium hover:bg-transparent">
                                                    อ่านบทความ
                                                    <ArrowRightIcon className="h-6 w-6" />
                                                </span>
                                            </Link>

                                        </div>
                                        <div className="flex items-start justify-center w-full scale-50 z-30 mb-5"><ButtonSlide /></div>
                                    </aside>
                                </article>

                            </SwiperSlide>
                        ))}
                </Swiper>
            </aside>
        </section>
    );
};

export default ArticlesSlide;
