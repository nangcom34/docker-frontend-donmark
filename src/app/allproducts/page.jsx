"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../layouts/Navbar";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { useSearchParams } from "next/navigation";
import { API_URL, URL_IMAGES } from "../../../config/constants";

const AllProducts = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const searchParams = useSearchParams();
  const search = searchParams.get("query");

  // Log ค่า text
  //console.log(search);
  useEffect(() => {
    loadProduct();
    loadCategory();
  }, []);

  useEffect(() => {
    loadProduct();
  }, [search]);

  const loadProduct = async () => {
    let filters = { limit: null, sort: "createdAt", order: "desc" };
    if (search) {
      filters.query = search;
    }
    //console.log(filters);
    await axios
      .post(API_URL + "/productby", { filters })
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
              <article className="flex flex-wrap items-center justify-around gap-4 gap-y-8 md:gap-y-20 my-10 lg:gap-x-5 max-w-screen-xl mx-auto min-h-[52vh]">
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
                        className="block w-[100px] sm:w-[150px] md:w-[180px] lg:w-[180px] xl:w-[180px] hover:-translate-y-6 duration-500"
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
                        <dialog id={`my_modal_${item._id}`} className="modal">
                          <div className="modal-box p-0 relative lg:max-w-[35%]">
                            <ProductCard data={item} />
                            <div className="modal-action">
                              <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn bg-red-600 text-white absolute bottom-3 right-3 hover:text-red-600 hover:bg-white">
                                  CLOSE
                                </button>
                              </form>
                            </div>
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

export default AllProducts;
