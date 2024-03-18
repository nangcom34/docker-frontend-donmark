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

// import required modules
import { Keyboard, Scrollbar, Autoplay } from "swiper/modules";
const Slide = () => {
  const [imageSlide, setImageSlide] = useState([]);

  useEffect(() => {
    loadImageSlide();
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
      className={`${
        imageSlide.length === 0
          ? "hidden"
          : "flex items-center justify-center h-[160px] sm:h-[320px] md:h-[640px] w-screen max-w-screen-xl mx-auto mb-16 overflow-hidden"
      } `}
    >
      <aside className="h-[160px] sm:h-[320px] md:h-[640px] max-w-screen-sm  sm:max-w-screen-sm  md:max-w-screen-md lg:max-w-screen-2xl">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          keyboard={{
            enabled: true,
          }}
          modules={[Autoplay, Keyboard, Scrollbar]}
          scrollbar={true}
          className="mySwiper mx-auto"
        >
          {imageSlide &&
            imageSlide.length > 0 &&
            imageSlide.map((imageSlideItem) => (
              <SwiperSlide key={imageSlideItem._id}>
                <Link href={imageSlideItem.urlname} target="_blank">
                  <img
                    src={`${URL_IMAGES}${imageSlideItem.file}`}
                    alt={imageSlideItem._id}
                    className="mx-auto object-fit"
                    loading= "lazy"
                  />
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </aside>
    </section>
  );
};

export default Slide;
