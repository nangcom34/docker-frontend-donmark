"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../layouts/Navbar";
import axios from "axios";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { API_URL, URL_IMAGES } from "../../../config/constants";
import Slide from "../components/Slide";

const NewProducts = () => {
  const [imageProduct, setImageProduct] = useState([]);

  useEffect(() => {
    loadImageProduct();
  }, []);
  const loadImageProduct = async () => {
    await axios
      .post(API_URL + "/imageProductnew", {
        limit: null,
        sort: "createdAt",
        order: "desc",
      })
      .then((res) => {
        //console.log(res.data);
        setImageProduct(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <Navbar />
      <Slide />
      <section
        className={`${
          imageProduct.length === 0 ? "flex-grow mx-auto max-w-screen-xl flex flex-col items-center justify-center" : "hidden"
        }`}
      >
       <aside className="flex items-center justify-center gap-2">
          <span className="loading loading-ring loading-sm"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-lg"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-sm"></span>
        </aside>
        <Image
          src={`/images/logo.png`}
          alt="logo"
          width={100}
          height={100}
          className="w-[100px] object-cover"
          loading="lazy"
        />
        <aside className="flex items-center justify-center gap-2">
          <span className="loading loading-ring loading-sm"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-lg"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-sm"></span>
        </aside>
      </section>
      {imageProduct &&
        imageProduct.map((imageProductItem) => (
          <section
            key={imageProductItem._id}
            className="flex-grow flex items-center justify-center w-full max-w-screen-xl mx-auto"
          >
            {" "}
            <Image
              src={`${URL_IMAGES}${imageProductItem.file}`}
              alt={imageProductItem._id}
              width={1280}
              height={1280}
              className="w-full h-auto object-fill object-center"
              loading= "lazy"
            />
          </section>
        ))}
      <Footer />
    </main>
  );
};

export default NewProducts;
