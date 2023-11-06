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
      imageSlide.length === 0 ? "hidden" : "flex items-center justify-center w-full h-[320px] md:h-[640px] max-w-screen-xl mx-auto mb-16" 
    } `}
  >
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        centeredSlides={false}
        keyboard={{
          enabled: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          800: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
        }}
        modules={[Autoplay, Scrollbar]}
        scrollbar={true}
        className="mySwiper mx-auto"
      >
        {imageSlide &&
          imageSlide.map((imageSlideItem) => (
            <SwiperSlide key={imageSlideItem._id}>
              <Link href={imageSlideItem.urlname} target="_blank">
                <Image
                  src={`${URL_IMAGES}${imageSlideItem.file}`}
                  alt={imageSlideItem._id}
                  width={1280}
                  height={640}
                  className="mx-auto"
                  style={{
                    loading: "lazy",
                  }}
                />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default Slide;
