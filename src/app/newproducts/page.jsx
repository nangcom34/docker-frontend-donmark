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
      <Slide />
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
              width={1280}
              height={1280}
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
};

export default NewProducts;
