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
import 'swiper/css/effect-creative';
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination, Keyboard, Scrollbar, Autoplay, EffectCreative } from "swiper/modules";
import ButtonSlide from "./ButtonSlideProducts";
const Slide = () => {
  const [imageSlide, setImageSlide] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    loadImageSlide();
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


  const loadImageSlide = async () => {
    await axios
      .get(API_URL + "/imageSlide")
      .then((res) => {
        //console.log(res.data);
        setImageSlide(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section
      className={`${imageSlide.length === 0
        ? "hidden"
        : "flex items-center justify-center w-full mx-auto mb-5 overflow-hidden"
        } `}
    >
      <aside className="overflow-hidden w-full aspect-video">
        <Swiper
          style={{
            '--swiper-navigation-color': '#ED2024',
            '--swiper-pagination-color': '#ED2024',
          }}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // ใช้คำสั่งนี้เพื่อหยุด autoplay เมื่อ hover
          }}
          navigation={true}
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
          className="swiper-container flex items-center justify-center m-auto relative w-full h-full"
        >
          {imageSlide &&
            imageSlide.length > 0 &&
            imageSlide.map((imageSlideItem) => (
              <SwiperSlide key={imageSlideItem._id} className="flex items-center justify-center m-auto text-center group relative">
                <Link href={imageSlideItem.urlname} target="_blank" className="w-auto h-auto">
                  <img
                    src={`${URL_IMAGES}${imageSlideItem.file}`}
                    alt={imageSlideItem._id}
                    className="w-auto h-full mx-auto object-fill object-center flex items-center justify-center rounded-xl"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-5 opacity-0 group-hover:opacity-100 flex items-center justify-center overflow-hidden rounded-2xl">
                    <span className="text-slate-500">คลิก👆🏻</span>
                  </div>
                </Link>

              </SwiperSlide>
            ))}
          {/* <div className="absolute top-1 right-1 sm:top-5 sm:right-10 flex items-center justify-between scale-50 sm:scale-75 z-50 space-x-4">
            <ButtonSlide />
          </div> */}
        </Swiper>
      </aside>
    </section>
  );
};

export default Slide;
