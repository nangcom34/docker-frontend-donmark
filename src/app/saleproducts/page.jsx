"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { API_URL, URL_IMAGES } from "../../../config/constants";
import axios from "axios";
import Header from "../layouts/Header";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import Slide from "../components/Slide";

export default function Home() {
  const [imageProduct, setImageProduct] = useState("");

  useEffect(() => {
    loadImageProduct();
  }, []);
  const loadImageProduct = async () => {
    await axios
      .post(API_URL + "/imageProductsale", {
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
      <section className="flex items-center justify-center w-full max-w-screen-xl mx-auto">
        <Slide />
      </section>
      <section
        className={`${imageProduct.length === 0 ? "flex-grow mx-auto max-w-screen-xl flex flex-col items-center justify-center" : "hidden flex-grow"
          }`}
      >
        <aside className="flex items-center justify-center gap-2">
          <span className="loading loading-ring loading-sm"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-lg"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-sm"></span>
        </aside>
        <img
          src={`/images/logo.png`}
          alt="logo"
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
            className=" flex-grow flex items-center justify-center w-full max-w-screen-xl mx-auto bg-black"
          >
            <Link href={imageProductItem.urlname} target="_blank">
              <img
                src={`${URL_IMAGES}${imageProductItem.file}`}
                alt={imageProductItem._id}
                className="w-full h-auto object-fill object-center hover:opacity-95"
                loading="lazy"
              />

            </Link>

          </section>
        ))}
      <Footer />
    </main>
  );
}
