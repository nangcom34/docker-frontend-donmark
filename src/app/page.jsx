"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import axios from "axios";
import { API_URL, URL_IMAGES } from "../../config/constants";
import Header from "./layouts/Header";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";

export default function Home() {
  const [imageProduct, setImageProduct] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    loadImageProduct();
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
  return (
    <main>
      <Header />
      <Navbar />
      {imageProduct &&
        imageProduct.map((imageProductItem) => (
          <section
            key={imageProductItem._id}
            className="flex items-center justify-center w-full max-w-screen-2xl mx-auto"
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
