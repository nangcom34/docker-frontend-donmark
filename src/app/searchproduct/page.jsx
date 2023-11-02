"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../layouts/Navbar";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

const AllProducts = () => {
  const uri = "http://localhost:5000/api/productby";
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  

  useEffect(() => {
    loadProduct();
    loadCategory();
  }, []);

  console.log(category);

  const loadProduct = async () => {
    await axios
      .post(uri, { limit: null, sort: 'createdAt', order: 'desc' })
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
      .get("http://localhost:5000/api/category")
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

      {category &&
        category.map((categoryItem) => (
          <section key={categoryItem._id}>
            <article className="mx-auto max-w-screen-2xl w-full overflow-hidden mb-3 md:mb-10">
              <hr className=" w-1/2 mx-auto" />
              <h2 className="mt-8 px-5 lg:px-0 font-bold text-right text-sm sm:text-[16px] md:text-xl lg:text-3xl uppercase">
                {categoryItem.name}
              </h2>
            </article>
            <article className="flex flex-wrap items-center justify-around gap-4 gap-y-8 md:gap-y-20 my-10 lg:gap-x-5 max-w-screen-2xl mx-auto">
              {product &&
                product
                  .filter(
                    (productItem) =>
                      productItem.category._id === categoryItem._id
                  )
                  .map((item, index) => (
                    <aside
                      onClick={() => {
                        document
                          .getElementById(`my_modal_${item._id}`)
                          .showModal();
                      }}
                      key={item._id}
                      className="block w-[150px] sm:w-[210px] md:w-[240px] lg:w-[270px] xl:w-[270px] hover:-translate-y-6 duration-500"
                    >
                      <Image
                        src={`http://localhost:5000/uploads/${item.file}`}
                        alt="home"
                        width={1024}
                        height={768}
                        className=" h-44 sm:h-64 w-full object-cover md:h-80 "
                        style={{
                          loading: "lazy",
                        }}
                      />
                      <p className="mt-1 font-bold text-xs sm:text-sm md:text-md lg:text-lg">
                        {item.name}
                      </p>
                      <dialog id={`my_modal_${item._id}`} className="modal">
                        <div className="modal-box p-0 relative lg:max-w-[35%]">
                          <ProductCard data={item} />
                          <div className="modal-action">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button className="btn absolute bottom-3 right-3">
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
