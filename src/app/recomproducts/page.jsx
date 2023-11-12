"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../layouts/Navbar";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { API_URL, URL_IMAGES } from "../../../config/constants";

const RecommendProducts = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    loadProduct();
    loadCategory();
  }, []);

  //console.log(category);

  const loadProduct = async () => {
    await axios
      .post(API_URL + "/productrecommend", {
        limit: null,
        sort: "createdAt",
        order: "desc",
      })
      .then((res) => {
        //console.log(res.data);
        setProduct(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loadCategory = async () => {
    await axios
      .get(API_URL + "/category")
      .then((res) => {
        //console.log(res.data);
        setCategory(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Header />
      <Navbar />

      <section
        className={`${
          product.length === 0 ? "h-full min-h-[63vh]" : ""
        }`}
      ></section>

      {category &&
        category
          .filter((categoryItem) =>
            product.some(
              (productItem) => productItem.category?._id === categoryItem._id
            )
          )
          .map((categoryItem) => (
            <section key={categoryItem._id}>
              <article className="mx-auto max-w-screen-xl w-full overflow-hidden mb-3 md:mb-10">
                <hr className=" w-1/2 mx-auto" />
                <h2 className="mt-8 px-5 lg:px-0 font-bold text-right text-sm sm:text-[16px] md:text-xl lg:text-3xl uppercase">
                  {categoryItem.name}
                </h2>
              </article>
              <article className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-8 md:gap-y-20 my-10 lg:gap-x-5 max-w-screen-xl mx-auto min-h-[52vh] px-5 ">
                {product &&
                  product
                    .filter(
                      (productItem) =>
                        productItem.category?._id === categoryItem?._id
                    )
                    .map((item, index) => (
                      <aside
                        onClick={() => {
                          document
                            .getElementById(`my_modal_${item._id}`)
                            .showModal();
                        }}
                        key={item._id}
                        className="block w-[100px] sm:w-[150px] md:w-[180px] lg:w-[180px] xl:w-[180px] hover:-translate-y-6 duration-500 mx-auto"
                      >
                        <Image
                          src={`${URL_IMAGES}${item.file}`}
                          alt="home"
                          width={1024}
                          height={768}
                          className=" h-[150px] sm:h-[200px] w-full object-cover md:h-[230px] rounded-md"
                          style={{
                            loading: "lazy",
                          }}
                        />
                        <p className="mt-1 font-bold text-xs sm:text-sm md:text-md lg:text-lg truncate hover:text-clip">
                          {item.name}
                        </p>
                        <dialog id={`my_modal_${item._id}`} className="modal m-auto">
                          <div className="modal-box p-0 relative xl:max-w-[768px] max-h-[90vh] overflow-hidden flex">
                            <ProductCard data={item} />
                            
                          </div>
                        </dialog>
                      </aside>
                    ))}
              </article>
            </section>
          ))}
      <Footer />
    </>
  );
};

export default RecommendProducts;
