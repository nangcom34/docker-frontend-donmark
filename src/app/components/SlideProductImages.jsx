"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { API_URL, URL_IMAGES } from "../../../config/constants";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import 'swiper/css/effect-coverflow';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

// import required modules
import { Navigation, FreeMode, Thumbs, EffectCoverflow } from "swiper/modules";

const SlideProductImages = ({ images }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);


    return (

        <section
            className={`${!images || images.length === 0
                ? "hidden"
                : "flex items-start justify-center w-full mx-auto overflow-hidden"
                } `}
        >

            <div className='w-full'>
                <Swiper
                    style={{
                        '--swiper-navigation-color': '#ED2024',
                        '--swiper-pagination-color': '#ED2024',
                    }}
                    loop={true}
                    centeredSlides={true}
                    effect={'coverflow'}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 100,
                        depth: 200,
                        modifier: 20,
                    }}
                    grabCursor={true}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{
                        swiper:
                            thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
                    }}
                    modules={[FreeMode, Navigation, Thumbs, EffectCoverflow]}
                    className='w-full rounded-lg flex items-center justify-center'
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className='flex h-full w-full items-center justify-center'>
                                <img
                                    src={`${URL_IMAGES}${image}`}
                                    alt={image}
                                    className='block h-full w-full object-center object-cover rounded-lg'
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Thumbnail */}
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={12}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className='thumbs mt-3 h-16 sm:h-24 md:h-32 w-full rounded-lg'
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index} className="rounded-xl border-2 md:border-4 border-red-500">
                            <button className='flex h-full w-full items-center justify-center'>
                                <img
                                    src={`${URL_IMAGES}${image}`}
                                    alt={image}
                                    className='block h-full w-full object-cover rounded-lg'
                                />
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default SlideProductImages;
