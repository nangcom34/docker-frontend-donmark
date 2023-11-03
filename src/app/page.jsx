"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import axios from "axios";
import { API_URL, URL_IMAGES } from "../../config/constants";
import Header from "./layouts/Header";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";

// import required modules
import { Keyboard, Scrollbar, Autoplay } from "swiper/modules";

export default function Home() {
  const [imageProduct, setImageProduct] = useState("");
  const [imageSlide, setImageSlide] = useState([]);

  useEffect(() => {
    loadImageProduct();
    loadImageSlide();
  }, []);
  const loadImageProduct = async () => {
    await axios
      .post(API_URL + "/imageProductsale", {
        limit: null,
        sort: "createdAt",
        order: "asc",
      })
      .then((res) => {
        //console.log(res.data);
        setImageProduct(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
    <main>
      <Header />
      <Navbar />
      <section className="flex items-center justify-center w-full max-w-screen-xl mx-auto mb-16">
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
              slidesPerView: 2,
              slidesPerGroup: 1,
            },
          }}
          modules={[Autoplay, Scrollbar]}
          scrollbar={true}
          className="mySwiper"
        >
          {imageSlide &&
            imageSlide.map((imageSlideItem) => (
              <SwiperSlide key={imageSlideItem._id}>
                <Link href={imageSlideItem.urlname} target="_blank">
                  <Image
                    src={`${URL_IMAGES}${imageSlideItem.file}`}
                    alt={imageSlideItem._id}
                    width={640}
                    height={640}
                    style={{
                      loading: "lazy",
                    }}
                  />
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
      {imageProduct &&
        imageProduct.map((imageProductItem) => (
          <section
            key={imageProductItem._id}
            className="flex items-center justify-center w-full max-w-screen-xl mx-auto"
          >
            {" "}
            <Image
              src={`${URL_IMAGES}${imageProductItem.file}`}
              alt={imageProductItem._id}
              width={1920}
              height={1080}
              className="w-full h-auto object-fill object-center"
              style={{
                loading: "lazy",
              }}
            />
          </section>
        ))}
      <Footer />
    </main>
  );
}
